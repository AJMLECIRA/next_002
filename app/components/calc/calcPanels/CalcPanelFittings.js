'use client';
import React from 'react';
import {
  TabPanel,
  Grid,
  GridItem,
  Button,
  Box,
  Flex,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CalcCompFixings from '../calcComps/CalcCompFixings';
import CalcCompBacking from '../calcComps/CalcCompBacking';
import CalcCompExtras from '../calcComps/CalcCompExtras';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';

const IconWrapper = ({ icon }) => <FontAwesomeIcon icon={icon} fontSize="2x" />;
const ChevronLeft = () => <IconWrapper icon={faChevronLeft} />;

const gridItemStyle = {
  width: '100%',
  border: 'solid 0px red',
  display: 'flex',
  flexDirection: 'column',
};
const gridBoxStyle = {
  border: 'solid 0px green',
  width: '100%',
  display: 'flex',
};
const titleStyle = {
  fontSize: { base: '2vw', md: '1.2vw', lg: '1vw' },
  fontWeight: '500',
  paddingBottom: '5px',
};
const buttonStyle = {
  borderRadius: '4vw',
  width: '100%',
  fontSize: '3vw',
  padding: '4vw 0',
  background: '#a6aaaf',
  color: '#ffffff',
  width: '100%',
};
export function FittingsPanel({ goToNextTab, goToPrevTab }) {
  const mobileDisplay = useBreakpointValue({ base: true, md: false });

  return (
    <TabPanel
      border="solid 0px green"
      display="flex"
      flexDirection="column"
      width="100%"
      flexGrow={'1'}
    >
      <Grid
        rowGap={'1vw'}
        display="flex"
        flexDirection={'column'}
        flexGrow={'1'}
        height="100%" // Make sure the parent Grid fills its entire space.
        padding={{ base: '3vw', md: '0vw' }}
        borderRadius={{ base: '6vw', md: '0vw' }}
        background={{ base: '#f0f0f0', md: '#e6e6e6' }}
      >
        {' '}
        {!mobileDisplay && (
          <>
            <GridItem {...gridItemStyle}>
              <Center {...titleStyle}>Fitting Options</Center>
              <CalcCompFixings />
            </GridItem>
            <GridItem {...gridItemStyle}>
              <Center {...titleStyle}>Backing Options</Center>
              <CalcCompBacking />
            </GridItem>
          </>
        )}
        {mobileDisplay && (
          <>
            <GridItem>
              <CalcCompFixings />
            </GridItem>
            <GridItem>
              <CalcCompBacking />
            </GridItem>
          </>
        )}
        <GridItem {...gridItemStyle}>
          <CalcCompExtras />
        </GridItem>
        <GridItem {...gridItemStyle} flexGrow={'1'} display="flex">
          <Grid
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            height="100%"
            width="100%"
          >
            <Box {...gridBoxStyle} justifyContent="space-between">
              <Button className="backButton" onClick={goToPrevTab}>
                <Flex align="center" justify="center" width="full">
                  <ChevronLeft />
                  <Box textAlign="center" flexGrow={1}>
                    Back
                  </Box>
                </Flex>
              </Button>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </TabPanel>
  );
}
