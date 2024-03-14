'use client';
import React from 'react';
import {
  TabPanel,
  Grid,
  GridItem,
  Button,
  Box,
  Flex,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import CalcCompGlassType from '../calcComps/CalcCompGlassType';
import CalcCompGauge from '../calcComps/CalcCompGauge';
import CalcCompEdge from '../calcComps/CalcCompEdge';
import { useSelector, useDispatch } from 'react-redux';
import AgedGlassSelector from '../calcSectors/SelectorAgedGlassV9';
import TintedGlassSelector from '../calcSectors/SelectorTintedGlassV9';
import CalcCompTintedMobile from '../calcComps/CalcCompTintedMobile';
import CalcCompAgedMobile from '../calcComps/CalcCompAgedMobile';
//import TestGrid from '../../components/calc/TestGrid';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/pro-solid-svg-icons';

const IconWrapper = ({ icon }) => <FontAwesomeIcon icon={icon} height="1vw" />;

const gridItemStyle = {
  width: '100%',
};
const gridBoxStyle = {
  width: '100%',
  display: 'flex',
};

export function GlassTypePanel({ goToNextTab }) {
  const mirrorMaterialGroup = useSelector(
    (state) => state.configGlass.mirrorMaterialGroup
  );
  const mirrorMaterialGauge = useSelector(
    (state) => state.configGlass.mirrorMaterialGauge
  );
  const hideForMobile = useBreakpointValue({ base: false, md: true });

  // Display the extra panels for glass choices
  let tintedRange = mirrorMaterialGroup === 'tinted' ? 'block' : 'none';
  let agedRange = mirrorMaterialGroup === 'aged' ? 'block' : 'none';
  return (
    <TabPanel display="flex" flexDirection="column" height="100%" width="100%">
      <Grid
        paddingTop={{ base: '4vw', md: '0' }}
        rowGap={{ base: '4vw', md: '1vw' }}
        display="flex"
        flexDirection={'column'}
        flexGrow={'1'}
      >
        <GridItem {...gridItemStyle}>
          <CalcCompGlassType />
        </GridItem>
        {hideForMobile && (
          <GridItem {...gridItemStyle} display={tintedRange}>
            <Box
              background="rgba(255,255,255,1)"
              borderRadius="1.5vw"
              padding="1vw"
              columnGap="1vw"
            >
              <TintedGlassSelector />
            </Box>
          </GridItem>
        )}
        {hideForMobile && (
          <GridItem
            {...gridItemStyle}
            height={{ base: 'auto', md: 'auto' }}
            display={agedRange}
          >
            <Box
              background="rgba(255,255,255,1)"
              borderRadius="1.5vw"
              padding="1vw"
              columnGap="1vw"
            >
              <AgedGlassSelector />
            </Box>
          </GridItem>
        )}
        {/* #### Selectors for Gauge and Edging including     #####
         ####### Tinted and Aged selector when in mobile mode ##### */}
        <GridItem {...gridItemStyle} height={{ base: 'auto', md: 'auto' }}>
          {mirrorMaterialGroup && (
            <Grid
              id="gaugeEdge"
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              background="rgba(255,255,255,1)"
              borderRadius={{ base: '6vw', md: '1.5vw' }}
              padding={{ base: '0 4vw 4vw 4vw', md: '1vw' }}
              columnGap={{ md: '1vw' }}
            >
              {mirrorMaterialGroup === 'plain' && (
                <GridItem>
                  <CalcCompGauge />
                </GridItem>
              )}
              <GridItem>
                <CalcCompEdge />
              </GridItem>
              {!hideForMobile && mirrorMaterialGroup === 'tinted' && (
                <GridItem>
                  <CalcCompTintedMobile />
                </GridItem>
              )}
              {!hideForMobile && mirrorMaterialGroup === 'aged' && (
                <GridItem>
                  <CalcCompAgedMobile />
                </GridItem>
              )}
            </Grid>
          )}
        </GridItem>
        <GridItem {...gridItemStyle} flexGrow={'1'} display="flex">
          {' '}
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            height="100%"
            width="100%"
            border="solid 0px red"
          >
            <Box {...gridBoxStyle} justifyContent="space-between">
              <Spacer />
              <Button className="nextButton" onClick={goToNextTab}>
                <Flex align="center" justify="center" width="full" height="2vw">
                  <Box textAlign="center" flexGrow={1}>
                    Next
                  </Box>
                  <IconWrapper icon={faChevronRight} />
                </Flex>
              </Button>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </TabPanel>
  );
}
export function FittingsPanel() {
  return (
    <TabPanel>
      <p>This is where Fittings are chosen</p>
    </TabPanel>
  );
}
