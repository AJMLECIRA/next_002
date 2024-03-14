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
import noneSvg from "/public/svgs/none.svg";
import safetySvg from "/public/svgs/shield-solid.svg";
import premiumSvg from "/public/svgs/shield-plus-solid.svg";
import foilSvg from "/public/svgs/shield-shine-solid.svg";
import {
  setMEBacking,
  setMESafety,
  setMEPremium,
  setMEFoil,
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
export default function BackingModal({ isOpen, onClose }) {
  // Fetch the activeElements from Redux state
  const dispatch = useDispatch();

  const activeBacking = useSelector(
    (state) => state.configGlass.mirrorExtraBacking
  );
  const activeSafety = useSelector(
    (state) => state.configGlass.mirrorExtraSafety
  );
  const activePremium = useSelector(
    (state) => state.configGlass.mirrorExtraPremium
  );
  const activeFoil = useSelector((state) => state.configGlass.mirrorExtraFoil);
  const [svgIcon, setSvgIcon] = useState("none");
  const [fixing, setFixing] = useState("none");
  const handleActivate = (choice) => {
    console.log(choice);
    dispatch(setMEBacking("none"));
    dispatch(setMESafety("none"));
    dispatch(setMEPremium("none"));
    dispatch(setMEFoil("none"));
    setFixing("No Backing");
    if (choice === "safety") {
      dispatch(setMEBacking("yes"));
      dispatch(setMESafety("yes"));
      setFixing("Saftey Backing");
    } else if (choice === "premium") {
      dispatch(setMEBacking("yes"));
      dispatch(setMEPremium("yes"));
      setFixing("Premium Backing");
    } else if (choice === "foil") {
      dispatch(setMEBacking("yes"));
      dispatch(setMEFoil("yes"));
      setFixing("Foil Backing");
    }
    setSvgIcon(choice);
    console.log(choice);
    onClose();
  };

  useEffect(() => {
    if (activeBacking === "none") {
      setMEBacking("no");
      setSvgIcon(<SVGWrapper Component={noneSvg} />);
    }
    if (activeSafety === "yes") {
      setSvgIcon(<SVGWrapper Component={safetySvg} />);
      setFixing("Safety Backing");
      setMESafety("yes");

      console.log("fixing ", fixing);
    }
    if (activePremium === "yes") {
      setSvgIcon(<SVGWrapper Component={premiumSvg} />);
      setFixing("Premium Backing");
      setMEPremium("yes");
    }
    if (activeFoil === "yes") {
      setSvgIcon(<SVGWrapper Component={foilSvg} />);
      setMEFoil("yes");
      setFixing("Foil Backing");
    }
  }, [activeSafety, activePremium, activeFoil, fixing]);

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
          Backing Options
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
              isActive={activeBacking === "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={noneSvg} fontSize='10vw' />
            </HoverableGridItem>
            <HoverableGridItem
              title='safety'
              isActive={activeSafety !== "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={safetySvg} fontSize='10vw' />
            </HoverableGridItem>
            <HoverableGridItem
              title='premium'
              isActive={activePremium !== "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={premiumSvg} fontSize='10vw' />
            </HoverableGridItem>
            <HoverableGridItem
              title='foil'
              isActive={activeFoil !== "none"}
              onActivate={handleActivate}
            >
              <SVGWrapper Component={foilSvg} fontSize='10vw' />
            </HoverableGridItem>
          </Grid>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
