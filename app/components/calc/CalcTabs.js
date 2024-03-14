import React, { useState } from 'react';
import { Center, Tab, Box, Text, useBreakpointValue } from '@chakra-ui/react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShapes,
  faSwatchbook,
  faToolbox,
  faRuler,
  faFrame,
  faLightbulbOn,
} from '@fortawesome/pro-solid-svg-icons';

const IconWrapper = ({ icon }) => {
  const iconSize = useBreakpointValue({ base: '2x', sm: '3x', md: '2x' });
  return (
    <FontAwesomeIcon
      icon={icon}
      size={iconSize}
      style={{ color: '##40474f', opacity: '0.5' }}
    />
  );
};
const Shapes = () => <IconWrapper icon={faShapes} />;
const Swatchbook = () => <IconWrapper icon={faSwatchbook} />;
const Toolbox = () => <IconWrapper icon={faToolbox} />;
const LightbulbOn = () => <IconWrapper icon={faLightbulbOn} />;
const Frame = () => <IconWrapper icon={faFrame} />;
const Ruler = () => <IconWrapper icon={faRuler} />;

const stepStyle = {
  fontSize: { base: '3vw', sm: '2.5vw', md: '1vw' },
  lineHeight: { base: '3.5vw', sm: '3vw', md: '0.7vw' },
  padding: { base: '1vw 0 0', sm: '0.5vw 0 0', md: '1vw 0 0.2vw' },
  opacity: '0.5',
};
const stageStyle = {
  fontSize: { base: '3.5vw', sm: '3vw', md: '1.2vw', lg: '1vw' },
  padding: '0vw 0 0.5vw',
  lineHeight: { base: '3vw', sm: '2.5vw', md: '1.5vw' },
  fontWeight: '500',
};
const boxTitleStyle = {
  textAlign: { base: 'left', md: 'center' },
  width: '100%',
  border: 'solid 0px red',
};
const tabStyle = {
  border: '0',
  margin: '0',
  backgroundColor: '#CCCCCC',
  borderRadius: { base: '3vw 3vw 0 0', md: '1.5vw 1.5vw 0 0' },
  _selected: {
    color: '#000000',
    bg: '#E6E6E6',
    opacity: '1',
  },
  display: 'flex',
  flexDirection: { base: 'row', md: 'column' },
  padding: '1vw 0 0',
};

export function ShapeSizeTab({ number, isActive }) {
  // console.log(`Tab ${number} is active: ${isActive}`);
  const minTabStyle = {
    // ...other styles
    width: isActive ? '100%' : '', // or any specific size you want
    transition: 'width 0.3s ease', // This adds a smooth transition effect when the width changes
  };
  return (
    <>
      <Tab {...tabStyle} sx={minTabStyle}>
        <Center padding={{ base: '2vw 4vw 2vw', md: '1vw 0 0' }}>
          <Shapes />
        </Center>
        {isActive && (
          <Box {...boxTitleStyle}>
            <Text {...stepStyle}>STEP {number}</Text>
            <Text {...stageStyle}>Shape &amp; size</Text>
          </Box>
        )}
      </Tab>
    </>
  );
}
export function GlassTypeTab({ number, isActive }) {
  // console.log(`Tab ${number} is active: ${isActive}`);
  const minTabStyle = {
    // ...other styles
    width: isActive ? '100%' : '', // or any specific size you want
    transition: 'width 0.3s ease', // This adds a smooth transition effect when the width changes
  };
  return (
    <>
      <Tab {...tabStyle} sx={minTabStyle}>
        <Center padding={{ base: '2vw 4vw 2vw', md: '1vw 0 0' }}>
          <Swatchbook />
        </Center>
        {isActive && (
          <Box {...boxTitleStyle}>
            <Text {...stepStyle}>STEP {number}</Text>
            <Text {...stageStyle}>Type of Glass</Text>
          </Box>
        )}
      </Tab>
    </>
  );
}
export function FittingsTab({ number, isActive }) {
  // console.log(`Tab ${number} is active: ${isActive}`);
  const minTabStyle = {
    // ...other styles
    width: isActive ? '100%' : '', // or any specific size you want
    transition: 'width 0.3s ease', // This adds a smooth transition effect when the width changes
  };
  return (
    <>
      <Tab {...tabStyle} sx={minTabStyle}>
        <Center padding={{ base: '2vw 4vw 2vw', md: '1vw 0 0' }}>
          <Toolbox />
        </Center>
        {isActive && (
          <Box {...boxTitleStyle}>
            <Text {...stepStyle}>STEP {number}</Text>
            <Text {...stageStyle}>Fittings</Text>
          </Box>
        )}
      </Tab>
    </>
  );
}
export function FrameTab({ number, isActive }) {
  // console.log(`Tab ${number} is active: ${isActive}`);
  return (
    <>
      <Tab {...tabStyle}>
        <Center>
          <Frame />
        </Center>
        {isActive && (
          <Box>
            <Center {...stepStyle}>STEP {number}</Center>
            <Center {...stageStyle}>Frame Styles</Center>
          </Box>
        )}
      </Tab>
    </>
  );
}
export function IlluminationTab({ number, isActive }) {
  // console.log(`Tab ${number} is active: ${isActive}`);
  return (
    <>
      <Tab {...tabStyle}>
        <Center>
          <LightbulbOn />
        </Center>
        {isActive && (
          <Box>
            <Center {...stepStyle}>STEP {number}</Center>
            <Center {...stageStyle}>Illumination</Center>
          </Box>
        )}
      </Tab>
    </>
  );
}
export function DimensionsTab({ number, isActive }) {
  // console.log(`Tab ${number} is active: ${isActive}`);
  return (
    <>
      <Tab {...tabStyle}>
        <Center>
          <Ruler />
        </Center>
        {isActive && (
          <Box>
            <Center {...stepStyle}>STEP {number}</Center>
            <Center {...stageStyle}>Dimensions</Center>
          </Box>
        )}
      </Tab>
    </>
  );
}
