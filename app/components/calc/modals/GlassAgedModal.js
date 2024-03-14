'use client';
import React, { useEffect, useState } from 'react';
import useGetDBFieldQuery from '@/app/hooks/useGetDBFieldQuery';
import { useDispatch, useSelector } from 'react-redux';
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
  Center,
} from '@chakra-ui/react';
import {
  setMMCode,
  setMMName,
  setSelTintImg,
} from '../../../redux/slices/configGlassSlice';

export default function GlassAgedModal({ isOpen, onClose }) {
  const [glassItems, setGlassItems] = useState([]);
  const dispatch = useDispatch();
  const {
    data: glassData,
    loading,
    error,
  } = useGetDBFieldQuery('allGlass', 'type', 'aged');

  useEffect(() => {
    //console.log('loading glass data');
    setGlassItems(glassData); // Initialize glassItems with fetched data
  }, [glassData]);

  const handleItemClick = (item) => {
    console.log(item);
    //setActiveItem(itemId);
    dispatch(setMMCode(item.MWref));
    dispatch(setMMName(item.MWName));
    dispatch(setSelTintImg(`/images/glass/${item.MWref}.jpg`));
    onClose(); // Close the modal
  };

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
  console.log(glassItems);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        margin="15vw 3vw"
        borderRadius="4vw"
        backgroundColor={'#ECECEC'}
      >
        <ModalHeader
          style={{ textTransform: 'uppercase' }}
          textAlign={'center'}
          margin="10px"
        >
          Select A Tint Colour
        </ModalHeader>
        <ModalCloseButton margin="15px" color="red" fontSize="4vw" />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={'4vw'}>
            {glassItems &&
              glassItems.map((item, index) => {
                const bgImage = `url("/images/glass/${item.MWref}.jpg")`;
                return (
                  <>
                    {item.availability === 'yes' && (
                      <GridItem
                        width="100%"
                        height="24vw"
                        p={'8vw'}
                        border="0px solid gray"
                        onClick={() => handleItemClick(item)}
                        borderRadius="6vw"
                        background={bgImage}
                        backgroundSize="cover"
                        key={index}
                      >
                        <Center
                          borderRadius={'2.5vw'}
                          backdropFilter="blur(1px)"
                          backgroundColor="rgba(255, 255, 255, 0.6)"
                          color=""
                          width="100%"
                          height="100%"
                          textAlign={'center'}
                        >
                          {item.MWref}
                        </Center>
                      </GridItem>
                    )}
                  </>
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
