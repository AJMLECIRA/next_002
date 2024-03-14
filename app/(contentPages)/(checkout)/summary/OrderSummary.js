'use client';
import React, { useEffect } from 'react';
import { Box, Text, Flex, Divider, Grid, GridItem } from '@chakra-ui/react';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/pro-solid-svg-icons';
// import { faTrash, faPlus, faMinus } from '@fortawesome/pro-light-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import useAmendBasket from '@/app/hooks/basket/useAmendBasket';
import useBasketStateSync from '@/app/hooks/basket/useBasketStateSync';
import useBasketTotalCalculator from '@/app/hooks/basket/useBasketTotalCalculator';
import { setBasketOrderValue } from '@/app/redux/slices/configBasketSlice';
// import PayPalPayment from '@/app/components/paypal/PaypalButton';
import '@/app/(contentPages)/(checkout)/summary/summary.css';
import DelAddBlock from './DelAddBlock';
import BillAddBlock from './BillAddBlock';
// import Stripe from './Stripe';
export default function OrderSummary() {
  const dispatch = useDispatch();

  // Initialize hooks for basket functionality
  // useBasketStateSync();
  useBasketTotalCalculator();
  const { handleAddItem, handleDeleteItem, handleClearBasket, handleQuantity } =
    useAmendBasket();

  // Get basket items and basket ID from Redux store
  const basketID = useSelector((state) => state.basket.basketData.basketID);
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
  const customer = useSelector((state) => state.basket.customerData);
  useEffect(() => {
    // update basketOrderTotal
    const newBasketOrderTotal = Number(basketTotalValue) + Number(delCost);
    dispatch(setBasketOrderValue(newBasketOrderTotal));
  }, [basketTotalValue, delCost, dispatch]);

  return (
    <Flex
      padding={{ base: '1vw 6vw', md: '0.5vw 2vw' }}
      backgroundColor="#00000020"
      borderRadius="0 1vw 1vw 0"
      height="100%"
      flex="1"
      flexDirection={'column'}
    >
      {/* Basket header */}
      <Box>
        <Box
          display="flex"
          alignItems={'center'}
          margin={{ base: '3vw 0', md: '1vw 0vw' }}
        >
          <Text className="sectionTitle">Order Summary</Text>
        </Box>
        <Divider
          height="0vw"
          border="solid 0.1vw #00000040"
          margin={{ base: '4vw 0', md: '1vw 0' }}
        />
      </Box>
      {/* customer Details */}
      <Box>
        <Text fontWeight="600">{customer.fullName}</Text>
        <Text fontWeight="600">{customer.companyName}</Text>
        <Text fontWeight="600">{customer.email}</Text>
        <Text fontWeight="600">{customer.phone}</Text>
      </Box>
      {/* address Details */}
      <Grid templateColumns={'1fr lfr'} display="flex" marginTop="1.5vw">
        <GridItem width="100%">
          <Text className="formLabel">Delivery Address</Text>
          <DelAddBlock />
        </GridItem>
        <GridItem width="100%">
          <Text className="formLabel">Delivery Address</Text>
          <BillAddBlock />
        </GridItem>
        <GridItem></GridItem>
      </Grid>
      <Divider
        margin={{ base: '4vw 0', md: '0.5vw 0' }}
        height="0vw"
        border="solid 0.05vw rgba(121, 121, 121, 0.25)"
        gridColumn="1 / span 3"
      />
      {/* List of basket items */}
      <Box color="#00000095">
        <Box>
          {basketItems.map((item) => (
            <Grid
              key={item.id}
              templateColumns={'3fr 1fr'}
              fontSize={{ base: '2.5vw', md: '1.2vw', lg: '1.0vw' }}
              columnGap={'0vw'}
            >
              {/* Use unique item ID as key */}
              <Grid
                flexDirection="column"
                templateColumns={{
                  base: '2fr 1fr',
                  md: '1fr',
                  lg: '2fr 1fr',
                }}
              >
                <GridItem display="flex" alignItems={'center'}>
                  <Flex flexDirection={'column'}>
                    <Box fontWeight="600">{item.name}</Box>
                    <Box>Dimensions Here</Box>
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
              </Flex>
              <Divider
                margin={{ base: '4vw 0', md: '0.5vw 0' }}
                height="0vw"
                border="solid 0.05vw rgba(121, 121, 121, 0.25)"
                gridColumn="1 / span 3"
              />
            </Grid>
          ))}
        </Box>
      </Box>
      {/*Subtotal Items */}
      <Box flex="1"></Box>
      <Grid
        fontSize={{ base: '2.5vw', md: '1.2vw', lg: '1.0vw' }}
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
          £ {Number(delCost).toFixed(2)}
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
            £ {Number(basketOrderValue).toFixed(2)}
          </Flex>
          <Flex fontSize="0.6rem" justifyContent={'end'}>
            incl VAT
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}
