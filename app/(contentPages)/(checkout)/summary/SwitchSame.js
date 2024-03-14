'use client';
import React, { useState, useEffect } from 'react';
import '@/app/styles/Components/switch2.css';
import { Box, Center } from '@chakra-ui/react';

export default function SwitchSame({ onSwitchStateChange }) {
  const [isSameChecked, setIsSameChecked] = useState('');

  const toggleSwitch = () => {
    const newState = isSameChecked === 'checked' ? '' : 'checked';
    setIsSameChecked(newState);
    // Call the callback function to pass the state to the parent component
    setTimeout(() => {
      // Call the callback function to pass the state to the parent component
      onSwitchStateChange(newState);
    }, 500); // 500 milliseconds = 2 seconds
  };

  // Render the component
  return (
    <Box height={{ base: '2vw', md: '2vw' }} width="25%">
      <div
        className={`switch-container ${isSameChecked}`}
        onClick={toggleSwitch}
      >
        <div className="switch-label yes"></div>
        <div className="switch-button"></div>
        <div className="switch-label no"></div>
      </div>
    </Box>
  );
}
