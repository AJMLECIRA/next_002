'use client';
import React, { useState, useEffect } from 'react';
import { Spinner, Center } from '@chakra-ui/react';
// export const metadata = {
//   title: 'Mirrorworld Home of Bespoke Mirrors',
//   description: 'Made to Measure Mirrors',
// };

export default function Layout({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //   // Simulate loading delay
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        children
      ) : (
        <Center height="100vh">
          <Spinner
            color="#0cc6de"
            thickness="15px"
            speed="0.65s"
            emptyColor="gray.200"
            size="x3"
            width="180px"
            height="180px"
          />
        </Center>
      )}
    </>
  );
}
