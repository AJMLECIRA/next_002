'use client';
import { useState, useEffect } from 'react';
import { db } from '@/app/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

function useGetCollection(collectionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const thisData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(thisData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
}

export default useGetCollection;
