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
} from '../../../redux/slices/configGlassSlice';

export default function AgedGlassSelector() {
  const [glassItems, setGlassItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const current = useSelector((state) => state.configGlass.mirrorMaterialCode);

  const {
    data: glassData,
    loading,
    error,
  } = useGetDBFieldQuery('allGlass', 'type', 'aged');

  useEffect(() => {
    //console.log('loading glass data');
    setGlassItems(glassData); // Initialize glassItems with fetched data
  }, [glassData]);

  useEffect(() => {
    if (current === null || current === '') {
      setActiveItem(null);
    }
  }, [current]);

  const dispatch = useDispatch();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleThumbnailClick = (itemId, MWref, MWName, publicURL) => {
    setActiveItem(itemId);
    dispatch(setMMCode(MWref));
    dispatch(setMMName(MWName));
    dispatch(setSelTintImg(publicURL));
  };

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      gap={{ base: '1vw', md: '0.5vw' }}
      width="100%"
    >
      {glassItems &&
        glassItems.map((item) => {
          if (item.availability !== 'yes') {
            return null;
          }
          const publicURL = `/images/glass/${item.MWref}.jpg`;
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
                    `/images/glass/${item.MWref}.jpg`
                  )
                }
              >
                <Image
                  className="radThumb"
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
