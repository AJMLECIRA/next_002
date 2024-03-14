// ##### This Hook removes the generated leading Zero ######
// #### from an input when the input has to be numerical ###
"use client";
import { useSelector, useDispatch } from "react-redux";

export const useReduxInput = (selector, actionCreator) => {
  const dispatch = useDispatch();
  const value = useSelector(selector);
  let previousValue = value;

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (isNaN(newValue)) {
      dispatch(actionCreator(previousValue));
    } else {
      previousValue = newValue === "" ? "" : newValue;
      dispatch(actionCreator(previousValue));
    }
  };

  const handleFocus = () => {
    if (value === "0") {
      dispatch(actionCreator(""));
    }
  };

  const handleBlur = () => {
    if (value === "") {
      dispatch(actionCreator("0"));
    }
  };

  return {
    value,
    handleChange,
    handleFocus,
    handleBlur,
  };
};
