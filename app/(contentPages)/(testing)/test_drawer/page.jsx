'use client';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Basket from '@/app/components/basket/Basket';
import { AiOutlineMenu } from 'react-icons/ai';

const gradientBackground = {
  background: 'linear-gradient(to left, #00000020, #00000005)', // Adjust colors as needed
  height: '100%', // Adjust the height as needed
};

const TestBasketDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeDrawer = () => {
    onClose();
  };
  return (
    <Box paddingTop="150">
      <Box>
        Test to open drawer
        <AiOutlineMenu
          className="icon"
          style={{
            transform: 'scale(2)',
            fill: 'red',
          }}
          onClick={onOpen}
        />
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody style={gradientBackground}>
            <Basket closeDrawer={closeDrawer} />
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default TestBasketDrawer;
