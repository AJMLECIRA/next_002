'use client';
import React, { useState, useEffect } from 'react';
import { Box, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelopesBulk,
  faPersonDolly,
  faTruckFast,
  faPersonCarryBox,
} from '@fortawesome/pro-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDelMethod,
  setDelCost,
  setBasketOrderValue,
} from '@/app/redux/slices/configBasketSlice';
import { delCostData } from '@/app/redux/slices/configQuoteSlice';

export default function DelMethod() {
  //const delData = useSelector((state) => state.quote.delCostData);
  const delData = useSelector(delCostData);
  const basketTotalValue = useSelector(
    (state) => state.basket.basketData.basketTotalValue
  );
  const basketOrderValue = useSelector(
    (state) => state.basket.basketData.basketOrderValue
  );
  const [delValue, setDelValue] = useState(0);
  const delAgent = useSelector((state) => state.basket.delMethod);
  const [newOrderValue, setNewOrderValue] = useState(0);
  const delCost = useSelector((state) => state.basket.delCost);
  const delPost = 7.5;
  const delFedex = 20.0;
  const dispatch = useDispatch();
  const delActiveMethod = useSelector((state) => state.basket.delMethod);

  const handleMethod = (option) => {
    dispatch(setDelMethod(option.currentTarget.getAttribute('method')));
    dispatch(setDelCost(Number(option.currentTarget.getAttribute('delcost'))));
    setDelValue(option.currentTarget.getAttribute('delcost'));
  };
  useEffect(() => {
    setNewOrderValue(Number(delValue) + Number(basketTotalValue));
  }, [delValue]);

  useEffect(() => {
    dispatch(setBasketOrderValue(Number(newOrderValue)));
  }, [newOrderValue]);

  useEffect(() => {
    const methodItems = document.querySelectorAll(
      '[class*="delGridItem method"]'
    );
    // clear all other method active class
    methodItems.forEach((element) => {
      element.classList.remove('active');
    });
    const delActiveMethodItem = document.querySelector(
      `[method="${delActiveMethod}"]`
    );
    // add actice to this className
    if (delActiveMethodItem) {
      delActiveMethodItem.classList.add('active');
    }
    calcDel();
  }, [delActiveMethod]);

  useEffect(() => {
    if (basketTotalValue > 0) {
      dispatch(setDelMethod('fedex'));
      calcDel();
    }
  }, [basketTotalValue]);

  const calcDel = () => {
    // console.log('Calculate the delivery Price');
    if (delAgent === 'fedex') {
      // console.log('Sent with fedex');
      dispatch(setDelCost(20));
      setDelValue(20);
    }
    if (delAgent === 'collect') {
      // console.log('Collected from mirrorworld');
      dispatch(setDelCost(0));
    }
  };

  return (
    <>
      <Box className="sectionBox">
        {/* <FontAwesomeIcon className="sectionIcon" icon={faPersonDolly} /> */}
        <Text className="sectionTitle">Delivery Method</Text>
      </Box>
      <Grid className="delGrid">
        <GridItem
          className="delGridItem method"
          method="collect"
          delcost={0}
          onClick={(e) => handleMethod(e)}
        >
          <Box>
            <Grid className="methodGrid">
              <GridItem className="methodIconItem" colSpan={1} rowSpan={3}>
                <FontAwesomeIcon className="delIcon" icon={faPersonCarryBox} />
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delTitle methodGridItem"
              >
                Collection
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delDesc methodGridItem"
              >
                from Mirrorworld
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delPrice methodGridItem"
              >
                £ free
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
        {/* <GridItem
          className="delGridItem method"
          method="post"
          delcost={delData.post}
          onClick={(e) => handleMethod(e)}
        >
          <Box>
            <Grid className="methodGrid">
              <GridItem className="methodIconItem" colSpan={1} rowSpan={3}>
                <FontAwesomeIcon className="delIcon" icon={faEnvelopesBulk} />
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delTitle methodGridItem"
              >
                Postal Delivery
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delDesc methodGridItem"
              >
                Royal Mail
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delPrice methodGridItem"
              >
                £ {Number(delData.post).toFixed(2)}
              </GridItem>
            </Grid>
          </Box>
        </GridItem> */}
        <GridItem
          className="delGridItem method"
          method="fedex"
          delcost={Number(delData.fedex)}
          onClick={(e) => handleMethod(e)}
        >
          <Box>
            <Grid className="methodGrid">
              <GridItem className="methodIconItem" colSpan={1} rowSpan={3}>
                <FontAwesomeIcon className="delIcon" icon={faTruckFast} />
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delTitle methodGridItem"
              >
                Standard Delivery
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delDesc methodGridItem"
              >
                Fed-Ex
              </GridItem>
              <GridItem
                colSpan={2 / 3}
                rowSpan={1}
                className="delPrice methodGridItem"
              >
                £ {Number(delData.fedex).toFixed(0)}
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
