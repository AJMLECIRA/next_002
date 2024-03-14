import React from 'react';
import { Spacer, Center } from '@chakra-ui/react';
import Image from 'next/image';
export default function Loading() {
  return (
    <>
      <Spacer height="300px" />
      <Center className="loading-container">
        {/* <CircularProgress value={40} color="#0cc6de" size="120px">
              <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress> */}
        <Image
          src="/images/loading.gif"
          alt="Loading"
          width="200"
          height="200"
        />
      </Center>
      <Spacer height="200px" />
      <Spacer height="150px" />
    </>
  );
}
