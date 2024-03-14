import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';

const useGetOrder = (basketID) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', basketID);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          const orderData = orderSnapshot.data();
          setOrder(orderData);
        } else {
          setOrder(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading order:', error);
        setOrder(null);
        setLoading(false);
      }
    };

    if (basketID) {
      loadOrder();
    }
  }, [basketID]);

  return { order, loading };
};

export default useGetOrder;
