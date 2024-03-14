"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMMShape } from "../../../redux/slices/configGlassSlice";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Box,
  Center,
} from "@chakra-ui/react";
import ShapeComp from "../../ShapeComp";
import {
  archProps,
  gothicProps,
  overmantleProps,
  semiCircleProps,
  hexagonProps,
  pentagonProps,
  octagonProps,
  kiteProps,
  diamondProps,
  triangleProps,
  irrQuadProps,
  cutCornerProps,
  pillProps,
  radiusProps,
  lgradiusProps,
} from "../shapeConfig";

export default function GlassArchModal({ isOpen, onClose }) {
  const activeGlassShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  let items = [];
  let radiusRange = ["radius", "lgradius", "pill"];
  let archedRange = ["arch", "gothic", "overmantle", "semicircle"];
  let polygonRange = [
    "polygon",
    "hexagon",
    "diamond",
    "kite",
    "triangle",
    "pentagon",
    "octagon",
  ];
  let otherRange = ["irrQuad", "cutCorner", "other"];

  if (archedRange.includes(activeGlassShape)) {
    items = [
      {
        title: "arch",
        Component: () => <ShapeComp {...archProps} />,
      },
      {
        title: "gothic",
        Component: () => <ShapeComp {...gothicProps} />,
      },
      {
        title: "overmantle",
        Component: () => <ShapeComp {...overmantleProps} />,
      },
      {
        title: "semicircle",
        Component: () => <ShapeComp {...semiCircleProps} />,
      },
    ];
  }
  if (radiusRange.includes(activeGlassShape)) {
    items = [
      {
        title: "radius",
        Component: () => <ShapeComp {...radiusProps} />,
      },
      {
        title: "lgradius",
        Component: () => <ShapeComp {...lgradiusProps} />,
      },
      {
        title: "pill",
        Component: () => <ShapeComp {...pillProps} />,
      },
    ];
  }
  if (polygonRange.includes(activeGlassShape)) {
    items = [
      {
        title: "hexagon",
        Component: () => <ShapeComp {...hexagonProps} />,
      },
      {
        title: "diamond",
        Component: () => <ShapeComp {...diamondProps} />,
      },
      {
        title: "kite",
        Component: () => <ShapeComp {...kiteProps} />,
      },
      {
        title: "pentagon",
        Component: () => <ShapeComp {...pentagonProps} />,
      },
      {
        title: "octagon",
        Component: () => <ShapeComp {...octagonProps} />,
      },
      {
        title: "triangle",
        Component: () => <ShapeComp {...triangleProps} />,
      },
    ];
  }
  if (otherRange.includes(activeGlassShape)) {
    items = [
      {
        title: "irrQuad",
        Component: () => <ShapeComp {...irrQuadProps} />,
      },
      {
        title: "cutCorner",
        Component: () => <ShapeComp {...cutCornerProps} />,
      },
    ];
  }
  const dispatch = useDispatch();
  const handleItemClick = (item) => {
    dispatch(setMMShape(item.title));
    if (item.title === "polygon") {
      dispatch(setMMShape("hexagon"));
    } else if (item.title === "other") {
      dispatch(setMMShape("irrQuad"));
    }
    onClose(); // Close the modal
  };

  const activeStyle = {
    backgroundColor: "#ffffff",
    border: "2px solid #0cc6de",
    fill: "#0cc6de",
    // Other styles for active item
  };

  const normalStyle = {
    backgroundColor: "rgb(250,250,250)",
    border: "1px solid gray",
    // Other styles for normal item
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        margin='15vw 3vw'
        borderRadius='4vw'
        backgroundColor={"rgb(245,245,245)"}
      >
        <ModalHeader
          style={{ textTransform: "uppercase" }}
          textAlign={"center"}
          margin='10px'
        >
          Shape Required
        </ModalHeader>
        <ModalCloseButton margin='15px' color='red' fontSize='4vw' />
        <ModalBody>
          <Grid templateColumns='repeat(2, 1fr)' gap={"4vw"}>
            {items.map((item, index) => {
              const IconComponent = item.Component;
              const isActive = item.title === activeGlassShape;
              const itemStyle = isActive ? activeStyle : normalStyle;

              return (
                <GridItem
                  key={index}
                  p={4}
                  border='1px solid gray'
                  onClick={() => handleItemClick(item)}
                  borderRadius='6vw'
                  backgroundColor='rgb(250,250,250)'
                  style={itemStyle}
                >
                  <Box textAlign='center'>
                    <Center height='16vw'>
                      <Box padding='2vw 0 0' width='12vw' height='12vw'>
                        <IconComponent />
                      </Box>
                    </Center>

                    <Center textTransform={"uppercase"}>{item.title}</Center>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </ModalBody>
        <ModalFooter>
          {/* You can add buttons or additional content here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
