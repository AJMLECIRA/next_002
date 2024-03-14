'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Text,
  Button,
  Flex,
  Divider,
  Center,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/pro-solid-svg-icons';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { faTrash, faPlus, faMinus } from '@fortawesome/pro-light-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import useAmendBasket from '@/app/hooks/basket/useAmendBasket';
import useBasketStateSync from '@/app/hooks/basket/useBasketStateSync';
import useBasketTotalCalculator from '@/app/hooks/basket/useBasketTotalCalculator';
import useBasketCheckout from '@/app/hooks/basket/useBasketCheckout';

export default function Basket({ isOpen, closeDrawer }) {
  const dispatch = useDispatch();
  const router = useRouter();
  // Initialize hooks for basket functionality
  // useBasketStateSync();
  useBasketTotalCalculator();
  const { handleCheckout } = useBasketCheckout();
  const { handleAddItem, handleDeleteItem, handleClearBasket, handleQuantity } =
    useAmendBasket();

  // Get basket items and basket ID from Redux store
  const basketItems = useSelector((state) => state.basket.basketData.items);
  const delCost = useSelector((state) => state.basket.delCost);
  const basketTotalValue = useSelector(
    (state) => state.basket.basketData.basketTotalValue
  );
  const basketOrderValue = useSelector(
    (state) => state.basket.basketOrderValue
  );
  const existingBasketId = useSelector(
    (state) => state.basket.basketData.basketID
  );

  // Styling for icons
  const iconStyle = {
    fontSize: '28px',
    color: '#00000070',
  };
  const handleButtonClick = async () => {
    console.log('Call the closeDrawer function to close the drawer');
    closeDrawer();
    try {
      await handleCheckout();
      // Redirect to '/summary' after checkout is complete
      router.push('/summary');
    } catch (error) {
      // Handle any errors from the checkout process
      console.error('Checkout failed:', error);
    }
  };
  return (
    <Box padding={{ base: '0.5vw 2vw', xl: '0.5vw 1vw' }}>
      {/* Basket header */}
      <Box>
        <Box
          display="flex"
          alignItems={'center'}
          margin={{ base: '3vw 0', md: '1vw 0vw' }}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            width="30px"
            style={{
              fontSize: '28px', // Default font-size for mobile
              '@media (minWidth: 768px)': {
                fontSize: '18px', // Font-size for screens wider than 768px (e.g., tablets and desktops)
              },
              padding: '0 1.5vw',
            }}
            color="#00000070"
          />
          <Text
            flex="1"
            fontSize={{ base: '4vw', md: '1.5vw' }}
            fontWeight={700}
            color="#00000070"
          >
            Order Summary
          </Text>
        </Box>

        {/* Divider for visual separation */}
        <Divider
          height="0vw"
          border="solid 0.1vw #00000040"
          margin={{ base: '4vw 0', md: '1vw 0' }}
        />
      </Box>
      {/* List of basket items */}
      <Box color="#00000095">
        <Box>
          {basketItems.map((item) => (
            <Grid
              key={item.id}
              templateColumns={'1fr 3fr 1fr'}
              fontSize={{ base: '2.5vw', md: '1.2vw', lg: '1.0vw' }}
              paddingTop={{
                base: '0.5vw',
                md: '1vw',
                lg: '1.5vw',
                xl: '0.5vw',
              }}
              columnGap={'1vw'}
            >
              {/* Use unique item ID as key */}
              <GridItem display="flex" alignItems="center">
                <Image
                  src={item.itemImg}
                  width="125"
                  height="75"
                  alt={item.name}
                />
              </GridItem>
              <Grid
                flexDirection="column"
                templateColumns={{
                  base: '2fr 1fr',
                  sm: '1fr',
                  md: '2fr 1fr',
                  xl: '2fr 1fr',
                }}
              >
                <GridItem display="flex" alignItems={'center'}>
                  <Flex flexDirection={'column'}>
                    <Box fontWeight="600">{item.name}</Box>
                    <Box>Dimensions Here</Box>
                  </Flex>
                </GridItem>
                <GridItem
                  display="flex"
                  alignItems={'center'}
                  justifyContent={{
                    base: 'center',
                    sm: 'start',
                    md: 'center',
                    xl: 'start',
                  }}
                >
                  <Flex alignItems="center">
                    <Center
                      onClick={() => handleQuantity(item.id, -1)}
                      backgroundColor={'white'}
                      width={{
                        base: '6vw',
                        md: '3.0vw',
                        lg: '2.5vw',
                        xl: '2.0vw',
                      }}
                      height={{
                        base: '6vw',
                        md: '3.0vw',
                        lg: '2.5vw',
                        xl: '2.0vw',
                      }}
                      borderRadius="3vw 0 0 3vw"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Center>
                    <Center
                      backgroundColor={'white'}
                      height={{
                        base: '6vw',
                        md: '3.0vw',
                        lg: '2.5vw',
                        xl: '2.0vw',
                      }}
                      width={{
                        base: '6vw',
                        md: '3.0vw',
                        lg: '2.5vw',
                        xl: '2.0vw',
                      }}
                    >
                      {item.qty}
                    </Center>
                    <Center
                      onClick={() => handleQuantity(item.id, 1)}
                      backgroundColor={'white'}
                      width={{
                        base: '6vw',
                        md: '3.0vw',
                        lg: '2.5vw',
                        xl: '2.0vw',
                      }}
                      height={{
                        base: '6vw',
                        md: '3.0vw',
                        lg: '2.5vw',
                        xl: '2.0vw',
                      }}
                      borderRadius="0 3vw 3vw 0"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Center>
                  </Flex>
                </GridItem>
              </Grid>

              <Flex flexDirection={'column'} flex="2">
                <Flex
                  fontWeight="600"
                  justifyContent={'end'}
                  alignItems="center"
                  style={{ marginTop: '1vw' }}
                >
                  £{' '}
                  {typeof item.price === 'number'
                    ? (item.price * item.qty).toFixed(2)
                    : 'Invalid Price'}
                </Flex>
                {item.qty > 1 && (
                  <Flex
                    width="100%"
                    textAlign={'end'}
                    justifyContent={'end'}
                    alignItems="center"
                    fontSize={{ base: '2vw', md: '0.8vw' }}
                  >
                    ( £ {item.price.toFixed(2)} each )
                  </Flex>
                )}
                <Flex
                  justifyContent="flex-end"
                  alignItems="flex-end" // Align to the bottom
                  style={{ marginTop: '1vw' }}
                >
                  <FontAwesomeIcon
                    style={{ paddingLeft: '20px' }}
                    icon={faTrash}
                    aria-label="Delete item"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </Flex>
              </Flex>
              <Divider
                margin={{ base: '4vw 0', md: '1vw 0' }}
                height="0vw"
                border="solid 0.05vw rgba(121, 121, 121, 0.25)"
                gridColumn="1 / span 3"
              />
            </Grid>
          ))}
        </Box>
      </Box>
      {/*Subtotal Items */}
      <Grid
        fontSize={{ base: '2.5vw', md: '1.4vw', lg: '1.2vw' }}
        templateColumns="3fr 1fr"
      >
        <GridItem display="flex" alignItems={'center'}>
          Subtotal
        </GridItem>
        <GridItem display="flex" alignItems={'center'} justifyContent={'end'}>
          £ {basketTotalValue.toFixed(2)}
        </GridItem>
        <GridItem display="flex" alignItems={'center'}>
          Delivery Cost
        </GridItem>
        <GridItem display="flex" alignItems={'center'} justifyContent={'end'}>
          £ {delCost.toFixed(2)}
          {/* £ {basketTotalValue.toFixed(2)} */}
        </GridItem>
        <Divider
          margin={{ base: '4vw 0', md: '1vw 0' }}
          height="0vw"
          border="solid 0.1vw rgba(121, 121, 121, 0.25)"
          gridColumn="1 / span 2"
        />
        <GridItem display="flex" alignItems={'center'} fontWeight={700}>
          Order Total
        </GridItem>
        <GridItem>
          <Flex justifyContent={'end'} fontWeight={700}>
            {basketOrderValue > 0 ? (
              <span>£ {basketOrderValue.toFixed(2)}</span>
            ) : (
              <span>£ {basketTotalValue.toFixed(2)}</span>
            )}
          </Flex>
          <Flex fontSize="0.6rem" justifyContent={'end'}>
            incl VAT
          </Flex>
        </GridItem>
      </Grid>

      {/* Checkout button */}
      <Box padding="2vw 0" display="flex">
        <Button
          color="#ffffff"
          onClick={handleButtonClick}
          style={{ backgroundColor: '#0cc6de' }}
          width="100%"
          borderRadius={{ base: '8vw', md: '2vw' }}
        >
          Go To Checkout
        </Button>
      </Box>
    </Box>
  );
}
