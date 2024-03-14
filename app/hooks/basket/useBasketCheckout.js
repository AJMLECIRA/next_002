'use client';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketDrawer } from '@/app/redux/slices/configSiteSlice';

const useBasketCheckout = () => {
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);
  const basketData = useSelector((state) => state.basket.basketData);
  const basketDrawer = useSelector((state) => state.site.basketDrawer);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!basketData.basketID) {
      return;
    }

    setCheckoutInitiated(true);

    try {
      // Create or update the basket document in Firestore
      const basketDocRef = doc(db, 'baskets', basketData.basketID);
      await setDoc(basketDocRef, basketData);

      // Additional logic for checkout initiation
      dispatch(setBasketDrawer(false));
    } catch (error) {
      console.error('Error handling basket checkout in Firestore: ', error);
    }

    setCheckoutInitiated(false);
  };

  return { checkoutInitiated, handleCheckout };
};

export default useBasketCheckout;
