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
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '@/app/mwadmin/AuthContext';
import Link from 'next/link';
import * as styles from '@/app/styles/admin/navbar.module.css';

const Draweradmin = ({ isOpen, onClose }) => {
  const { user, logout, loading, isAdmin } = useAuth();

  const handleLogout = () => {
    logout(onClose); // Pass onClose as a callback to the logout function
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <Flex
          align={'center'}
          justifyContent={'start'}
          columnGap={'10px'}
          padding={'10px'}
        >
          <Button className="btn" onClick={handleLogout}>
            Logout
          </Button>
          {user && user.displayName}
        </Flex>
        <DrawerCloseButton />
        <DrawerBody>
          <Text>
            <Link href="/" onClick={onClose}>
              Home Page
            </Link>
          </Text>
          <Text>
            <Link href="/mwadmin" onClick={onClose}>
              Admin Home Page
            </Link>
          </Text>
          <Text>
            <Link href="/mwadmin/signup" onClick={onClose}>
              Register User
            </Link>
          </Text>
          <Text>
            <Link href="/mwadmin/login" onClick={onClose}>
              Login
            </Link>
          </Text>
          <DrawerHeader>Departments</DrawerHeader>
          <Accordion allowToggle>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      background={isExpanded ? '#0cc6de' : 'white'}
                      color={isExpanded ? '#fff' : ''}
                      _hover={{ color: '#000' }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Sales
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text className={styles.linkHover}>
                      <Link href="/mwadmin/sales">Sales</Link>
                    </Text>
                    <Text className={styles.linkHover}>
                      <Link href="/mwadmin/merketing">Marketing</Link>
                    </Text>
                    <Text className={styles.linkHover}>
                      <Link href="/contact">Logistics</Link>
                    </Text>
                    <Text className={styles.linkHover}>
                      <Link href="/contact">Customer Service</Link>
                    </Text>
                    <Text className={styles.linkHover}>
                      <Link href="/contact">Stock</Link>
                    </Text>
                    <Text className={styles.linkHover}>
                      <Link href="/contact">Admin</Link>
                    </Text>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      background={isExpanded ? '#0cc6de' : 'white'}
                      color={isExpanded ? '#fff' : ''}
                      _hover={{ color: '#000' }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Marketing
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      background={isExpanded ? '#0cc6de' : 'white'}
                      color={isExpanded ? '#fff' : ''}
                      _hover={{ color: '#000' }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Logistics
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      background={isExpanded ? '#0cc6de' : 'white'}
                      color={isExpanded ? '#fff' : ''}
                      _hover={{ color: '#000' }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Customer Service
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      background={isExpanded ? '#0cc6de' : 'white'}
                      color={isExpanded ? '#fff' : ''}
                      _hover={{ color: '#000' }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Stock
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      background={isExpanded ? '#0cc6de' : 'white'}
                      color={isExpanded ? '#fff' : ''}
                      _hover={{ color: '#000' }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Administration
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text className={styles.linkHover}>
                      <Link href="/mwadmin/glassData" onClick={onClose}>
                        Glass Data
                      </Link>
                    </Text>
                    <Text className={styles.linkHover}>
                      <Link href="/mwadmin/testPage" onClick={onClose}>
                        Data Test Page
                      </Link>
                    </Text>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>

          {/*  */}
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Draweradmin;
