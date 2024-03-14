import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

const Drawermw = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu Heading</DrawerHeader>
        <DrawerBody>
          <Text>Menu listing goes here</Text>
          <Text>
            <Link href="/" onClick={onClose}>
              Home
            </Link>
          </Text>
          <Text>
            <Link href="/contact" onClick={onClose}>
              Contact Us
            </Link>
          </Text>
          <Text>
            <Link href="/mtm" onClick={onClose}>
              Made-to-Measure
            </Link>
          </Text>
          <Text>
            <Link href="/calcGlass" onClick={onClose}>
              Online Glass Calculators
            </Link>
          </Text>
          <Text>
            <Link href="/mwadmin/" onClick={onClose}>
              Admin
            </Link>
          </Text>
          <Text>
            <Link href="/test" onClick={onClose}>
              Test Page
            </Link>
          </Text>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Drawermw;
