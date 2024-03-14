'use client';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import GlassArchModal from '../modals/GlassShapeArchModal';
import ShapeComp from '../../ShapeComp';
import {
  archProps,
  gothicProps,
  overmantleProps,
  semiCircleProps,
  hexagonProps,
  pentagonProps,
  octagonProps,
  kiteProps,
  diamondProps,
  triangleProps,
  irrQuadProps,
  cutCornerProps,
  radiusProps,
  lgradiusProps,
  pillProps,
} from '../shapeConfig';

export default function CalcCompArchMobile() {
  const activeShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  // Function to render the SVG based on the active shape
  const renderShape = () => {
    switch (activeShape) {
      case 'arch':
        return <ShapeComp {...archProps} />;
      case 'gothic':
        return <ShapeComp {...gothicProps} />;
      case 'overmantle':
        return <ShapeComp {...overmantleProps} />;
      case 'semicircle':
        return <ShapeComp {...semiCircleProps} />;
      case 'hexagon':
        return <ShapeComp {...hexagonProps} />;
      case 'pentagon':
        return <ShapeComp {...pentagonProps} />;
      case 'octagon':
        return <ShapeComp {...octagonProps} />;
      case 'kite':
        return <ShapeComp {...kiteProps} />;
      case 'diamond':
        return <ShapeComp {...diamondProps} />;
      case 'triangle':
        return <ShapeComp {...triangleProps} />;
      case 'irrQuad':
        return <ShapeComp {...irrQuadProps} />;
      case 'cutCorner':
        return <ShapeComp {...cutCornerProps} />;
      case 'radius':
        return <ShapeComp {...radiusProps} />;
      case 'lgradius':
        return <ShapeComp {...lgradiusProps} />;
      case 'pill':
        return <ShapeComp {...pillProps} />;

      // Add other cases as needed
      default:
        return null; // Or some default shape
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openGlassArchModal = () => {
    console.log('open Model');
    onOpen();
  };
  const outerBoxStyle = {
    // background: 'linear-gradient(to right, #dfb4a8, #deb8b2, #ffdacc)',
    display: 'flex',
    height: 'auto',
    border: '1px solid #666',
    borderRadius: '4vw',
    padding: '1vw 6vw 6vw',
    marginTop: '4vw',
    flexDirection: 'column',
    background: '#ffffff',
  };
  const buttonStyle = {
    borderRadius: '4vw',
    width: '100%',
    fontSize: '3vw',
    padding: '4vw 0',
    background: '#a6aaaf',
    color: '#ffffff',
    width: '100%',
  };
  const textStyle = {
    display: 'flex',
    fontSize: '4vw',
    color: 'rgba(0, 0, 0, 1)',
    width: '100%',
    fontWeight: '500',
    textTransform: 'capitalize',
    height: '100%',
  };
  return (
    <>
      <Center {...outerBoxStyle}>
        <Center
          display="flex"
          columnGap="3vw"
          border="solid 0px red"
          width="60%"
          alignItems="center"
          margin="3vw 0"
        >
          <Center width="12vw">{renderShape()}</Center>
          <Center {...textStyle}>{activeShape}</Center>
        </Center>
        <Button {...buttonStyle} onClick={() => openGlassArchModal()}>
          Change Shape Preset
        </Button>
      </Center>
      <GlassArchModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
