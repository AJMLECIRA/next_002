'use client';
import {
  Center,
  Grid,
  GridItem,
  Box,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import {
  setMMShape,
  setMMRad1,
  setMMRad2,
  setMMRad3,
  setMMRad4,
} from '../../../redux/slices/configGlassSlice';
// Icons
import ShapeComp from '../../ShapeComp';
import {
  circleProps,
  regularProps,
  archProps,
  radiusProps,
  hexagonProps,
  irrQuadProps,
} from '../shapeConfig';
import GlassShapeModal from '../modals/GlassShapeModal';

// const IconWrapper = ({ icon }) => (
//   <FontAwesomeIcon icon={icon} fontSize="2.5em" style={{ opacity: '0.5' }} />
// );
// const SVGWrapper = ({ Component, ...props }) => (
//   <Component {...props} style={{ fontSize: '2.5em', opacity: '0.5' }} />
// );

const HoverableGridItem = ({ children, title, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const forMobile = useBreakpointValue({ base: false, md: true });
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleGridItemClick = (title) => {
    if (!forMobile) {
      openShapeModal();
    }
    onActivate(title);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openShapeModal = () => {
    console.log('open Model');
    onOpen();
  };

  const gridItemStyle = {
    border: '0.1vw solid #666666',
    borderRadius: '1.5vw',
    padding: '1.0vw 0 1.0vw',
    background: 'rgba(255,255,255,0.8)',
    width: '100%',
  };
  const gridItemTitle = {
    fontSize: { base: '4.0vw', md: '1vw' },
    fontWeight: '300',
    textTransform: 'uppercase',
  };
  const gridItemStyleModal = !forMobile
    ? {
        marginTop: '4vw',
        padding: { base: '0 6vw' },
        background: 'rgba(255,255,255,1.0)',
        borderRadius: '6vw',
        border: 'solid 2px rgba(0,0,0,0.2)',
        width: '100%',
        fontSize: '8vw',
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

  return (
    // create icon for option box
    <>
      <GridItem
        {...gridItemStyle}
        background={bgColor}
        border={border}
        margin={margin}
        {...gridItemStyleModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleGridItemClick(title)}
        _hover={{ cursor: 'pointer' }}
        height="auto"
      >
        <Box
          display="flex"
          flexDirection={{ base: 'row', md: 'column' }}
          alignItems={'center'}
          border="solid 0px red"
        >
          <Center
            justifyContent={{ base: 'start', md: 'center' }}
            width={{ base: '12vw', md: '6vw' }}
            color={iconColor}
            fill={svgColor}
          >
            {children}
          </Center>
          <Center
            width="100%"
            padding={{ base: '5px 6vw 0 0', md: '5px 0 0 0' }}
            {...gridItemTitle}
          >
            {title}
          </Center>
          {!forMobile && <Center>...</Center>}
        </Box>
      </GridItem>
      <GlassShapeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};
export default function CalcCompGlassShape() {
  const dispatch = useDispatch();
  const shouldDisplayTitle = useBreakpointValue({ base: false, md: true });
  const activeGlassShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  const iconStyle = {
    padding: { base: '1.5vw 0vw', md: '1vw 0 0', lg: '0.5vw 0 0' },
    width: { base: '50%', md: '35%' },
  };
  const polygonArray = [
    'polygon',
    'hexagon',
    'pentagon',
    'octagon',
    'kite',
    'diamond',
    'triangle',
  ];
  const otherArray = ['other', 'irrQuad', 'cutCorner'];
  const archArray = ['arch', 'gothic', 'overmantle', 'semicircle'];

  const handleActivate = (choice) => {
    // Map the 'polygon' and 'other' choices to their respective shapes
    const shapeChoice =
      choice === 'polygon'
        ? 'hexagon'
        : choice === 'other'
        ? 'irrQuad'
        : choice;

    // Dispatch the action to set the shape in the Redux store
    dispatch(setMMShape(shapeChoice));

    // If the choice is not 'radius', reset all radius values to 0
    if (shapeChoice !== 'radius') {
      dispatch(setMMRad1(0));
      dispatch(setMMRad2(0));
      dispatch(setMMRad3(0));
      dispatch(setMMRad4(0));
    }
  };

  return (
    // create option boxes
    <Grid
      templateColumns={{
        md: 'repeat(3, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      gap={{ base: '3vw', md: '0.3vw' }}
      display={{ base: '', md: 'grid' }}
      flexDirection="row"
      width="100%"
    >
      {(activeGlassShape === 'regular' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="regular"
          isActive={activeGlassShape === 'regular'}
          onActivate={handleActivate}
        >
          <Center {...iconStyle}>
            <ShapeComp
              {...regularProps}
              cpos="100"
              cw="200"
              ch="200"
              poistion="relative"
            />
          </Center>
        </HoverableGridItem>
      )}
      {(activeGlassShape === 'round' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="round"
          isActive={activeGlassShape === 'round'}
          onActivate={handleActivate}
        >
          <Center {...iconStyle}>
            <ShapeComp
              {...circleProps}
              cpos="100"
              cw="200"
              ch="200"
              poistion="relative"
            />
          </Center>
        </HoverableGridItem>
      )}
      {(archArray.includes(activeGlassShape) || shouldDisplayTitle) && (
        <HoverableGridItem
          title="arch"
          isActive={activeGlassShape === 'arch'}
          onActivate={handleActivate}
        >
          <Center {...iconStyle}>
            <ShapeComp {...archProps} poistion="relative" />
          </Center>
        </HoverableGridItem>
      )}
      {(activeGlassShape === 'radius' || shouldDisplayTitle) && (
        <HoverableGridItem
          title="radius"
          isActive={activeGlassShape === 'radius'}
          onActivate={handleActivate}
        >
          <Center {...iconStyle}>
            <ShapeComp {...radiusProps} poistion="relative" />
          </Center>
        </HoverableGridItem>
      )}
      {(polygonArray.includes(activeGlassShape) || shouldDisplayTitle) && (
        <HoverableGridItem
          title="polygon"
          isActive={activeGlassShape === 'hexagon'}
          onActivate={handleActivate}
        >
          <Center {...iconStyle}>
            <ShapeComp {...hexagonProps} poistion="relative" />
          </Center>
        </HoverableGridItem>
      )}
      {(otherArray.includes(activeGlassShape) || shouldDisplayTitle) && (
        <HoverableGridItem
          title="other"
          isActive={activeGlassShape === 'other'}
          onActivate={handleActivate}
        >
          <Center {...iconStyle}>
            <ShapeComp {...irrQuadProps} poistion="relative" />
          </Center>
        </HoverableGridItem>
      )}
    </Grid>
  );
}
