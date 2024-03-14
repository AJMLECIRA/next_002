'use client';
import { Box, Center, Button, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMMGauge, setMMCode } from '../../../redux/slices/configGlassSlice';

export default function CalcCompGauge() {
  const dispatch = useDispatch();
  const activeGauge = useSelector(
    (state) => state.configGlass.mirrorMaterialGauge
  );
  const glassType = useSelector(
    (state) => state.configGlass.mirrorMaterialGroup
  );

  const handleGaugeSelection = (activeGauge) => {
    dispatch(setMMGauge(activeGauge));
    if (activeGauge == 4 && glassType === 'plain') {
      dispatch(setMMCode('MX001'));
    }
    if (activeGauge == 6 && glassType === 'plain') {
      dispatch(setMMCode('MX002'));
    }
  };
  // gauge buttons
  const [isButton4Disabled, setIsButton4Disabled] = useState(false);
  useEffect(() => {
    if (glassType != 'plain') {
      setIsButton4Disabled(true);
    } else {
      setIsButton4Disabled(false);
    }
  }, [glassType]);

  const titleStyle = {
    padding: { base: '4vw 0 3vw', md: '0 0 0.5vw' },
    fontSize: { base: '3.5vw', md: '1.2vw' },
    fontWeight: '500',
  };
  const btnStyle = {
    background: '#ffffff',
    borderRadius: { base: '8vw', md: '4vw' },
    width: '100%',
    padding: { base: '3.5vw', md: '1.2vw' },
    height: { base: '12vw', md: '100%' },
    fontSize: { base: '4vw', md: '1.2vw' },
    fontWeight: { base: '400', md: '500' },
  };
  return (
    <Box>
      <Center {...titleStyle}>Glass Gauge</Center>
      <Center height={{ base: '12vw', md: '4vw' }}>
        <Flex
          alignItems={'center'}
          width="100%"
          columnGap={{ base: '4vw', md: '1vw' }}
          height="100%"
        >
          <Button
            isDisabled={isButton4Disabled}
            {...btnStyle}
            border={activeGauge === 4 ? 'solid 3px #0cc6de' : 'solid 1px #666'}
            margin={activeGauge === 4 ? '0px' : '2px'}
            onClick={() => handleGaugeSelection(4)}
          >
            4 mm
          </Button>
          <Button
            {...btnStyle}
            border={activeGauge === 6 ? 'solid 3px #0cc6de' : 'solid 1px #666'}
            margin={activeGauge === 6 ? '0px' : '2px'}
            onClick={() => handleGaugeSelection(6)}
          >
            6 mm
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
