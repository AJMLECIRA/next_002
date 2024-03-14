import {
  Box,
  Card,
  SimpleGrid,
  Text,
  CardBody,
  CardFooter,
  Button,
  CardHeader,
  Flex,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSwatchbook,
  faWarehouse,
  faTruck,
} from "@fortawesome/pro-solid-svg-icons";

const Swatchbook = () => (
  <FontAwesomeIcon icon={faSwatchbook} size='4x' style={{ color: "#ffffff" }} />
);
const Warehouse = () => <FontAwesomeIcon icon={faWarehouse} size='4x' />;
const Truck = () => <FontAwesomeIcon icon={faTruck} size='4x' />;
const sectionTitle = {
  textAlign: "center",
  fontSize: { base: "7vw", md: "4vw", lg: "3vw" },
  fontWeight: "700",
  padding: { base: "4vw 0 6vw 0", md: "0 0 1vw 0" },
};
const sectionPara = {
  textAlign: "center",
  fontSize: { base: "2.5vw", md: "1.75vw", lg: "1.2vw" },
  padding: { base: "0 20% 20px", md: "0 30% 35px", lg: "0 3vw 3vw" },
  width: "100%",
  display: { base: "none", md: "inline-block" },
};
const sectionCard = {
  borderWidth: "1px",
  borderRadius: {
    base: " 5vw 2vw 5vw 5vw",
    md: "2vw 0.5vw 2vw 2vw",
  },
  borderColor: "white",
  background: "rgba(255, 255, 255, 0.1)",
  color: "white",
  padding: "0.5vw 0",
};
const sectionCardPara = {
  fontSize: { base: "4vw", md: "2vw", lg: "1.2vw" },
  width: "100%",
  textAlign: "center",
  fontWeight: "bold",
  textTransform: "uppercase",
};
const sectionCardBtn = {
  className: "whtButton",
  size: "0",
  width: { base: "100%", md: "80%", lg: "60%" },
  fontSize: { base: "3vw", md: "1.5vw", lg: "1vw" },
  borderRadius: "4.5vw",
  padding: {
    base: "2.3vw 6vw 2.3vw 6vw",
    md: "0.8vw 6vw 1.0vw 6vw",
  },
};
export default function Whyus() {
  return (
    <>
      <Box
        padding={{ base: "3vw 5vw" }}
        color='white'
        background='rgba(51, 55, 57, 0.2)'
      >
        <Text {...sectionTitle}>Why Us?</Text>
        <Text {...sectionPara}>
          We work diligently every day to maintain the highest standards of
          customer care
        </Text>

        <Grid
          gap={{ base: "4vw", md: "2vw" }}
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          templateRows={"auto"}
        >
          <Card {...sectionCard}>
            <CardHeader padding='15px 20px 5px'>
              <Flex alignItems='center' justifyContent='center' flexWrap='wrap'>
                <Box style={{ padding: "5px 20px 5px" }}>
                  <Swatchbook />
                </Box>
                <Text {...sectionCardPara}>500+ SAMPLES</Text>
              </Flex>
            </CardHeader>
            <CardBody padding={{ base: "0.5vw 5vw", md: "0.5vw 2vw" }}>
              <Text
                textAlign={"center"}
                padding='0 10px'
                fontSize={{ base: "3vw", md: "1.5vw", lg: "1vw" }}
              >
                We offer an extensive range of colours, materials and finishes,
                to build trust and confidence in your purchase.
              </Text>
            </CardBody>
            <CardFooter justifyContent={"center"} padding='10px 20px'>
              <Button {...sectionCardBtn}>See Samples</Button>
            </CardFooter>
          </Card>

          <Card {...sectionCard}>
            <CardHeader padding='15px 20px 5px'>
              <Flex alignItems='center' justifyContent='center' flexWrap='wrap'>
                <Box style={{ padding: "5px 20px 5px" }}>
                  <Warehouse />
                </Box>
                <Text {...sectionCardPara}>in-house production</Text>
              </Flex>
            </CardHeader>
            <CardBody padding={{ base: "0.5vw 5vw", md: "0.5vw 2vw" }}>
              <Text
                textAlign={"center"}
                padding='0 10px'
                fontSize={{ base: "3vw", md: "1.5vw", lg: "1vw" }}
              >
                Our quality is trusted by hundreds of homes, businesses, and
                institutions around the world.
              </Text>
            </CardBody>
            <CardFooter justifyContent={"center"} padding='10px 20px'>
              <Button {...sectionCardBtn}>Read More</Button>
            </CardFooter>
          </Card>

          <Card {...sectionCard}>
            <CardHeader padding='15px 20px 5px'>
              <Flex alignItems='center' justifyContent='center' flexWrap='wrap'>
                <Box style={{ padding: "5px 20px 5px" }}>
                  <Truck />
                </Box>
                <Text {...sectionCardPara}>NATIONWIDE DELIVERY</Text>
              </Flex>
            </CardHeader>
            <CardBody padding={{ base: "0.5vw 5vw", md: "0.5vw 2vw" }}>
              <Text
                textAlign={"center"}
                padding='0 10px'
                fontSize={{ base: "3vw", md: "1.5vw", lg: "1vw" }}
              >
                {`Whether you're located in a bustling city center or a remote
                countryside location, we've got you covered.`}
              </Text>
            </CardBody>
            <CardFooter justifyContent={"center"} padding='10px 20px'>
              <Button {...sectionCardBtn}>See Samples</Button>
            </CardFooter>
          </Card>
        </Grid>
      </Box>
    </>
  );
}
