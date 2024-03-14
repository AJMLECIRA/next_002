'use client';
import {
  Box,
  Center,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SwitchBevel from '../switches/switchBevel';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMMGauge,
  setMMEdge,
  setBevelEdgeWidth,
} from '../../../redux/slices/configGlassSlice';

export default function CalcCompEdge() {
  const dispatch = useDispatch();
  const edgeType = useSelector((state) => state.configGlass.mirrorMaterialEdge);
  const glassType = useSelector(
    (state) => state.configGlass.mirrorMaterialGroup
  );

  const [isChecked, setIsChecked] = useState(edgeType === 'bevelled');
  const [bevelWidth, setBevelWidth] = useState(0); // initial value

  useEffect(() => {
    if (glassType === 'textured') {
      dispatch(setMMEdge('polished'));
      setIsChecked(false);
    }
    if (glassType === 'textured' || glassType === 'tinted') {
      dispatch(setMMGauge(6));
    }
  }, [glassType, dispatch]);

  useEffect(() => {
    const edge = isChecked ? 'bevelled' : 'polished';
    dispatch(setMMEdge(edge));
    const width = isChecked ? 25 : 0;
    dispatch(setBevelEdgeWidth(width));
    if (isChecked) {
      setBevelWidth(25);
    } else {
      setBevelWidth(0);
    }
  }, [isChecked, dispatch]);

  useEffect(() => {
    dispatch(setBevelEdgeWidth(bevelWidth));
    if (bevelWidth > 0) {
      dispatch(setMMEdge('bevelled'));
      setIsChecked(true);
    }
  }, [bevelWidth, dispatch]);

  const titleStyle = {
    padding: { base: '3vw 0', md: '0 0 0.5vw' },
    fontSize: { base: '3.5vw', md: '1.2vw' },
    fontWeight: '500',
  };

  return (
    <Box>
      <Center {...titleStyle}>Bevel Edge ( mm )</Center>
      <Center height={{ base: '12vw', md: '4vw' }}>
        <Flex
          alignItems={'center'}
          width="100%"
          columnGap={{ base: '4vw', md: '1vw' }}
          height="100%"
        >
          <SwitchBevel
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            disabled={glassType === 'textured'}
          />
          <Box
            sx={{
              '& [aria-invalid="true"]': {
                borderColor: '#666!important',
                boxShadow: '0 0 0 0 #666!important',
              },
            }}
            width="100%"
            height="100%"
            display="flex"
            alignItems={'center'}
            border="0"
          >
            <NumberInput
              id="bevInput"
              disabled={glassType === 'textured'}
              width="100% "
              value={bevelWidth}
              min={10}
              max={40}
              step={5}
              height="100%"
              onChange={(valueAsString, valueAsNumber) =>
                setBevelWidth(valueAsNumber)
              }
            >
              <NumberInputField
                borderRadius={{ base: '8vw', md: '4vw' }}
                border="solid 1px #666"
                fontSize={{ base: '4vw', md: '1.2vw' }}
                height="100%"
                fontWeight="500"
                padding={{ base: '0 4vw', md: '0 2vw' }}
              />
              <NumberInputStepper width="40%">
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
