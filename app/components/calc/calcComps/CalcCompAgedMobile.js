'use client';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import GlassAgedModal from '../modals/GlassAgedModal';

export default function CalcCompTintedMobile() {
  const activeTint = useSelector(
    (state) => state.configGlass.mirrorMaterialName
  );
  const activeTintImg = useSelector(
    (state) => state.configGlass.selectedTintImgURL
  );
  const bgImage = activeTintImg
    ? `url(${activeTintImg}) no-repeat center center`
    : 'none';
  console.log('bgImage :', bgImage);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openGlassAgedModal = () => {
    console.log('open Model');
    onOpen();
  };
  const outerBoxStyle = {
    // background: 'linear-gradient(to right, #dfb4a8, #deb8b2, #ffdacc)',
    display: 'flex',
    height: '30vw',
    border: '1px solid #666',
    borderRadius: '4vw',
    padding: '3vw',
    marginTop: '4vw',
  };
  const innerBoxStyle = {
    // background: 'linear-gradient(to right, #dfb4a8, #deb8b2, #ffdacc)',
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: '3vw',
    padding: '3vw',
    flexDirection: 'column',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  };
  const buttonStyle = {
    borderRadius: '4vw',
    width: '100%',
    fontSize: '3vw',
    padding: '4vw 0',
    background: '#a6aaaf',
    color: '#ffffff',
  };
  const textStyle = {
    fontSize: '4vw',
    color: 'rgba(0, 0, 0, 1)',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '2vw',
    fontWeight: '500',
  };
  return (
    <>
      <Center {...outerBoxStyle} background={bgImage} backgroundSize="cover">
        <Box {...innerBoxStyle}>
          <Text {...textStyle}>{activeTint}</Text>
          <Button {...buttonStyle} onClick={() => openGlassAgedModal()}>
            Change
          </Button>
        </Box>
      </Center>
      <GlassAgedModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
