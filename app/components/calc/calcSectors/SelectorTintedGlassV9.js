'use client';
import React, { useEffect, useState } from 'react';
import useGetDBFieldQuery from '@/app/hooks/useGetDBFieldQuery';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMMCode,
  setMMName,
  setSelTintImg,
  setColRef,
  setColRefHL,
} from '../../../redux/slices/configGlassSlice';

export default function TintedGlassSelector() {
  const [glassItems, setGlassItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const current = useSelector((state) => state.configGlass.mirrorMaterialCode);
  const dispatch = useDispatch();
  const {
    data: glassData,
    loading,
    error,
  } = useGetDBFieldQuery('allGlass', 'type', 'Tinted');

  useEffect(() => {
    setGlassItems(glassData);
  }, [glassData]);

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = src;
    });
  };

  useEffect(() => {
    if (glassData && glassData.length > 0) {
      glassData.forEach((item) => {
        preloadImage(`/images/glass/${item.MWref}.jpg`).catch((error) =>
          console.error('Image preloading error:', error)
        );
      });
    }
  }, [glassData]);

  useEffect(() => {
    if (current === null || current === '') {
      setActiveItem(null);
    }
  }, [current]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleThumbnailClick = (
    itemId,
    MWref,
    MWName,
    publicURL,
    colRef,
    colRefHL
  ) => {
    console.log(
      'clicked thumbnail',
      itemId,
      MWref,
      MWName,
      publicURL,
      colRef,
      colRefHL
    );
    setActiveItem(itemId);
    dispatch(setMMCode(MWref));
    dispatch(setMMName(MWName));
    dispatch(setSelTintImg(publicURL));
    dispatch(setColRef(colRef));
    dispatch(setColRefHL(colRefHL));
  };

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      gap={{ base: '1vw', md: '0.5vw' }}
      width="100%"
    >
      {glassItems &&
        glassItems.map((item) => {
          const isHovered = hoveredItem === item.id;
          const isActive = activeItem === item.id;
          const boxShadow = isHovered
            ? '0px 0px 4px 2px #0cc6de'
            : isActive
            ? '0px 0px 0px 3px #0cc6de' // replace `#someColor` with your desired active color
            : 'none';
          return (
            <GridItem key={item.id}>
              <Box
                position="relative"
                height="6vw"
                className="boxWithImage"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                borderRadius={{ base: '3vw', md: '1.5vw' }}
                boxShadow={boxShadow}
                cursor={isHovered ? 'pointer' : ''}
                onClick={() =>
                  handleThumbnailClick(
                    item.id,
                    item.MWref,
                    item.MWName,
                    `/images/glass/${item.MWref}.jpg`,
                    item.colRef,
                    item.colRefHL
                  )
                }
              >
                <Image
                  src={`/images/glass/${item.MWref}.jpg`} // Adjust path as necessary
                  alt={item.MWref}
                  title={item.MWName}
                  fill
                  sizes="(max-width: 768px) 16vw, (max-width: 1200px) 8vw, 8vw"
                  style={{ borderRadius: '1.5vw' }}
                />
              </Box>
            </GridItem>
          );
        })}
    </Grid>
  );
}
