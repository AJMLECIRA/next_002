import React from 'react';
import { Grid, GridItem, Text, Box, Button } from '@chakra-ui/react';

import DeliveryAddress from './DeliveryAddress';
import BillingAddress from './BillingAddress';
export default function ConfirmAddresses() {
  return (
    <Grid
      templateColumns="1fr 1fr" // Define two equal columns
      columnGap={'2vw'} // No gap between columns
      width="100%"
    >
      <GridItem className="sectionBox" colSpan={2}>
        <Text className="sectionTitle">Address Details</Text>
      </GridItem>
      <GridItem colSpan={1} height="100%">
        <DeliveryAddress addressType="delivery" />
      </GridItem>
      <GridItem colSpan={1} height="100%">
        <BillingAddress addressType="billing" />
      </GridItem>
    </Grid>
  );
}
