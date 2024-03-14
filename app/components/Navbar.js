'use client';
import React, { useEffect } from 'react';
// import { Link } from '@chakra-ui/next-js';
import { Flex, Box, useDisclosure, Badge } from '@chakra-ui/react';
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import Image from 'next/image';
import Drawermw from './Drawermw';
import DrawerBasket from './DrawerBasket';
import { useDispatch, useSelector } from 'react-redux';
import useBasketStateSync from '@/app/hooks/basket/useBasketStateSync';
import useBasketCheckout from '@/app/hooks/basket/useBasketCheckout';
import {
  setBasketItemsQty,
  selectBasketItemsQty,
} from '@/app/redux/slices/configBasketSlice';
// import { setBasketDrawer } from '@/app/redux/slices/configSiteSlice';
// Import the Mirrorwold logo image
import mwlogo from '/public/images/mwlogo.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  // Initialize hooks
  useBasketStateSync();
  useBasketCheckout();
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isBasketOpen,
    onOpen: onBasketOpen,
    onClose: onBasketClose,
  } = useDisclosure();
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  // Get the basketItemsQty from Redux store
  const basketItemsQty = useSelector(selectBasketItemsQty);

  // Use useEffect to update the badge when basketItemsQty changes
  useEffect(() => {
    //console.log(basketItemsQty);
    {
      basketItemsQty && dispatch(setBasketItemsQty(basketItemsQty));
    }
  }, [basketItemsQty, dispatch]);

  return (
    <>
      <Drawermw isOpen={isMenuOpen} onClose={onMenuClose} />
      {/* <DrawerBasket isOpen={isOpen} onBasketClose={onClose} /> */}
      <DrawerBasket isOpen={isBasketOpen} onClose={onBasketClose} />

      <Flex
        className="mwNav noPrint"
        h="100px"
        alignItems="flex-start"
        justifyContent={'center'}
        w="100vw"
        paddingTop={'10px'}
      >
        <Flex
          justifySelf="center"
          as="nav"
          bg="none"
          gap={5}
          width="90vw"
          justifyItems={'center'}
          alignItems={'center'}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            w={{ base: '230px', sm: '250px' }}
            h="50px"
          >
            <Link href="/">
              <Image
                src={mwlogo}
                width={500}
                height={100}
                alt="Mirrorwold Logo"
                srcSet="
                  /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmwlogo.55b759f4.png&w=640&q=75 1x,
                  /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmwlogo.55b759f4.png&w=1080&q=75 2x
                "
              />
            </Link>
          </Box>
          <Box flexGrow="1" />
          {pathname !== '/summary' && (
            <Flex
              w="3vw"
              h="50px"
              justifyContent={'end'}
              alignItems={'center'}
              position="relative"
            >
              <BsCart3
                className="icon"
                style={{ transform: 'scale(2)', fill: 'white' }}
                onClick={onBasketOpen}
              />

              {/* Display the badge when there are items in the basket */}
              {basketItemsQty > 0 && (
                <Badge
                  position="absolute"
                  top="1"
                  right="-3"
                  backgroundColor={'#0cc6de'}
                  color="white"
                  borderRadius="full"
                >
                  {basketItemsQty}
                </Badge>
              )}
            </Flex>
          )}
          <Flex
            w={{ base: '5vw', md: '4vw', lg: '3vw' }}
            h="50px"
            _hover={{ cursor: 'pointer' }}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <AiOutlineMenu
              className="icon"
              style={{
                transform: 'scale(2)',
                fill: 'white',
              }}
              onClick={onMenuOpen}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
