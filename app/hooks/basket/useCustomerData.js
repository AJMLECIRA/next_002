'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config'; // Make sure this path is correct
import { useRouter } from 'next/navigation';

const useCustomerData = (basketID) => {
  const route = useRouter();
  const [order, setOrder] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(basketID);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true); // Ensure loading is true at the start of the operation
      try {
        // Define the query to search for invoices with the specified basketId
        const q = query(
          collection(db, 'orders'),
          where('basketID', '==', basketID)
        );
        const querySnapshot = await getDocs(q);
        // Assuming there's only one document with this basketId
        if (!querySnapshot.empty) {
          const docSnapshots = querySnapshot.docs[0]; // Get the first document matching the query
          setOrder(docSnapshots.data());
        } else {
          console.log('No such document with basketID:', basketID);
          setOrder(null);
          route.push('./404');
          return;
        }
      } catch (error) {
        console.error('Error loading invoice with basketID:', basketID, error);
        setOrder(null);
      } finally {
        setLoading(false); // Ensure loading is false at the end of the operation
      }
    };
    const loadInvoice = async () => {
      setLoading(true); // Ensure loading is true at the start of the operation
      try {
        // Define the query to search for invoices with the specified basketId
        const q = query(
          collection(db, 'invoices'),
          where('basketId', '==', basketID)
        );
        const querySnapshot = await getDocs(q);
        // Assuming there's only one document with this basketId
        if (!querySnapshot.empty) {
          const docSnapshots = querySnapshot.docs[0]; // Get the first document matching the query
          setInvoice(docSnapshots.data());
        } else {
          console.log('No such document with basketID:', basketID);
          setInvoice(null);
        }
      } catch (error) {
        console.error('Error loading invoice with basketID:', basketID, error);
        setInvoice(null);
      } finally {
        setLoading(false); // Ensure loading is false at the end of the operation
      }
    };
    const loadBasket = async () => {
      setLoading(true); // Ensure loading is true at the start of the operation
      try {
        // Define the query to search for invoices with the specified basketId
        const q = query(
          collection(db, 'baskets'),
          where('basketID', '==', basketID)
        );
        const querySnapshot = await getDocs(q);
        // Assuming there's only one document with this basketId
        if (!querySnapshot.empty) {
          const docSnapshots = querySnapshot.docs[0]; // Get the first document matching the query
          setBasket(docSnapshots.data());
        } else {
          console.log('No such document with basketID:', basketID);
          setBasket(null);
        }
      } catch (error) {
        console.error('Error loading invoice with basketID:', basketID, error);
        setBasket(null);
      } finally {
        setLoading(false); // Ensure loading is false at the end of the operation
      }
    };
    if (basketID) {
      loadOrder(); // Call loadOrder only if basketID is provided
      loadInvoice(); // Call loadInvoice only if basketID is provided
      loadBasket(); // Call loadInvoice only if basketID is provided
    }
  }, [basketID]); // React to changes in basketID

  // console.log(order);
  // console.log(invoice);
  return { invoice, order, basket, loading };
};

export default useCustomerData;
