'use client';
import React, { useState, useEffect } from 'react';
import '@/app/styles/Components/switch2.css';
import { Box, Center } from '@chakra-ui/react';
import sealantSvg from '/public/svgs/edge-seal-brush.svg'; // Ensure this is exported as a React component
import { useDispatch } from 'react-redux';
import { setMESealant } from '../../../redux/slices/configGlassSlice';

const SVGWrapper = ({ Component, ...props }) => (
  <Box fontSize={{ base: '6vw', md: '1.5vw' }}>
    <Component {...props} />
  </Box>
);

function SwitchSealant() {
  const dispatch = useDispatch();
  const [isHPChecked, setIsHPChecked] = useState('');

  const toggleSwitch = () => {
    if (isHPChecked === 'checked') {
      setIsHPChecked('');
      dispatch(setMESealant('none'));
    } else {
      setIsHPChecked('checked');
      dispatch(setMESealant('yes'));
    }
  };

  // Render the component
  return (
    <Center display="flex" flexDirection="column" width="100%" flexGrow={'1'}>
      <Center
        fontSize={{ base: '4vw', md: '1.2vw' }}
        fontWeight={500}
        height={{ base: '12vw', md: '4vw' }}
      >
        Edge Sealant
      </Center>
      <Box height={{ base: '12vw', md: '4vw' }} width="100%">
        <div
          className={`switch-container ${isHPChecked}`}
          onClick={toggleSwitch}
        >
          <div className="switch-label yes">Yes</div>
          <div className="switch-button">
            <SVGWrapper Component={sealantSvg} />{' '}
            {/* Make sure heatpadSvg is a React component */}
          </div>
          <div className="switch-label no">No</div>
        </div>
      </Box>
    </Center>
  );
}

export default SwitchSealant;
