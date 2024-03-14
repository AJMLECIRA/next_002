import { Box, Button, Center, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
const btnStyle = {
  fontSize: { base: '3vw', md: '1.0vw', lg: '0.8vw' },
  width: '100%',
  height: '100%',
  borderRadius: '4vw',
  textTransform: 'uppercase',
  padding: { base: '1vw', md: '0.5vw' },
};
const buttonStyle = {
  color: 'grey',
  border: '0.01vw solid grey',
};
const buttonHoverStyle = {
  cursor: 'pointer',
  background: 'rgba(12, 198, 223,0.25)',
  color: 'grey',
};
const activeButtonStyle = {
  background: 'rgba(12, 198, 223,1.0)',
  color: 'white',
};
const gridItemStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // Center the content horizontally
};

export default function CanvasViews({ selectedView, onSelectedViewChange }) {
  const handleViewSelect = (view) => {
    onSelectedViewChange(view);
    // Add your logic to perform actions when a view is selected here
    console.log(`Selected view: ${view}`);
  };

  return (
    <Box
      borderRadius={'1vw'}
      background=""
      height="auto"
      width="100%"
      margin="1vw 0vw"
    >
      <Grid
        templateColumns={'repeat(3, 1fr)'}
        display="flex"
        justifyContent={'space-evenly'}
        gap="2vw"
        padding="0vw 0vw 2vw 0vw"
      >
        <GridItem {...gridItemStyle}>
          <Box
            {...btnStyle}
            {...(selectedView === 'clean' ? activeButtonStyle : buttonStyle)}
            onClick={() => handleViewSelect('clean')}
            _hover={buttonHoverStyle}
          >
            <Center height="100%">clean</Center>
          </Box>
        </GridItem>
        <GridItem {...gridItemStyle}>
          <Box
            {...btnStyle}
            {...(selectedView === 'living room'
              ? activeButtonStyle
              : buttonStyle)}
            onClick={() => handleViewSelect('living room')}
            _hover={buttonHoverStyle}
          >
            <Center height="100%">living room</Center>
          </Box>
        </GridItem>
        <GridItem {...gridItemStyle}>
          <Box
            {...btnStyle}
            {...(selectedView === 'nocturnal'
              ? activeButtonStyle
              : buttonStyle)}
            onClick={() => handleViewSelect('nocturnal')}
            _hover={buttonHoverStyle}
          >
            <Center height="100%">nocturnal</Center>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
