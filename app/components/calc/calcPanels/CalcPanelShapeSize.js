'use client';
import React from 'react';
import {
  TabPanel,
  Grid,
  GridItem,
  Button,
  Box,
  Flex,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import '@/app/styles/globals.css';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/pro-solid-svg-icons';

import CalcCompGlassShape from '../calcComps/CalcCompGlassShape';
import CalcCompSizeScale from '../calcComps/CalcCompSizeScale';
import SelectorShapedArched from '../calcSectors/SelectorShapeArched';
import SelectorShapedRadius from '../calcSectors/SelectorShapeRadius';
import SelectorShapedPolygon from '../calcSectors/SelectorShapePolygon';
import SelectorShapedOther from '../calcSectors/SelectorShapeOther';
import CalcCompRads from '../calcComps/CalcCompRads';
import CalcCompArchMobile from '../calcComps/CalcCompArchMobile';

const IconWrapper = ({ icon }) => <FontAwesomeIcon icon={icon} fontSize="2x" />;
const ChevronRight = () => <IconWrapper icon={faChevronRight} />;
const ChevronLeft = () => <IconWrapper icon={faChevronLeft} />;

const gridItemStyle = {
  width: '100%',
  border: 'solid 0px red',
  display: 'flex',
};
const gridBoxStyle = {
  border: 'solid 0px green',
  width: '100%',
  display: 'flex',
};
const sectorStyle = {
  display: 'flex',
};

export function GlassShapeSizePanel({ goToNextTab, goToPrevTab }) {
  const hideForMobile = useBreakpointValue({ base: false, md: true });
  const mirrorMaterialShape = useSelector(
    (state) => state.configGlass.mirrorMaterialShape
  );
  let archedRange = ['arch', 'gothic', 'overmantle', 'semicircle'].includes(
    mirrorMaterialShape
  )
    ? 'block'
    : 'none';
  let radiusRange = ['radius', 'pill', 'lgradius'].includes(mirrorMaterialShape)
    ? 'block'
    : 'none';
  let polygonRange = [
    'polygon',
    'hexagon',
    'diamond',
    'kite',
    'triangle',
    'pentagon',
    'octagon',
  ].includes(mirrorMaterialShape)
    ? 'block'
    : 'none';
  let otherRange = ['irrQuad', 'cutCorner', 'other'].includes(
    mirrorMaterialShape
  )
    ? 'block'
    : 'none';
  // console.log(archedRange);
  return (
    <TabPanel display="flex" flexDirection="column" height="100%" width="100%">
      <Grid
        rowGap={{ base: '4vw', md: '1vw' }}
        display="flex"
        flexDirection={'column'}
        flexGrow={'1'}
        height="100%" // Make sure the parent Grid fills its entire space.
      >
        <GridItem {...gridItemStyle}>
          <CalcCompGlassShape />
        </GridItem>
        <GridItem {...gridItemStyle}>
          <Box
            background="rgba(255,255,255,1)"
            borderRadius={{ base: '6vw', md: '1.5vw' }}
            padding={{ base: '3vw 4vw 4vw', md: '1vw' }}
          >
            <CalcCompSizeScale {...sectorStyle} />
            {hideForMobile && (
              <>
                <Box display={archedRange}>
                  <Divider
                    borderWidth="1px"
                    borderColor="black"
                    borderStyle="dotted"
                    my={4}
                  />
                  <SelectorShapedArched {...sectorStyle} />
                </Box>

                <Box display={radiusRange}>
                  <Divider
                    borderWidth="1px"
                    borderColor="black"
                    borderStyle="dotted"
                    my={4}
                  />
                  <CalcCompRads />
                  <SelectorShapedRadius {...sectorStyle} />
                </Box>
                <Box display={polygonRange}>
                  <Divider
                    borderWidth="1px"
                    borderColor="black"
                    borderStyle="dotted"
                    my={4}
                  />
                  <SelectorShapedPolygon {...sectorStyle} />
                </Box>
                <Box display={otherRange}>
                  <Divider
                    borderWidth="1px"
                    borderColor="black"
                    borderStyle="dotted"
                    my={4}
                  />
                  <SelectorShapedOther {...sectorStyle} />
                </Box>
              </>
            )}
            {!hideForMobile && archedRange === 'block' && (
              <GridItem>
                <CalcCompArchMobile />
              </GridItem>
            )}
            {!hideForMobile && radiusRange === 'block' && (
              <GridItem>
                <CalcCompRads />
                <CalcCompArchMobile />
              </GridItem>
            )}
            {!hideForMobile && polygonRange === 'block' && (
              <GridItem>
                <CalcCompArchMobile />
              </GridItem>
            )}
            {!hideForMobile && otherRange === 'block' && (
              <GridItem>
                <CalcCompArchMobile />
              </GridItem>
            )}
          </Box>
        </GridItem>
        <GridItem {...gridItemStyle} flexGrow={'1'} display="flex">
          {' '}
          {/* Ensure this GridItem stretches */}
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            height="100%"
            width="100%"
          >
            {/* <Grid>Box>Item 3</Box> */}
            <Box {...gridBoxStyle} justifyContent="flex-end">
              {/*<Button>My Button 1</Button> */}
            </Box>
            <Box {...gridBoxStyle} justifyContent="space-between">
              <Button className="backButton" onClick={goToPrevTab}>
                <Flex align="center" justify="center" width="full">
                  <ChevronLeft />
                  <Box textAlign="center" flexGrow={1}>
                    Back
                  </Box>
                </Flex>
              </Button>
              <Button className="nextButton" onClick={goToNextTab}>
                <Flex align="center" justify="center" width="full">
                  <Box textAlign="center" flexGrow={1}>
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
