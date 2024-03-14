import React from "react";
import { Grid, GridItem, Text, Button, Box, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import heroimg from "/public/images/herobanner-5x2.jpg";
import heroimgSm from "/public/images/herobanner-9x16.jpg";

export default function Hero() {
  return (
    <>
      <Box display={{ base: "none", md: "block" }}>
        <Grid templateColumns='1fr 1fr' templateRows='1fr 1fr'>
          <GridItem
            colStart={1}
            colEnd={3}
            rowStart={1}
            rowEnd={3}
            width='100vw'
          >
            <Image
              src={heroimg}
              alt='Hero Image'
              width='auto'
              height='auto'
              placeholder='blur'
            />
          </GridItem>
          <GridItem
            colStart={2}
            colEnd={3}
            rowStart={1}
            rowEnd={2}
            zIndex='1'
            display='flex'
            justifyContent={"end"}
            textAlign={"end"}
            flexDirection={"column"}
            mr='5vw'
          >
            <Text
              fontSize='4.5vw'
              fontWeight='light'
              color={"white"}
              lineHeight='1em'
              mb='3'
            >
              Bespoke &amp;
            </Text>
            <Text
              fontSize='4.5vw'
              fontWeight='bold'
              color={"white"}
              lineHeight='1em'
            >
              Breathtaking
            </Text>
          </GridItem>
          <GridItem
            colStart={2}
            colEnd={3}
            rowStart={2}
            rowEnd={3}
            zIndex='1'
            mr='5vw'
            ml='15vw'
          >
            <Text
              fontSize='1.0vw'
              fontWeight='light'
              color='white'
              mt='1.2vw'
              lineHeight='1.2em'
              textAlign='end'
            >
              {
                "Established for 30+ years, we pride ourselves on being the UK's Leading Specialists for Made-To-Measure Mirror Décor, creating any design, whether it's to match existing décor, or something distinct and unique."
              }
            </Text>
            <Box textAlign='end'>
              <Button
                className='ltButton'
                size='0'
                fontSize={{ md: "1.0vw", lg: "1.0vw" }}
                borderRadius='2.5vw'
                padding={{
                  md: "0.8vw 6vw 1.0vw 6vw",
                }}
                mt='1.5vw'
              >
                Explore our Designs
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Grid templateColumns='1fr' templateRows='25% 35% 1fr'>
          <GridItem
            colStart={1}
            colEnd={2}
            rowStart={1}
            rowEnd={4}
            width='100vw'
          >
            <Image
              src={heroimgSm}
              alt='Hero Image'
              width='auto'
              height='auto'
            />
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
            <Text
              fontSize='9vw'
              fontWeight='light'
              color={"white"}
              lineHeight='1em'
              mb='1'
            >
              Bespoke &amp;
            </Text>
            <Text
              fontSize='9vw'
              fontWeight='bold'
              color={"white"}
              lineHeight='1em'
            >
              Breathtaking
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
              color='white'
              mt='1.2vw'
              lineHeight='1.2em'
              textAlign='start'
            >
              {`Established for 30+ years, we pride ourselves on being the UK's Leading Specialists for Made-To-Measure Mirror Décor, creating any design, whether it's to match existing décor, or something distinct and unique.`}
            </Text>
            <Box textAlign='center'>
              <Button
                className='ltButton'
                size='1'
                width={"100%"}
                fontSize={{ base: "4.0vw" }}
                borderRadius='8vw'
                padding={{ base: "3.0vw 6vw 3.2vw 6vw" }}
                mt='5vw'
              >
                Explore our Designs
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
