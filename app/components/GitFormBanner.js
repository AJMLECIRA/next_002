"use client";
import React from "react";
import { Grid, GridItem, Center, useMediaQuery } from "@chakra-ui/react";
import GitForm from "./GitForm";
import Image from "next/image";

//images
import contactBanner from "/public/images/contact_banner-5x2.jpg";
import contactBannerSm from "/public/images/contact_banner-9x16.jpg";

const GitFormBanner = () => {
  // Define a media query for large screens
  const [isLargeScreen] = useMediaQuery("(min-width: 768px)"); // Adjust the value as needed

  return (
    <Grid
      templateColumns={isLargeScreen ? "1fr 1fr" : "1fr"}
      templateRows={isLargeScreen ? "1fr" : "1fr 1fr"}
      gap={4} // Adjust the gap as needed
    >
      {isLargeScreen ? (
        <>
          <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={2} zIndex='1'>
            <Image src={contactBanner} alt='Large Screen' />
          </GridItem>
          <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={2} zIndex='1'>
            <Center height='100%'>
              <GitForm />
            </Center>
          </GridItem>
        </>
      ) : (
        <>
          <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={3} zIndex='1'>
            <Image src={contactBannerSm} alt='Small Screen' />
          </GridItem>
          <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={3} zIndex='1'>
            <Center height='100%'>
              <GitForm />
            </Center>
          </GridItem>
        </>
      )}
    </Grid>
  );
};
export default GitFormBanner;
