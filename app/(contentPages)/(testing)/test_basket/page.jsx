'use client';
import Basket from '@/app/components/basket/Basket';
import { useSelector } from 'react-redux';
import { Box, Spacer } from '@chakra-ui/react';

const BasketView = () => {
  return (
    <Box padding="150">
      <Basket />
    </Box>
  );
};

export default BasketView;
