// useAddOrderToStore.js

import { useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';

function useAddOrderToStore() {
  const addOrderToStore = async (orderData) => {
    try {
      if (orderData) {
        // Assuming orderData.basketID is unique for each basket
        const orderRef = doc(db, 'orders', orderData.basketID);

        await setDoc(orderRef, orderData);
        // Handle successful addition here, if needed
      } else {
        console.warn(
          'orderData is null or undefined. Skipping order processing.'
        );
      }
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  useEffect(() => {
    // Call any initialization logic for the hook here, if needed.
  }, []);

  return addOrderToStore;
}

export default useAddOrderToStore;
