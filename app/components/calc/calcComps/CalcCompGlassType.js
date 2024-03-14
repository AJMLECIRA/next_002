'use client';
import {
  Box,
  Center,
  Grid,
  GridItem,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setMMGroup,
  setMMCode,
  setMMName,
} from '../../../redux/slices/configGlassSlice';
// Icons
import GlassTypeModal from '../modals/GlassTypeModal';
import SvgImage from '../../svgImage';

// images

import icon from '/public/svgs/glass-thin.svg';

const gridItemStyle = {
  border: '0.1vw solid #666666',
  borderRadius: '1.5vw',
  padding: { base: '3vw 0 1.0vw', md: '1.0vw 0 1.0vw' },
  background: 'rgba(255,255,255,0.8)',
  fontSize: { base: '8vw', md: '2.5vw' },
};
const gridItemTitle = {
  fontSize: { base: '4.0vw', md: '1vw' },
  fontWeight: '300',
  textTransform: 'uppercase',
  paddingTop: '5px',
};
const HoverableGridItem = ({
  children,
  title,
  isActive,
  onActivate,
  isInModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const forMobile = useBreakpointValue({ base: false, md: true });
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  // style the grid item for mobile
  const gridItemStyleModal = !forMobile
    ? {
        padding: { base: '0vw 6vw' },
        background: 'rgba(255,255,255,1.0)',
        borderRadius: '6vw',
        border: 'solid 2px rgba(0,0,0,0.2)',
      }
    : {};
  const svgModal = !forMobile
    ? {
        fontSize: '100%',
        fill: '#40474f',
        width: '100%',
      }
    : {};

  const bgColor = isActive
    ? 'rgba(255,255,255,1)'
    : isHovered
    ? 'rgba(255,255,255,1)'
    : 'rgba(255,255,255,0.5)';

  const iconColor = isHovered || isActive ? '#0cc6de' : '#40474f';
  const svgColor = isHovered || isActive ? '#0cc6de' : '#40474f';
  const border = isActive ? '0.2vw solid #0cc6de' : '0.1vw solid #666666';
  const margin = isActive ? '0vw' : '0.1vw';

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleGridItemClick = (title) => {
    if (!forMobile) {
      openGlassTypeModal();
    }
    onActivate(title);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openGlassTypeModal = () => {
    onOpen();
  };
  return (
    <>
      <GridItem
        {...gridItemStyle}
        border={border}
        margin={margin}
        background={bgColor}
        {...gridItemStyleModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleGridItemClick(title)}
        _hover={{ cursor: 'pointer' }}
        height="8vw"
        borderRadius="2vw"
      >
        <Box
          display="flex"
          flexDirection={{ base: 'row', md: 'column' }}
          alignItems={'center'}
        >
          <Center
            color={iconColor}
            fill={svgColor}
            {...svgModal}
            width={{ base: '6vw', md: '4vw' }}
            height={{ base: '6vw', md: '4vw' }}
          >
            {children}
          </Center>
          <Center width="100%" {...gridItemTitle}>
            {title}
          </Center>
          {!forMobile && (
            <Center onClick={() => openGlassTypeModal()}>...</Center>
          )}
        </Box>
      </GridItem>
      <GlassTypeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default function CalcCompGlassType() {
  const aged = useSelector((state) => state.configGlass.mirrorMaterialCode);
  const dispatch = useDispatch();
  const shouldDisplayTitle = useBreakpointValue({ base: false, md: true });

  const activeGlassType = useSelector(
    (state) => state.configGlass.mirrorMaterialGroup
  );
  const glassGauge = useSelector(
    (state) => state.configGlass.mirrorMaterialGauge
  );

  const handleActivate = (choice) => {
    dispatch(setMMGroup(choice));
    dispatch(setMMName('Standard Mirror'));
    if (choice === 'plain') {
      dispatch(setMMCode('MX002'));

      if (glassGauge == 4) {
        dispatch(setMMCode('MX001'));
      }
    } else if (choice === 'aged') {
      dispatch(setMMCode('GT019'));
      dispatch(setMMName('GT019 - Antique Mirror'));
    } else if (choice === 'tinted') {
      dispatch(setMMCode('GX005'));
      dispatch(setMMName('Bronze Tinted Mirror'));
    } else {
      dispatch(setMMCode(''));
      dispatch(setMMName(''));
    }
  };
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 50%)', md: 'repeat(4, 1fr)' }}
      gap={{ base: '3vw', md: '1vw' }}
      display={{ base: '', md: 'grid' }}
      flexDirection="row"
    >
      {(activeGlassType === 'plain' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="plain"
          isActive={activeGlassType === 'plain'}
          onActivate={handleActivate}
          width="100%"
        >
          <Box
            // sets the size if the icon
            width={{ base: '6vw', md: '4vw' }}
            height={{ base: '6vw', md: '4vw' }}
          >
            <SvgImage
              src="Glassthin"
              width="100%"
              height="100%"
              fill={activeGlassType === 'plain' ? '#0cc6de' : '#40474f'}
            />
          </Box>
        </HoverableGridItem>
      )}
      {(activeGlassType === 'tinted' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="tinted"
          isActive={activeGlassType === 'tinted'}
          onActivate={handleActivate}
        >
          <SvgImage
            src="Glasstintedthin"
            width="100%"
            height="100%"
            fill={activeGlassType === 'tinted' ? '#0cc6de' : '#40474f'}
          />
        </HoverableGridItem>
      )}
      {(activeGlassType === 'aged' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="aged"
          isActive={activeGlassType === 'aged'}
          onActivate={handleActivate}
        >
          <SvgImage
            src="Glassdistressedlight"
            width="100%"
            height="100%"
            fill={activeGlassType === 'aged' ? '#0cc6de' : '#40474f'}
          />
          <SvgImage src="glass-distressed-light" width="100%" height="100%" />
        </HoverableGridItem>
      )}
      {(activeGlassType === 'textured' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="textured"
          isActive={activeGlassType === 'textured'}
          onActivate={handleActivate}
        >
          <SvgImage
            src="Glasstexturedthin"
            width="100%"
            height="100%"
            fill={activeGlassType === 'textured' ? '#0cc6de' : '#40474f'}
          />
        </HoverableGridItem>
      )}
    </Grid>
  );
}
