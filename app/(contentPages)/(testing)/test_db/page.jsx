'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase';
import { collection, getDoc, onSnapshot, query } from 'firebase/firestore';
import { Spacer } from '@chakra-ui/react';

export default function Page() {
  const [glassData, setGlassData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'allGlass'));
    const unsubcribe = onSnapshot(q, (docs) => {
      let itemsArr = [];
      docs.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setGlassData(itemsArr);
    });
  }, []);

  console.log(glassData);

  return (
    <>
      <Spacer height="100" />
      <div>
        {glassData.map((glass) => (
          <div key={glass.id}>
            {/* Render your glass item here */}
            {
              glass.MWName /* Replace with actual properties you want to render */
            }
          </div>
        ))}
      </div>{' '}
    </>
  );
}
