'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Center,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMMHeight,
  setMMWidth,
} from '../../../redux/slices/configGlassSlice';
import ReduxInput from '../ReduxInput';

const gridItem = {
  display: 'flex',
  justifyContent: 'center',
  fontSize: { base: '4vw', md: '2vw', lg: '1.5vw' },
  paddingBottom: { base: '1vw', md: '1vw' },
};
const inputItem = {
  display: 'flex',
  border: 'solid 1px #666',
  borderRadius: { base: '8vw', md: '3vw' },
  fontSize: { base: '4vw', md: '2.0vw', lg: '2.0vw' },
  textAlign: { base: 'start', md: 'start' },
  padding: {
    base: '6vw',
    sm: '5vw',
    md: '2vw 3vw',
    lg: '2.5vw 3vw',
    lg: '2vw 3vw',
  },
  height: { base: '8vw', md: '4vw' },
};
const buttonItem = {
  display: 'flex',
  border: 'solid 1px #666',
  borderRadius: { base: '8vw', md: '3vw' },
  padding: '30px 0',
  textAlign: ' center',
  width: '100%',
  fontSize: '1.2vw',
};
const optionItem = {
  padding: '30px 0',
};
const disabledItem = {
  disabled: 'disabled',
  background: 'rgb(230,230,230)',
  color: 'rgb(245,245,245)',
  borderRadius: '3vw',
  height: '4vw',
};
export default function CalcCompSizeScale() {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.configGlass.mirrorMaterialWidth);
  const height = useSelector((state) => state.configGlass.mirrorMaterialHeight);
  const shape = useSelector((state) => state.configGlass.mirrorMaterialShape);

  const isInputDisabled = ['hexagon', 'octagon', 'pentagon'].includes(
    shape.toLowerCase()
  );

  useEffect(() => {
    if (isInputDisabled) {
      dispatch(setMMHeight(width));
    }
  }, [width, shape]);

  // State to keep track of the current unit
  const [unit, setUnit] = useState('mm'); // Start with millimeters by default
  //const [width, setWidth] = useState(0); // Width in millimeters
  const units = ['Inches', 'cm', 'mm'];

  // Conversion function from mm to Inches
  const convertMmToInches = (mm) => {
    return Math.round((mm / 25.4) * 100) / 100; // 1 inch is 25.4 millimeters
  };

  const toggleUnit = () => {
    // Find the current index of the unit
    const currentIndex = units.indexOf(unit);
    // Calculate the index of the next unit
    const nextIndex = (currentIndex + 1) % units.length;
    // Set the unit to the next unit in the array
    const nextUnit = units[nextIndex];

    // Make the conversion
    if (nextUnit === 'Inches') {
      // Convert the width to Inches and update the width state
      let convertedWidth = convertMmToInches(height);
      console.log(convertedWidth);
    }

    setUnit(nextUnit);
  };

  return (
    <Grid templateColumns={{ base: '1fr 4vw 1fr', md: '1fr 1vw 1fr' }}>
      <GridItem {...gridItem}>Width</GridItem>
      <GridItem {...gridItem}>x</GridItem>
      <GridItem {...gridItem}>Height</GridItem>
      <GridItem>
        <ReduxInput
          {...inputItem}
          selector={(state) => state.configGlass.mirrorMaterialWidth}
          actionCreator={setMMWidth}
        />
      </GridItem>
      <GridItem></GridItem>
      <GridItem {...(isInputDisabled ? disabledItem : {})}>
        <ReduxInput
          {...inputItem}
          selector={(state) => state.configGlass.mirrorMaterialHeight}
          actionCreator={setMMHeight}
        />
      </GridItem>
    </Grid>
  );
}
