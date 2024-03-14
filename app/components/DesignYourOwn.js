import React from "react";
import {
  Grid,
  GridItem,
  Text,
  Button,
  Box,
  Spacer,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";

// images

import designYourOwnImg from "/public/images/herobanner2-5x2.jpg";
import designYourOwnImgSm from "/public/images/herobanner2-9x16.jpg";

export default function Hero() {
  return (
    <>
      <Box display={{ base: "none", md: "block" }} color='#40474f'>
        <Grid templateColumns='1fr 1fr' templateRows='1fr 1fr'>
          <GridItem
            colStart={1}
            colEnd={3}
            rowStart={1}
            rowEnd={3}
            width='100vw'
          >
            <Image src={designYourOwnImg} alt='Hero Image' />
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            rowStart={1}
            rowEnd={2}
            zIndex='1'
            display='flex'
            justifyContent={"end"}
            textAlign={"start"}
            flexDirection={"column"}
            ml='5vw'
          >
            <Text fontSize='4.0vw' fontWeight='bold' lineHeight='1em' mb='3'>
              Customise &amp; Create
            </Text>
            <Text fontSize='4.0vw' fontWeight='light' lineHeight='1em'>
              your own Mirror
            </Text>
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            rowStart={2}
            rowEnd={3}
            zIndex='1'
            mr='18.3vw'
            ml='5vw'
          >
            <Text
              fontSize='1.0vw'
              fontWeight='light'
              mt='1.2vw'
              lineHeight='1.2em'
              textAlign='start'
            >
              Make a mirror effortlessly with our custom online tool! Explore a
              variety of options and receive instant quotes, all in one
              convenient place.
            </Text>
            <Box textAlign='start'>
              <Button
                className='dkButton'
                as={Link}
                to='/mtm'
                variant='link'
                size='0'
                fontSize={{ md: "1.0vw", lg: "1.0vw" }}
                borderRadius='2.5vw'
                padding={{
                  md: "0.8vw 6vw 1.0vw 6vw",
                }}
                mt='1.5vw'
              >
                Make your own
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box display={{ base: "block", md: "none" }} color='#40474f'>
        <Grid templateColumns='1fr' templateRows='15% 55% 1fr'>
          <GridItem
            colStart={1}
            colEnd={2}
            rowStart={1}
            rowEnd={4}
            width='100vw'
          >
            <Image src={designYourOwnImgSm} alt='Hero Image' />
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={2}
            rowStart={1}
            rowEnd={2}
            zIndex='1'
            display='flex'
            textAlign={"center"}
            justifyContent={"end"}
            flexDirection={"column"}
          >
            <Text fontSize='7vw' fontWeight='bold' lineHeight='1em' mb='1'>
              Customise &amp; Create
            </Text>
            <Text fontSize='7vw' fontWeight='light' lineHeight='1em'>
              your own Mirror
            </Text>
          </GridItem>
          <Spacer></Spacer>
          <GridItem
            colStart={1}
            colEnd={2}
            rowStart={3}
            rowEnd={4}
            zIndex='1'
            m={"0 5vw"}
          >
            <Text
              fontSize='4.5vw'
              fontWeight='light'
              mt='1.2vw'
              lineHeight='1.2em'
              textAlign='start'
            >
              Make a mirror effortlessly with our custom online tool! Explore a
              variety of options and receive instant quotes, all in one
              convenient place.
            </Text>
            <Box textAlign='center'>
              <Button
                className='dkButton'
                size='1'
                width={"100%"}
                fontSize={{ base: "4.0vw" }}
                borderRadius='8vw'
                padding={{ base: "3.0vw 6vw 3.2vw 6vw" }}
                mt='8vw'
              >
                Make your own
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
