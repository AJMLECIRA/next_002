'use client';
import { Box, Button, Text, chakra } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import GlassTintModal from '../modals/GlassTintModal';
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
  const openGlassTintModal = () => {
    console.log('open Model');
    onOpen();
  };
  const boxStyle = {
    // background: 'linear-gradient(to right, #dfb4a8, #deb8b2, #ffdacc)',
    display: 'flex',
    height: '30vw',
    justifyContent: 'end',
    border: '1px solid #666',
    borderRadius: '4vw',
    padding: '4vw',
    marginTop: '4vw',
    flexDirection: 'column',
  };
  const buttonStyle = {
    borderRadius: '4vw',
    width: '100%',
    fontSize: '4vw',
    backdropFilter: 'blur(1px)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  };
  const textStyle = {
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '4vw',
    textShadow: '2px 2px 2px rgba(0, 0, 0, 1.0)',
  };
  return (
    <>
      <Box {...boxStyle} background={bgImage} backgroundSize="cover">
        <Text {...textStyle}>{activeTint}</Text>
        <Button {...buttonStyle} onClick={() => openGlassTintModal()}>
          Change
        </Button>
      </Box>
      <GlassTintModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      {/* <GlassAgedModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
    </>
  );
}
