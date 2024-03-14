'use client';
import React, { useEffect, useState } from 'react';
import {
  Spacer,
  Grid,
  GridItem,
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import CalcGrid from '../../../components/calc/CalcGridGlass';
import CanvasImg from '../../../components/CanvasImg';
import PriceBtns from '../../../components/calc/PriceBtns';
import Image from 'next/image';
export default function CalcGlass() {
  // const [isLoaded, setIsLoaded] = useState(true);
  // useEffect(() => {
  //   setIsLoaded(false);
  //   //console.log('#### Loaded #####');
  // }, []);
  return (
    <>
      {/* {isLoaded ? (
        <>
          <Spacer height="300px" />
          <Center className="loading-container">
            <Image
              src="/images/loading.gif"
              alt="Loading"
              width="200"
              height="200"
            />
          </Center>
          <Spacer height="200px" />
        </>
      ) : (
        <> */}
      <Spacer height="150px" />
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        width="100%"
        columnGap="2vw"
        padding={{ base: '3vw 5vw 8vw', md: '15px 5vw 60px' }}
      >
        <GridItem order={{ base: 2, md: 1 }}>
          <CalcGrid />
        </GridItem>
        <GridItem order={{ base: 1, md: 2 }}>
          <Box
            // width="100%"
            // maxWidth="1000px"
            // margin="0 auto"
            height={{ base: 'auto', md: '500px' }}
            // border="solid 2px red"
            // display="flex"
            // flexDirection="column"
            // as="div"
          >
            <CanvasImg />
            <PriceBtns />
          </Box>
        </GridItem>
      </Grid>
      {/* </>
      )} */}
    </>
  );
}
