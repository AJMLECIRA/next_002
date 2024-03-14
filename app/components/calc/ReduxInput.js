"use client";
import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const ReduxInput = ({ selector, actionCreator, ...props }) => {
  const dispatch = useDispatch();
  const value = useSelector(selector);

  const min = useSelector((state) => state.configGlass.mirrorMaterialMin);
  const max1 = useSelector((state) => state.configGlass.mirrorMaterialMax1);
  const max2 = useSelector((state) => state.configGlass.mirrorMaterialMax2);
  const width = useSelector((state) => state.configGlass.mirrorMaterialWidth);
  const height = useSelector((state) => state.configGlass.mirrorMaterialHeight);

  const [showMinNotice, setShowMinNotice] = useState(false);
  const [showMax1Notice, setShowMax1Notice] = useState(false);
  const [showMax2Notice, setShowMax2Notice] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    dispatch(actionCreator(inputValue === "" ? "" : Number(inputValue)));
  };

  const handleBlur = () => {
    setShowMinNotice(false);
    setShowMax1Notice(false);
    setShowMax2Notice(false);
    // console.log('Width ', width);
    // console.log('Height ', height);
    // console.log('Max1 ', max1);
    // console.log('Max2 ', max2);
    // console.log('Min ', min);
    let numericalValue = value === "" ? "" : Number(value);
    if (!isNaN(numericalValue)) {
      if (numericalValue < min) {
        numericalValue = min;
        setShowMinNotice(true); // Show the notice when the minimum value is used
      } else {
        setShowMinNotice(false); // Hide the notice if the value is above the minimum
      }
      if (numericalValue > max2) {
        numericalValue = max2;
        setShowMax2Notice(true); // Show the notice when the minimum value is used
      } else {
        setShowMax2Notice(false); // Hide the notice if the value is above the minimum
      }
      if (numericalValue > max1 && width > max1 && height > max1) {
        numericalValue = max1;
        setShowMax1Notice(true); // Show the notice when the minimum value is used
      } else {
        setShowMax1Notice(false); // Hide the notice if the value is above the minimum
      }
      // Add logic to enforce maximum values if needed, for example:
      // if (someCondition) {
      //   numericalValue = Math.min(numericalValue, max1);
      // } else {
      //   numericalValue = Math.min(numericalValue, max2);
      // }
      // show the input box value
      console.log(numericalValue);
      // change the store value in mm
      dispatch(actionCreator(numericalValue));
    }
  };

  return (
    <>
      <InputGroup>
        <Input
          value={value}
          type='number'
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
          pr='13.5vw' // add padding to the right of the input
        />
        <InputRightElement width={{ base: "15vw", md: "8vw" }} height='100%'>
          <Text as='span' fontSize={{ base: "3vw", md: "1.5vw" }}>
            mm
          </Text>
        </InputRightElement>
      </InputGroup>
      {showMinNotice && (
        <Text color='red.500' fontSize='sm' mt={2} textAlign={"center"}>
          NB: Minimum {min} mm.
        </Text>
      )}
      {showMax2Notice && (
        <Text color='red.500' fontSize='sm' mt={2} textAlign={"center"}>
          NB: Maximum {max2} mm.
        </Text>
      )}
      {showMax1Notice && (
        <Text color='red.500' fontSize='sm' mt={2} textAlign={"center"}>
          NB: Max 2nd Dimension {max1} mm.
        </Text>
      )}
    </>
  );
};

ReduxInput.propTypes = {
  selector: PropTypes.func.isRequired,
  actionCreator: PropTypes.func.isRequired,
};

export default ReduxInput;
