'use client';
import React, { useState, useEffect } from 'react';
import '@/app/styles/Components/switch2.css';
import useGetDBFieldQuery from '@/app/hooks/useGetDBFieldQuery';
import { Box, Center } from '@chakra-ui/react';
import heatpadSvg from '/public/svgs/heated-pad.svg'; // Ensure this is exported as a React component
import { useDispatch } from 'react-redux';
import { setMEHeatpad } from '../../../redux/slices/configGlassSlice';
import { useSelector } from 'react-redux';

const SVGWrapper = ({ Component, ...props }) => (
  <Box fontSize={{ base: '4vw', md: '1.5vw' }}>
    <Component {...props} />
  </Box>
);

function SwitchHeatpad() {
  const dispatch = useDispatch();
  const [isHPChecked, setIsHPChecked] = useState('');

  const width = useSelector((state) => state.configGlass.mirrorMaterialWidth);
  const height = useSelector((state) => state.configGlass.mirrorMaterialHeight);
  const screws = useSelector((state) => state.configGlass.mirrorExtraScrews);
  const heatpad = useSelector((state) => state.configGlass.mirrorExtraHeatpad);
  const [noSuitableHeatpad, setNoSuitableHeatpad] = useState(false);
  const [clearviewItems, setClearviewItems] = useState([]);

  const {
    data: clearviewData,
    loading,
    error,
  } = useGetDBFieldQuery('clearview', 'available', 'yes');

  useEffect(() => {
    setClearviewItems(clearviewData);
  }, [clearviewData]);

  useEffect(() => {
    const findMaxHeatpadSize = () => {
      // console.log('Finding max heatpad size for given dimensions.');
      // reduce Size by 100mm for screws
      let HPwidth = width;
      let HPheight = height;
      if (screws !== 'none') {
        (HPwidth = width - 100), (HPheight = height - 100);
      }
      // console.log(screws, HPwidth, HPheight);
      // Filter to include only heatpads that fit in at least one orientation
      const suitableHeatpads =
        clearviewItems &&
        clearviewItems.filter((item) => {
          // Check if heatpad fits in normal orientation
          const fitsNormally =
            item.widthM <= HPwidth && item.heightM <= HPheight;
          // Check if heatpad fits when rotated 90 degrees
          const fitsRotated =
            item.widthM <= HPheight && item.heightM <= HPwidth;

          return fitsNormally || fitsRotated;
        });

      // Find the largest heatpad by area that fits in either orientation
      const largestHeatpad =
        suitableHeatpads &&
        suitableHeatpads.sort((a, b) => {
          const areaA = a.widthM * a.heightM;
          const areaB = b.widthM * b.heightM;
          return areaB - areaA;
        })[0]; // The largest suitable heatpad

      if (largestHeatpad && heatpad !== 'none') {
        // console.log('Largest suitable heatpad found:', largestHeatpad);
        dispatch(setMEHeatpad(largestHeatpad.Name));
        setNoSuitableHeatpad(false);
      } else if (heatpad === 'none') {
        dispatch(setMEHeatpad('none'));
        setNoSuitableHeatpad(false);
      } else {
        // console.log('No suitable heatpad found.');
        dispatch(setMEHeatpad('yes'));
        setNoSuitableHeatpad(true);
      }
    };
    findMaxHeatpadSize();
  }, [width, height, clearviewItems, isHPChecked, dispatch]);

  const findHeatpad = () => {
    // Logic to find a suitable heat pad from the clearviewItems state
    // console.log('Search for suitable heat pad');
    // console.log(clearviewItems);
  };

  const toggleSwitch = () => {
    if (isHPChecked === 'checked') {
      setIsHPChecked('');
      dispatch(setMEHeatpad('none'));
    } else {
      setIsHPChecked('checked');
      dispatch(setMEHeatpad('yes'));
      findHeatpad();
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
        Heated Pad
      </Center>
      <Box height={{ base: '12vw', md: '4vw' }} width="100%">
        <div
          className={`switch-container ${isHPChecked}`}
          onClick={toggleSwitch}
        >
          <div className="switch-label yes">Yes</div>
          <div className="switch-button">
            <SVGWrapper Component={heatpadSvg} />{' '}
            {/* Make sure heatpadSvg is a React component */}
          </div>
          <div className="switch-label no">No</div>
        </div>
      </Box>
      {noSuitableHeatpad && (
        <Box textAlign="center" color="red" mt="4">
          No suitable heatpad found for the selected dimensions.
        </Box>
      )}
    </Center>
  );
}

export default SwitchHeatpad;
