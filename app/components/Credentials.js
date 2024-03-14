"use client";
import React from "react";
import Image from "next/image";
import Whyus from "./Whyus";
import Testimonials from "./Testimonials";
import Clients from "./Clients";
import { Box, Spacer, useMediaQuery } from "@chakra-ui/react";
const Credentials = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 768px)"); // Adjust the value as needed
  const bgImage = " /images/testimonial-3x4.jpg";
  const bgImage2 = " /images/testimonial-9x16.jpg";
  const backgroundImage = isLargeScreen ? bgImage : bgImage2;
  return (
    <Box
      width='100%'
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
    >
      <Whyus />
      <Spacer height={{ base: "120vw", md: "50vw", lg: "30vw" }} />
      <Testimonials />
      <Clients />
    </Box>
  );
};
export default Credentials; //;
