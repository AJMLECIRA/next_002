import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const ImageComponent = () => {
  const basketItemImg = useSelector((state) => state.basket.basketItemImg);
  //console.log('Basket Item Image', basketItemImg);
  return (
    <Box padding="150">
      <Image src={basketItemImg} alt="Sample Image" width="350" height="250" />
    </Box>
  );
};

export default ImageComponent;
