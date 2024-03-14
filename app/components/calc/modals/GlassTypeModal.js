'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMMGroup,
  setMMName,
  setMMCode,
  setMMGauge,
  setSelTintImg,
} from '../../../redux/slices/configGlassSlice';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Box,
  Center,
} from '@chakra-ui/react';
import SvgImage from '../../svgImage';

const items = [
  { title: 'plain', icon: 'Glassthin' },
  { title: 'tinted', icon: 'Glasstintedthin' },
  { title: 'aged', icon: 'Glassdistressedlight' },
  { title: 'textured', icon: 'Glasstexturedthin' },
];

export default function GlassTypeModal({ isOpen, onClose }) {
  const activeGlassType = useSelector(
    (state) => state.configGlass.mirrorMaterialGroup
  );
  const activeGauge = useSelector(
    (state) => state.configGlass.mirrorMaterialGauge
  );

  const dispatch = useDispatch();
  const handleItemClick = (item) => {
    dispatch(setMMGroup(item.title));
    if (item.title === 'plain') {
      dispatch(setMMName('Standard Mirror'));
      if (activeGauge === 4) {
        dispatch(setMMCode('MX001'));
      } else {
        dispatch(setMMCode('MX002'));
      }
    } else if (item.title === 'tinted') {
      dispatch(setMMName('Bronze Tinted Mirror'));
      dispatch(setMMCode('GX005'));
      dispatch(setSelTintImg('/images/glass/GX005.jpg'));
    } else if (item.title === 'aged') {
      dispatch(setMMName('GT016 - Antique Mirror'));
      dispatch(setMMCode('GT016'));
      dispatch(setSelTintImg('/images/glass/GT021.jpg'));
    } else {
      dispatch(setMMName(''));
      dispatch(setMMCode(''));
      dispatch(setMMGauge(6));
    }
    onClose(); // Close the modal
  };

  //console.log(activeGlassType);

  const activeStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #0cc6de',
    fill: '#0cc6de',
    // Other styles for active item
  };

  const normalStyle = {
    backgroundColor: 'rgb(250,250,250)',
    border: '1px solid gray',
    // Other styles for normal item
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        margin="15vw 3vw"
        borderRadius="4vw"
        backgroundColor={'rgb(245,245,245)'}
      >
        <ModalHeader
          style={{ textTransform: 'uppercase' }}
          textAlign={'center'}
          margin="10px"
        >
          Type of glass
        </ModalHeader>
        <ModalCloseButton margin="15px" color="red" fontSize="4vw" />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={'4vw'}>
            {items.map((item, index) => {
              const isActive = item.title === activeGlassType;
              const itemStyle = isActive ? activeStyle : normalStyle;

              return (
                <GridItem
                  key={index}
                  p={4}
                  border="1px solid gray"
                  onClick={() => handleItemClick(item)}
                  borderRadius="6vw"
                  backgroundColor="rgb(250,250,250)"
                  style={itemStyle}
                >
                  <Box textAlign="center">
                    <Box
                      // sets the size if the icon
                      width="100%"
                      height="80px"
                    >
                      <SvgImage
                        src={item.icon}
                        width="100%"
                        height="100%"
                        isActive={isActive}
                      />
                    </Box>
                    <Center textTransform={'uppercase'}>{item.title}</Center>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </ModalBody>
        <ModalFooter>
          {/* You can add buttons or additional content here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
