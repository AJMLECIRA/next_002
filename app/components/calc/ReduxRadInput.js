"use client";
import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Center,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import rad1Svg from "/public/svgs/top-left-solid.svg";
import rad2Svg from "/public/svgs/top-right-solid.svg";
import rad3Svg from "/public/svgs/bottom-left-solid.svg";
import rad4Svg from "/public/svgs/bottom-right-solid.svg";

const ReduxRadInput = ({
  selector,
  actionCreator,
  svgIcon,
  disabled,
  ...props
}) => {
  const dispatch = useDispatch();
  const value = useSelector(selector);
  const forMobile = useBreakpointValue({ base: false, md: true });
  const disabledStyle1 = {
    opacity: 1.0, // Example: lower opacity when disabled
    color: "#ffffff", // Add other styles for disabled state here
    fill: "#ffffff", // Add other styles for disabled state here
  };
  const disabledStyle2 = {
    background: "#b7b9bb",
  };
  const handleChange = (event) => {
    const inputValue = event.target.value;
    dispatch(actionCreator(inputValue === "" ? "" : Number(inputValue)));
  };

  // SVG component mapping
  const svgComponents = {
    topLeft: rad1Svg,
    topRight: rad2Svg,
    bottomLeft: rad3Svg,
    bottomRight: rad4Svg,
  };
  const SvgIconComponent = svgComponents[svgIcon];

  //  console.log('svgIcon', svgIcon);
  const SVGWrapper = ({ Component, ...props }) => (
    <Box fontSize={{ base: "4vw", md: "1.5vw" }}>
      <Component {...props} style={{}} />
    </Box>
  );
  return (
    <>
      <InputGroup>
        {!forMobile && (
          <>
            <InputLeftElement width={{ base: "15vw", md: "8vw" }} height='100%'>
              <Center
                as='span'
                fontSize={{ base: "3vw", md: "1.5vw" }}
                height='50px'
                width='50px'
                style={disabled ? disabledStyle1 : null}
              >
                {SvgIconComponent && (
                  <SVGWrapper
                    Component={SvgIconComponent}
                    style={disabled ? disabledStyle1 : null}
                  />
                )}
              </Center>
            </InputLeftElement>
            <InputRightElement
              width={{ base: "15vw", md: "8vw" }}
              height='100%'
            >
              <Center
                as='span'
                fontSize={{ base: "3vw", md: "1.5vw" }}
                style={disabled ? disabledStyle1 : null}
              >
                mm
              </Center>
            </InputRightElement>
          </>
        )}
        <Input
          value={value}
          type='number'
          onChange={handleChange}
          disabled={disabled}
          style={disabled ? disabledStyle2 : null}
          {...props}
        />
      </InputGroup>
    </>
  );
};

ReduxRadInput.propTypes = {
  selector: PropTypes.func.isRequired,
  actionCreator: PropTypes.func.isRequired,
  svgIcon: PropTypes.oneOf([
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
  ]),
  disabled: PropTypes.bool,
};

export default ReduxRadInput;
