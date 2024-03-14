'use client';
import React, { useState } from 'react';
import { Button, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import '../../styles/globals.css';
import CreatePrice from './CreatePrice';
import { useSelector, useDispatch } from 'react-redux';
import useAmendBasket from '@/app/hooks/basket/useAmendBasket';

import {
  setBasketItemsQty,
  selectBasketItemsQty,
} from '@/app/redux/slices/configBasketSlice';

export default function PriceBtns() {
  const dispatch = useDispatch();
  const [unitPrice, setUnitPrice] = useState(0);

  // Select the configGlass state from Redux store
  const selectConfigGlass = (state) => state.configGlass;
  const configGlassState = useSelector(selectConfigGlass);

  // Select the basketItemsQty from Redux store
  const basketItemsQty = useSelector(selectBasketItemsQty);

  // Use the handleAddItem function from useAmendBasket
  const { handleAddItem } = useAmendBasket();

  // Get the existing basket ID and Img from Redux store
  const existingBasketId = useSelector(
    (state) => state.basket.basketData.basketID
  );
  const itemImg = useSelector((state) => state.basket.basketItemImg);

  // Get the calculated price from CreatePrice component
  let priceObj = CreatePrice();
  const calculatedPrice = priceObj.props.children;

  // Create a new quote object and add it to the basket
  const createQuoteObject = () => {
    // Round the calculated price to 2 decimal places
    const roundedPrice = parseFloat(calculatedPrice.toFixed(2));

    // Clone the configGlass state (if needed)
    const quoteObject = { ...configGlassState };

    // Create a new item with the rounded price
    const newItem = {
      name: 'Bespoke Glass Only',
      price: roundedPrice,
      qty: 1,
      itemImg: itemImg,
      jobInfo: configGlassState,
    };

    // Add the new item to the basket
    handleAddItem(existingBasketId, newItem);

    // Increment the basketItemsQty and update it in Redux store
    dispatch(setBasketItemsQty(basketItemsQty + 1));
  };

  return (
    <Grid
      templateColumns={'1fr  1fr'}
      gap={{ base: '2vw', md: '1vw' }}
      margin={{ base: '4vw 0', md: '0vw' }}
    >
      <GridItem>
        <Center
          height="100%"
          style={{ fontWeight: '600' }}
          fontSize={{ base: '6vw', sm: '4vw', md: '3vw', lg: '2vw' }}
        >
          {CreatePrice()}
          <Text
            style={{ fontWeight: '400', paddingLeft: '1vw' }}
            fontSize={{ base: '3vw', sm: '2.5vw', md: '2vw', lg: '1vw' }}
          >
            inc vat
          </Text>
        </Center>
      </GridItem>
      <GridItem>
        <Button
          className="dkButtonRounded"
          width="100%"
          onClick={() => createQuoteObject()}
        >
          Add to basket
        </Button>
      </GridItem>
      <GridItem colSpan={2}>
        <Button
          className="mwButtonRounded"
          width="100%"
          onClick={() => createQuoteObject()}
        >
          BUY NOW
        </Button>
      </GridItem>
    </Grid>
  );
}
