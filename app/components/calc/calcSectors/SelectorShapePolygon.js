'use client';
import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setMMShape } from '../../../redux/slices/configGlassSlice';
import {
  pentagonProps,
  kiteProps,
  diamondProps,
  triangleProps,
  hexagonProps,
  octagonProps,
} from '../shapeConfig';

// Icons
import ShapeComp from '../../ShapeComp';

const HoverableGridItem = ({ children, title, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const gridItemStyle = {
    border: '0.1vw solid #666666',
    borderRadius: '1.5vw',
    padding: '1.4vw 0 1.0vw',
    background: 'rgba(255,255,255,0.8)',
  };
  const gridItemTitle = {
    fontSize: { base: '2.0vw', md: '1vw' },
    fontWeight: '300',
    textTransform: 'uppercase',
    paddingTop: '5px',
  };
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
    <GridItem
      {...gridItemStyle}
      background={bgColor}
      border={border}
      margin={margin}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onActivate(title)}
      _hover={{ cursor: 'pointer' }}
    >
      <Center color={iconColor} fill={svgColor}>
        {children}
      </Center>
      <Center {...gridItemTitle}>{title}</Center>
    </GridItem>
  );
};

export default function SelectorShapedPolygon({ title, isActive, onActivate }) {
  const dispatch = useDispatch();

  const activeGlassShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  const handleActivate = (choice) => {
    // setactiveGlassShape(choice); // Was used when on page only
    dispatch(setMMShape(choice));
  };

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      gap={{ base: '1vw', md: '0.5vw' }}
      width="100%"
    >
      <HoverableGridItem
        title="hexagon"
        isActive={activeGlassShape === 'hexagon'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...hexagonProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="pentagon"
        isActive={activeGlassShape === 'pentagon'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...pentagonProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="octagon"
        isActive={activeGlassShape === 'octagon'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...octagonProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="diamond"
        isActive={activeGlassShape === 'diamond'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...diamondProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="kite"
        isActive={activeGlassShape === 'kite'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...kiteProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="triangle"
        isActive={activeGlassShape === 'triangle'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...triangleProps} />
        </Center>
      </HoverableGridItem>
    </Grid>
  );
}
