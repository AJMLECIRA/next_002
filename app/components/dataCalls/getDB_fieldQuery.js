import React, { useState, useEffect } from 'react';
import { db } from '@/app/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function GetDB_fieldQuery(collectionName, fieldName, fieldValue) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(
          collection(db, collectionName),
          where(fieldName, '==', fieldValue)
        );
        const querySnapshot = await getDocs(q);
        const glassData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(glassData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collectionName, fieldName, fieldValue]);

  return { data, loading, error };
}

export default GetDB_fieldQuery;
