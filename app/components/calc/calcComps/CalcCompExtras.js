'use client';
import { Center, Grid, GridItem, Img, Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import {
  setMEHeatpad,
  setMESealant,
  setMETape,
} from '../../../redux/slices/configGlassSlice';
import SwitchHeatpad from '../switches/SwitchHeatpad';
import SwitchSealant from '../switches/SwitchSealant';
import SwitchTape from '../switches/SwitchTape';

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

const HoverableGridItem = ({ children, title, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      onClick={() => onActivate(title, isActive)}
      _hover={{ cursor: 'pointer' }}
      display="flex" // use flexbox to align children
      flexDirection="column" // stack children vertically
      justifyContent="center" // center children vertically
      alignItems="center" // center children horizontally
    >
      <Center color={iconColor} fill={svgColor}>
        {children}
      </Center>
      <Center {...gridItemTitle}>{title}</Center>
    </GridItem>
  );
};

export default function CalcCompExtras() {
  const dispatch = useDispatch();

  // Fetch the activeElements from Redux state
  const activeFittings = useSelector(
    (state) => state.configGlass.mirrorExtraFittings
  );
  const activeScrews = useSelector(
    (state) => state.configGlass.mirrorExtraScrews
  );
  const activeAdhesive = useSelector(
    (state) => state.configGlass.mirrorExtraAdhesive
  );
  // 2. Create a callback function that sets this state.
  const handleActivate = (choice) => {
    console.log(choice);
    if (choice === 'screws') {
      dispatch(setMEFittings('yes'));
      dispatch(setMEAdhesive('none'));
      dispatch(setMEScrews('AC008'));
    } else if (choice === 'adhesive') {
      dispatch(setMEFittings('yes'));
      dispatch(setMEScrews('none'));
      dispatch(setMEAdhesive('AC015'));
    } else {
      dispatch(setMEFittings('none'));
      dispatch(setMEScrews('none'));
      dispatch(setMEAdhesive('none'));
    }
  };
  return (
    <Grid
      templateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)' }}
      columnGap={{ base: '4vw', md: '1vw' }}
      flexDirection="row"
      margin={{ base: '10px 0 20px', md: '0 0 20px' }}
    >
      <SwitchHeatpad />
      <SwitchSealant />
      <SwitchTape />
    </Grid>
  );
}
