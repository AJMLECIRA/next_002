'use client';
import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setMMShape } from '../../../redux/slices/configGlassSlice';
import {
  archProps,
  gothicProps,
  overmantleProps,
  semiCircleProps,
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
    padding: '1.0vw 0 1.0vw',
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

export default function SelectorShapedArched({ title, isActive, onActivate }) {
  const dispatch = useDispatch();

  // 1. Maintain an activeGlassShape state in the CalcPanelGlassType component.
  // const [activeGlassShape, setactiveGlassShape] = useState(null);

  // Fetch the activeGlassShape from Redux state
  //   const activeGlassShape = useSelector(
  //     (state) => state.configGlass.mirrorMaterialShape,
  //   );

  const activeGlassShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  const handleActivate = (choice) => {
    // setactiveGlassShape(choice); // Was used when on page only
    dispatch(setMMShape(choice));
    //console.log(choice);
  };

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={{ base: '1vw', md: '0.5vw' }}
      width="100%"
    >
      <HoverableGridItem
        title="arch"
        isActive={activeGlassShape === 'arch'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...archProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="gothic"
        isActive={activeGlassShape === 'gothic'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...gothicProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="overmantle"
        isActive={activeGlassShape === 'overmantle'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...overmantleProps} />
        </Center>
      </HoverableGridItem>
      <HoverableGridItem
        title="semicircle"
        isActive={activeGlassShape === 'semicircle'}
        onActivate={handleActivate}
      >
        <Center width="25%">
          <ShapeComp {...semiCircleProps} />
        </Center>
      </HoverableGridItem>
    </Grid>
  );
}
