"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
const trustpilot = "/images/trustpilot.png";
const Testimonials = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function getTests() {
      try {
        const response = await fetch("/data/testimonials.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTests(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getTests();
  }, []);

  const sectionTitle = {
    textAlign: "center",
    fontSize: { base: "7vw", md: "4vw", lg: "3vw" },
    fontWeight: "700",
    padding: { base: "4vw 0 6vw 0", md: "0 0 2vw 0" },
  };
  const sectionPara = {
    textAlign: "center",
    fontSize: { base: "2.5vw", md: "1.75vw", lg: "1vw" },
    padding: { base: "0 20% 20px", md: "0 30% 35px", lg: "0 30% 50px" },
    width: "100%",
    display: { base: "none", md: "inline-block" },
  };
  return (
    <>
      <a
        rel='noopener noreferrer'
        href='https://uk.trustpilot.com/review/www.mirrorworld.co.uk'
        target='_blank'
        title='Visit Trustpilot'
      >
        <Box
          padding={{ base: "5vw 5vw 1vw" }}
          background='rgba(51, 55, 57, 0.0)'
          color='white'
        >
          <Text {...sectionTitle}>Not Just Our Words...</Text>
          <Text {...sectionPara}>
            Below are just a selection of your genuine comments and feedback.
          </Text>
          <Grid
            gap={"2vw"}
            templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
            templateRows={"auto"}
          >
            {tests.map((testimonial) => (
              <Box
                key={testimonial.id}
                display='flex'
                flexDirection='column'
                borderRadius={{
                  base: "2vw 5vw 5vw 5vw",
                  md: "1vw 2.5vw 2.5vw 2.5vw",
                }}
                borderColor='#40474f'
                background='rgba(255,255,255,1)'
                color='#40474f'
                padding={{ base: "5vw", md: "3vw" }}
              >
                <Text
                  fontSize={{ base: "3.6vw", md: "1.5vw", lg: "1.2vw" }}
                  width='100%'
                  textAlign='start'
                  fontWeight={"bold"}
                  mb='10px'
                >
                  {testimonial.title}
                </Text>
                <Text
                  // This makes the content section grow
                  flex='1'
                  fontSize={{ base: "3vw", md: "1.2vw", lg: "1vw" }}
                  textAlign='start'
                  mb='20px'
                >
                  {testimonial.content}
                </Text>
                <Grid gridTemplateColumns={"1fr 1fr"}>
                  <Box>
                    <Image
                      src={trustpilot}
                      alt='Trustpilot'
                      width='386'
                      height='98'
                      filter='grayscale(100%)'
                    />
                  </Box>
                  <Box>
                    <Text
                      fontSize={{ base: "3.6vw", md: "1.5vw", lg: "1.2vw" }}
                      width='100%'
                      textAlign='end'
                      fontWeight={"bold"}
                    >
                      {testimonial.name}
                    </Text>
                    <Text
                      fontSize={{ base: "3vw", md: "1.2vw", lg: "1vw" }}
                      textAlign='end'
                    >
                      {testimonial.date}
                    </Text>
                  </Box>
                </Grid>
              </Box>
            ))}
          </Grid>
        </Box>
      </a>
    </>
  );
};
export default Testimonials;
