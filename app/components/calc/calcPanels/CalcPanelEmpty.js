"use client";
import React from "react";
import {
  TabPanel,
  Grid,
  GridItem,
  Button,
  Box,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "../../styles/globals.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/pro-solid-svg-icons";

const IconWrapper = ({ icon }) => <FontAwesomeIcon icon={icon} fontSize='2x' />;
const ChevronRight = () => <IconWrapper icon={faChevronRight} />;
const ChevronLeft = () => <IconWrapper icon={faChevronLeft} />;

const gridItemStyle = {
  width: "100%",
  border: "solid 1px red",
};
const gridBoxStyle = {
  border: "solid 1px green",
  width: "100%",
  display: "flex",
};

export function GlassShapeSizePanel() {
  return (
    <TabPanel
      border='solid 2px green'
      display='flex'
      flexDirection='column'
      height='100%'
      width='100%'
    >
      <Grid
        rowGap={"1vw"}
        display='flex'
        flexDirection={"column"}
        flexGrow={"1"}
        height='100%' // Make sure the parent Grid fills its entire space.
      >
        <GridItem {...gridItemStyle} height={{ base: "16vw", md: "8vw" }}>
          Grid Item 1
        </GridItem>
        <GridItem {...gridItemStyle} height={{ base: "16vw", md: "8vw" }}>
          Grid Item 2
        </GridItem>
        <GridItem {...gridItemStyle} flexGrow={"1"} display='flex'>
          {" "}
          {/* Ensure this GridItem stretches */}
          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            height='100%'
            width='100%'
          >
            <Box>Item 3</Box>
            <Box {...gridBoxStyle} justifyContent='flex-end'>
              <Button>My Button 1</Button>
            </Box>
            <Box {...gridBoxStyle} justifyContent='space-between'>
              <Button className='backButton'>
                <Flex align='center' justify='center' width='full'>
                  <ChevronLeft />
                  <Box textAlign='center' flexGrow={1}>
                    Next
                  </Box>
                </Flex>
              </Button>
              <Button className='nextButton'>
                <Flex align='center' justify='center' width='full'>
                  <Box textAlign='center' flexGrow={1}>
                    Next
                  </Box>
                  <ChevronRight />
                </Flex>
              </Button>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </TabPanel>
  );
}
