import React, { useState } from 'react';
import '@/app/styles/Components/switch2.css';
import radsSvg from '/public/svgs/square-dashed-duotone.svg';
import { Box } from '@chakra-ui/react';
//import { Img } from '@chakra-ui/react';

const SVGWrapper = ({ Component, ...props }) => (
  <Box fontSize={{ base: '6vw', md: '1.5vw' }}>
    <Component {...props} style={{}} />
  </Box>
);
//const [isChecked, setIsChecked] = useState('checked');

function SwitchRads({ isChecked, setIsChecked, disabled }) {
  // Toggle function
  const toggleSwitch = () => {
    console.log(isChecked);
    if (!disabled) {
      setIsChecked(!isChecked);
    }
  };

  return (
    <>
      <div
        className={`switch-container ${isChecked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={toggleSwitch}
      >
        <div className="switch-label yes">Same</div>
        <div className="switch-button">
          <SVGWrapper Component={radsSvg} />
        </div>
        <div className="switch-label no">Differ</div>
      </div>
    </>
  );
}

export default SwitchRads;
