import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Basket from '@/app/components/basket/Basket';

const gradientBackground = {
  background: 'linear-gradient(to left, #00000020, #00000005)', // Adjust colors as needed
  height: '100%', // Adjust the height as needed
};

export default function DrawerBasket({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={{ base: 'md', xl: 'lg' }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody style={gradientBackground}>
          <Basket closeDrawer={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
