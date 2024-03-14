import React from 'react';
import '@/app/styles/Components/switch2.css';
import bevelSvg from '/public/svgs/bevel-corner-light.svg';
import { Box } from '@chakra-ui/react';
//import { Img } from '@chakra-ui/react';

const SVGWrapper = ({ Component, ...props }) => (
  <Box fontSize={{ base: '6vw', md: '1.5vw' }} opacity="0.5">
    <Component {...props} style={{ opacity: '0.5' }} />
  </Box>
);

function SwitchBevel({ isChecked, setIsChecked, disabled }) {
  // Toggle function
  const toggleSwitch = () => {
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
        <div className="switch-label yes">Yes</div>
        <div className="switch-button">
          {/* <Img
            className="switch-svg"
            src={bevelSvg}
            width={{ base: '3vw', md: '1.5vw' }}
          /> */}
          <SVGWrapper Component={bevelSvg} />
        </div>
        <div className="switch-label no">No</div>
      </div>
    </>
  );
}

export default SwitchBevel;
