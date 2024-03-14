'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  setBasketID as setBasketIDAction,
  setStartDate as setStartDateAction,
  setItems as setItemsAction,
  setBasketItemsQty,
} from '@/app/redux/slices/configBasketSlice';
import useBasketCheckout from '@/app/hooks/basket/useBasketCheckout';

const useBasketStateSync = () => {
  // console.log('Using Basket Sync');
  const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false);
  //console.log('initial load');
  const dispatch = useDispatch();
  const basketData = useSelector((state) => state.basket.basketData);
  const { handleCheckout } = useBasketCheckout();

  useEffect(() => {
    // console.log('Load Once ONLY create a Basket from local storage');
    // console.log('Check basket availablity');
    // Load the basket from local storage
    let localBasket = localStorage.getItem('basket');
    if (!localBasket) {
      // console.log('No Basket yet created:');
      const guid = uuidv4();
      const newBasketData = {
        basketID: guid,
        startDate: new Date().toISOString(),
        items: [],
      };
      //console.log('new basket : ', newBasketData);
      // console.log('new basket : ');
      localStorage.setItem('basket', JSON.stringify(newBasketData));
      dispatch(setBasketIDAction(guid));
      dispatch(setStartDateAction(newBasketData.startDate));
      dispatch(setItemsAction(newBasketData.items));
    } else {
      //console.log('Basket exists update Redux:', localBasket);
      // console.log('Basket exists update Redux:');
      const basket = JSON.parse(localBasket);
      dispatch(setBasketIDAction(basket.basketID));
      dispatch(setStartDateAction(basket.startDate));
      dispatch(setItemsAction(basket.items));
    }
    setIsInitialSetupComplete(true);
  }, [dispatch]);

  useEffect(() => {
    if (isInitialSetupComplete) {
      // console.log('Update local storage when the basket data changes');
      const newBasketData = {
        basketID: basketData.basketID,
        startDate: basketData.startDate,
        items: basketData.items,
      };
      localStorage.setItem('basket', JSON.stringify(newBasketData));
    }
    // console.log('here we should update firestore basket data as well');
    // here we should update firestore basket data as well
    // handleCheckout();
  }, [basketData, isInitialSetupComplete]);

  useEffect(() => {
    // here we should update firestore basket data as well
    handleCheckout();
  }, [basketData]);

  // Calculate the total count of items by summing the quantities
  const itemCount = basketData.items.reduce(
    (total, item) => total + item.qty,
    0
  );

  // Update Redux state with the total item count
  useEffect(() => {
    dispatch(setBasketItemsQty(itemCount));
  }, [dispatch, itemCount]);

  return itemCount;
};

export default useBasketStateSync;
