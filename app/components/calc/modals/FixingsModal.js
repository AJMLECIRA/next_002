"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Center,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import screwsSvg from "/public/svgs/screw-cap-grommet-solid.svg";
import adhesiveSvg from "/public/svgs/glue-solid.svg";
import noneSvg from "/public/svgs/none.svg";
import {
  setMEScrews,
  setMEFittings,
  setMEAdhesive,
} from "../../../redux/slices/configGlassSlice";
const SVGWrapper = ({ Component, ...props }) => (
  <Component {...props} style={{ opacity: "1", margin: "2vw" }} />
);
const gridItemStyle = {
  border: "0.1vw solid #666666",
  borderRadius: "1.5vw",
  padding: "1.0vw 0 1.0vw",
  background: "rgba(255,255,255,0.8)",
  width: "100%",
};
const gridItemTitle = {
  fontSize: { base: "2.0vw", md: "1vw" },
  fontWeight: "300",
  textTransform: "uppercase",
  paddingTop: "5px",
};
const activeStyle = {
  backgroundColor: "#ffffff",
  border: "4px solid #0cc6de",
  fill: "#0cc6de",
  // Other styles for active item
};

const normalStyle = {
  backgroundColor: "rgb(250,250,250)",
  border: "4px solid gray",
  // Other styles for normal item
};
const HoverableGridItem = ({ children, title, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const bgColor = isActive
    ? "rgba(255,255,255,1)"
    : isHovered
    ? "rgba(255,255,255,1)"
    : "rgba(255,255,255,0.5)";

  const iconColor = isHovered || isActive ? "#0cc6de" : "#40474f";
  const svgColor = isHovered || isActive ? "#0cc6de" : "#40474f";
  const border = isActive ? "1vw solid #0cc6de" : "0.1vw solid #666666";
  const margin = isActive ? "0vw" : "0.1vw";

  const style = isActive ? activeStyle : normalStyle;

  return (
    <GridItem
      {...gridItemStyle}
      {...style}
      background={bgColor}
      border={border}
      margin={margin}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onActivate(title, isActive)}
      _hover={{ cursor: "pointer" }}
      display='flex' // use flexbox to align children
      flexDirection='column' // stack children vertically
      justifyContent='center' // center children vertically
      alignItems='center' // center children horizontally
    >
      <Center color={iconColor} fill={svgColor}>
        {children}
      </Center>
      <Center {...gridItemTitle}>{title}</Center>
    </GridItem>
  );
};
export default function FixingsModal({ isOpen, onClose }) {
  // Fetch the activeElements from Redux state
  const dispatch = useDispatch();

  const activeFittings = useSelector(
    (state) => state.configGlass.mirrorExtraFittings
  );
  const activeScrews = useSelector(
    (state) => state.configGlass.mirrorExtraScrews
  );
  const activeAdhesive = useSelector(
    (state) => state.configGlass.mirrorExtraAdhesive
  );
  const handleActivate = (choice) => {
    console.log(choice);
    if (choice === "screws") {
      dispatch(setMEFittings("yes"));
      dispatch(setMEAdhesive("none"));
      dispatch(setMEScrews("AC008"));
      setFixing("Screws,Caps & Grommets");
    } else if (choice === "adhesive") {
      dispatch(setMEFittings("yes"));
      dispatch(setMEScrews("none"));
      dispatch(setMEAdhesive("AC015"));
      setFixing("Specialist Mirror Adhesive");
    } else {
      dispatch(setMEFittings("none"));
      dispatch(setMEScrews("none"));
      dispatch(setMEAdhesive("none"));
      setFixing("None");
    }
    setSvgIcon(choice);
    console.log(choice);
    onClose();
  };
  const [svgIcon, setSvgIcon] = useState("none");
  const [fixing, setFixing] = useState("none");

  useEffect(() => {
    if (activeScrews !== "none") {
      setSvgIcon(<SVGWrapper Component={screwsSvg} />);
      setFixing("Screws,Caps & Grommets");
      console.log("fixing ", fixing);
    }
    if (activeAdhesive !== "none") {
      setSvgIcon(<SVGWrapper Component={adhesiveSvg} />);
      setFixing("Specialist Mirror Adhesive");
      console.log("fixing ", fixing);
    }
    if (activeFittings === "none") {
      setSvgIcon(<SVGWrapper Component={noneSvg} />);
      setFixing("None");
    }
  }, [activeScrews, activeFittings, activeAdhesive, fixing]);

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
          Fitting Options
        </ModalHeader>
        <ModalCloseButton margin='15px' color='red' fontSize='4vw' />
        <ModalBody>
          <Grid
            templateColumns='repeat(2, 1fr)'
            gap='3vw'
            flexDirection='row'
            width='100%'
          >
            <HoverableGridItem
              title='none'
              isActive={activeFittings === "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={noneSvg} fontSize='10vw' />
            </HoverableGridItem>
            <HoverableGridItem
              title='screws'
              isActive={activeScrews !== "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={screwsSvg} fontSize='10vw' />
            </HoverableGridItem>
            <HoverableGridItem
              title='adhesive'
              isActive={activeAdhesive !== "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={adhesiveSvg} fontSize='10vw' />
            </HoverableGridItem>
          </Grid>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
