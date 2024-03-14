'use client';
import React, { useEffect, useState } from 'react';
import {
  useBreakpointValue,
  Grid,
  GridItem,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMMHeight,
  setMMWidth,
  setMMRad1,
  setMMRad2,
  setMMRad3,
  setMMRad4,
} from '../../../redux/slices/configGlassSlice';
import ReduxRadInput from '../ReduxRadInput';
import SwitchRads from '../switches/SwitchRads';
import rad1Svg from '/public/svgs/top-left-solid.svg';
import rad2Svg from '/public/svgs/top-right-solid.svg';
import rad3Svg from '/public/svgs/bottom-left-solid.svg';
import rad4Svg from '/public/svgs/bottom-right-solid.svg';

const gridItem = {
  display: 'flex',
  justifyContent: 'center',
  fontSize: { base: '4vw', md: '1.2vw' },
};
const inputItem = {
  display: 'flex',
  border: 'solid 1px #666',
  borderRadius: { base: '6vw', md: '3vw' },
  fontSize: { base: '4vw', md: '1.2vw' },
  textAlign: ' center',
  padding: '30px 0',
};
const buttonItem = {
  display: 'flex',
  border: 'solid 1px #666',
  borderRadius: '3vw',
  padding: '30px 0',
  textAlign: ' center',
  width: '100%',
  fontSize: '1.2vw',
};
const optionItem = {
  padding: '30px 0',
};

const SVGWrapper = ({ Component, ...props }) => (
  <Box fontSize={{ base: '4vw', md: '1.5vw' }}>
    <Component {...props} style={{}} />
  </Box>
);

export default function CalcCompRads() {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.configGlass.mirrorMaterialWidth);
  const height = useSelector((state) => state.configGlass.mirrorMaterialHeight);
  const forMobile = useBreakpointValue({ base: false, md: true });

  const [isChecked, setIsChecked] = useState(true);
  const [isRad1, setIsRad1] = useState(50);
  const [isRad2, setIsRad2] = useState(50);
  const [isRad3, setIsRad3] = useState(50);
  const [isRad4, setIsRad4] = useState(50);

  useEffect(() => {
    const updateRadii = () => {
      dispatch(setMMRad1(isRad1));
      dispatch(setMMRad2(isRad2));
      dispatch(setMMRad3(isRad3));
      dispatch(setMMRad4(isRad4));
    };

    updateRadii();
  }, [dispatch, isRad1, isRad2, isRad3, isRad4]);

  useEffect(() => {
    if (isChecked) {
      let isRad1 = (Math.min(width, height) * 0.1).toFixed(0);
      dispatch(setMMRad1(Number(isRad1)));
      dispatch(setMMRad2(Number(isRad1)));
      dispatch(setMMRad3(Number(isRad1)));
      dispatch(setMMRad4(Number(isRad1)));
    }
  }, [width, height, isChecked, dispatch]);

  const mmRad1 = useSelector((state) => state.configGlass.mirrorMaterialRad1);

  useEffect(() => {
    if (isChecked) {
      dispatch(setMMRad2(Number(mmRad1)));
      dispatch(setMMRad3(Number(mmRad1)));
      dispatch(setMMRad4(Number(mmRad1)));
    }
  }, [mmRad1]);

  const mmShape = useSelector((state) => state.configGlass.mirrorMaterialShape);

  useEffect(() => {
    if (mmShape === 'pill') {
      let isRad1 = (Math.min(width, height) * 0.5).toFixed(0);
      dispatch(setMMRad1(Number(isRad1)));
      dispatch(setMMRad2(Number(isRad1)));
      dispatch(setMMRad3(Number(isRad1)));
      dispatch(setMMRad4(Number(isRad1)));
    }
    if (mmShape === 'radius') {
      let isRad1 = (Math.min(width, height) * 0.1).toFixed(0);
      dispatch(setMMRad1(Number(isRad1)));
      dispatch(setMMRad2(Number(isRad1)));
      dispatch(setMMRad3(Number(isRad1)));
      dispatch(setMMRad4(Number(isRad1)));
    }
    if (mmShape === 'lgradius') {
      let isRad1 = (Math.min(width, height) * 0.25).toFixed(0);
      dispatch(setMMRad1(Number(isRad1)));
      dispatch(setMMRad2(Number(isRad1)));
      dispatch(setMMRad3(Number(isRad1)));
      dispatch(setMMRad4(Number(isRad1)));
    }
  }, [mmShape]);

  return (
    <Grid
      templateColumns={{ base: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
      columnGap={{ base: '4vw', md: '1vw' }}
      rowGap={{ base: '4vw', md: '1vw' }}
      paddingBottom={'20px'}
    >
      {!forMobile && (
        <GridItem colSpan={{ base: '2', md: '1' }}>
          <Divider
            borderWidth="1px"
            borderColor="black"
            borderStyle="dotted"
            marginTop={'4'}
            colSpan="2"
          />
        </GridItem>
      )}
      <GridItem colSpan={{ base: '2', md: '1' }} {...gridItem}>
        Corner Radius
      </GridItem>
      {forMobile && (
        <>
          <GridItem {...gridItem}>
            <SVGWrapper Component={rad1Svg} />
          </GridItem>
          <GridItem {...gridItem}>
            <SVGWrapper Component={rad2Svg} />
          </GridItem>
          <GridItem {...gridItem}>
            <SVGWrapper Component={rad3Svg} />
          </GridItem>
          <GridItem {...gridItem}>
            <SVGWrapper Component={rad4Svg} />
          </GridItem>
        </>
      )}
      <GridItem
        height={{ base: '12vw', md: 'auto' }}
        colSpan={{ base: '2', md: '1' }}
      >
        <SwitchRads isChecked={isChecked} setIsChecked={setIsChecked} />
      </GridItem>
      <GridItem>
        <ReduxRadInput
          {...inputItem}
          svgIcon={'topLeft'}
          selector={(state) => state.configGlass.mirrorMaterialRad1}
          actionCreator={setMMRad1}
        />
      </GridItem>
      <GridItem>
        <ReduxRadInput
          {...inputItem}
          svgIcon={'topRight'}
          selector={(state) => state.configGlass.mirrorMaterialRad2}
          actionCreator={setMMRad2}
          disabled={isChecked}
        />
      </GridItem>
      <GridItem>
        <ReduxRadInput
          {...inputItem}
          svgIcon={'bottomLeft'}
          selector={(state) => state.configGlass.mirrorMaterialRad3}
          actionCreator={setMMRad3}
          disabled={isChecked}
        />
      </GridItem>
      <GridItem>
        <ReduxRadInput
          {...inputItem}
          svgIcon={'bottomLeft'}
          selector={(state) => state.configGlass.mirrorMaterialRad4}
          actionCreator={setMMRad4}
          disabled={isChecked}
        />
      </GridItem>
    </Grid>
  );
}
