'use client';
import React, { useState, useEffect } from 'react';
import { Box, Text, Grid, GridItem, Button, Center } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/pro-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPayMethod } from '@/app/redux/slices/configBasketSlice';

export default function PayMethod() {
  const dispatch = useDispatch();
  const activeMethod = useSelector((state) => state.basket.payMethod);

  const handleMethod = (option) => {
    dispatch(setPayMethod(option.currentTarget.getAttribute('paymethod')));
  };

  useEffect(() => {
    const methodItems = document.querySelectorAll(
      '[class*="delGridItem paymethod"]'
    );
    // clear all other method active class
    methodItems.forEach((element) => {
      element.classList.remove('active');
    });
    const activeMethodItem = document.querySelector(
      `[paymethod="${activeMethod}"]`
    );
    // add actice to this className
    if (activeMethodItem) {
      activeMethodItem.classList.add('active');
    }
    // set method in redux
  }, [activeMethod]);
  return (
    <>
      <Box className="sectionBox">
        <FontAwesomeIcon className="sectionIcon" icon={faCreditCard} />
        <Text className="sectionTitle">Payment Options</Text>
      </Box>
      <Grid className="delGrid">
        <GridItem
          className="delGridItem paymethod active"
          paymethod="paymentsense"
          onClick={(e) => handleMethod(e)}
        >
          <Center height="45px">
            <Grid className="methodGrid" alignItems={'center'} flex={1}>
              <GridItem className="methodIconItem" colSpan={1} rowSpan={3}>
                <FontAwesomeIcon className="delIcon" icon={faPaypal} />
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delTitle methodGridItem"
              >
                Debit, Credit or Amex Card
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delDesc methodGridItem"
              >
                Paymentsense
              </GridItem>
            </Grid>
          </Center>
        </GridItem>
        <GridItem
          className="delGridItem paymethod"
          paymethod="paypal"
          onClick={(e) => handleMethod(e)}
        >
          <Center height="45px">
            <Grid className="methodGrid" alignItems={'center'} flex={1}>
              <GridItem className="methodIconItem" colSpan={1} rowSpan={3}>
                <FontAwesomeIcon
                  className="delIcon"
                  icon={faPaypal}
                  style={{ color: '#0079C1' }}
                  rowSpan={3}
                />
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                className="delTitle methodGridItem"
                rowSpan={3}
              >
                PayPal
              </GridItem>
            </Grid>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}
