'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import useCustomerData from '@/app/hooks/basket/useCustomerData'; // Adjust the import path as necessary
import {
  Box,
  Text,
  Spinner,
  VStack,
  Grid,
  Center,
  GridItem,
  Flex,
  Divider,
  Spacer,
} from '@chakra-ui/react';
import Image from 'next/image';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faBuildings,
  faIndustryWindows,
} from '@fortawesome/pro-solid-svg-icons';

const InvoicePage = () => {
  const params = useSearchParams();
  const basketId = params.get('basketId');

  // Directly destructure the needed states from the custom hook
  const { invoice, order, basket, loading } = useCustomerData(basketId);
  let carriageGross, goodsGross, goodsNett, carriageNett, vat;
  if (invoice && order) {
    carriageGross = order.billInfo.delCost;
    goodsGross = invoice.value - carriageGross;
    goodsNett = (goodsGross / 1.2).toFixed(2);
    carriageNett = (carriageGross / 1.2).toFixed(2);
    vat = (invoice.value - goodsNett - carriageNett).toFixed(2);
  }
  // Display loading state
  if (!invoice) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  // console.log(invoice);
  const invDate = moment(invoice.date).format('DD/MM/YY');

  // Conditionally render content based on whether invoice data is present
  return (
    <Box
      padding={{ base: '10vw 5vw', md: '5vw' }}
      width="100vw"
      height="auto"
      display="flex"
      alignItems={'start'}
      justifyContent="center"
      className="main-content"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 2, md: 4, lg: 6 }}>
        <GridItem w="80%" h="auto" mb="20px">
          <Image
            src="/images/mwlogoDK.png"
            width="450"
            height="60"
            alt="Mirrorworld Logo"
          ></Image>
        </GridItem>
        {/* INVOICE DETAILS */}
        <GridItem w="100%" h="auto" display="flex" justifyContent={'center'}>
          <Text fontSize="2vw" fontWeight="600">
            INVOICE / RECEIPT
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          h="auto"
          fontSize={{ base: '2vw', md: '1.5vw', lg: '1.25vw' }}
          fontWeight="400"
        >
          <Text>MirrorWorld Ltd</Text>
          <Text>Unit 3 Deans Road Ind Est</Text>
          <Text>Deand Road, Swinton</Text>
          <Text>Manchester. M27 0RD</Text>
        </GridItem>
        <GridItem
          w="100%"
          h="auto"
          fontSize={{ base: '2vw', md: '1.5vw', lg: '1.25vw' }}
          fontWeight="400"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={1}>
            <Text>Invoice No.</Text>
            <Box
              border="1px"
              borderColor="#00000050"
              padding="0.3vw"
              textAlign={'center'}
            >
              {invoice.invRef}
            </Box>
            <Text>Date</Text>
            <Box
              border="1px"
              borderColor="#00000050"
              padding="0.3vw"
              textAlign={'center'}
            >
              {invDate && invDate}
            </Box>
            <Text>Payment Method</Text>
            <Box
              border="1px"
              borderColor="#00000050"
              padding="0.3vw"
              textAlign={'center'}
            >
              Stripe
            </Box>
          </Grid>
        </GridItem>
        {/* CONTACTS */}
        <GridItem w="100%" colSpan={2}>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={1}
            fontSize={{ base: '1.5vw', md: '1.25vw' }}
            fontWeight={'600'}
            width="100%"
            padding="5px 0"
          >
            <GridItem display="flex" flexDirection="row" alignItems="center">
              <FontAwesomeIcon icon={faPhone} />
              <Text marginStart={4}>0333 800 8181</Text>
            </GridItem>
            <GridItem display="flex" flexDirection="row" alignItems="center">
              <FontAwesomeIcon icon={faEnvelope} />
              <Text marginStart={4}>sales@mirrorworld.co.uk</Text>
            </GridItem>
            <GridItem
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="end"
            >
              <FontAwesomeIcon icon={faIndustryWindows} />
              <Text marginStart={4}>vat GB217302249</Text>
            </GridItem>
            <GridItem
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="end"
            >
              <FontAwesomeIcon icon={faBuildings} />
              <Text marginStart={4}>Co.No. 05298345</Text>
            </GridItem>
          </Grid>
        </GridItem>
        {/* ADDRESSES */}
        <GridItem colSpan="2" height="full" pb="35px">
          <Grid templateColumns="repeat(2, 1fr)" gap="2">
            <GridItem w="100%" h="full">
              <Text fontSize={{ base: '2vw', md: '1.25vw' }} fontWeight={'600'}>
                Billing Address
              </Text>
              <Box
                pl="4"
                pt="2"
                pb="2"
                fontSize={{ base: '2vw', md: '1.25vw' }}
                border="1px"
                borderColor="#00000060"
                h="full"
              >
                {order.billAddInfo.formatted_address.map((address, index) => (
                  <Text key={index}>{address}</Text>
                ))}
                {order.billAddInfo.postcode && order.billAddInfo.postcode}
              </Box>
            </GridItem>
            <GridItem w="100%" h="auto">
              <Text fontSize={{ base: '2vw', md: '1.25vw' }} fontWeight={'600'}>
                Delivery Address
              </Text>
              <Box
                pl="4"
                pt="2"
                pb="2"
                fontSize={{ base: '2vw', md: '1.25vw' }}
                border="1px"
                borderColor="#00000060"
                height="100%"
              >
                {order.delAddInfo.formatted_address.map((address, index) => (
                  <Text key={index}>{address}</Text>
                ))}
                <Text>
                  {order.delAddInfo.postcode && order.billAddInfo.postcode}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
        {/* INVOICE ITEMS */}
        <GridItem
          w="100%"
          colSpan="2"
          fontSize={{ base: '1.5vw', md: '1.25vw' }}
          fontWeight={'600'}
        >
          <Grid templateColumns="12% Auto 7% 10% 10%">
            <GridItem pl="4">Code</GridItem>
            <GridItem>Description</GridItem>
            <GridItem display="flex" justifyContent={'center'}>
              Qty
            </GridItem>
            <GridItem display="flex" justifyContent={'end'}>
              £ each
            </GridItem>
            <GridItem display="flex" justifyContent={'end'} pr="4">
              £ total
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          w="100%"
          colSpan="2"
          fontSize={{ base: '1.5vw', md: '1.25vw' }}
          fontWeight={'600'}
          border="1px"
          borderColor="#00000060"
          h="full"
        >
          <Grid templateColumns="12% Auto 7% 10% 10%" pt="5" pb="5">
            {basket &&
              basket.items.map((item, index) => (
                <>
                  <GridItem key={index} pl="4">
                    {item.jobInfo.mirrorMaterialCode}
                  </GridItem>
                  <GridItem key={index}>{item.name}</GridItem>
                  <Flex key={index} justifyContent={'center'}>
                    {item.qty}
                  </Flex>
                  <Flex justifyContent={'end'} key={index}>
                    {item.price}
                  </Flex>
                  <Flex justifyContent={'end'} key={index} pe="4">
                    {item.qty * item.price}
                  </Flex>
                </>
              ))}
          </Grid>
        </GridItem>
        <GridItem colSpan="2" h="full">
          <Grid templateColumns="2fr 1fr" pb="5" columnGap="5">
            <GridItem border="1px" borderColor="#00000060" h="full">
              <Text
                fontSize={{ base: '1.5vw', md: '1.25vw' }}
                fontWeight={'600'}
                p="3"
              >
                Notes
              </Text>
              <Box p="3">Notes Here</Box>
            </GridItem>
            <GridItem border="1px" borderColor="#00000060" h="full">
              <Grid templateColumns={'2fr 1fr'} p="3">
                <Text>Goods Nett:</Text>
                <Flex justifyContent={'space-between'}>
                  <Text>£</Text>
                  <Text>{goodsNett}</Text>
                </Flex>
                <Text>Carraige Nett:</Text>
                <Flex justifyContent={'space-between'}>
                  <Text>£</Text>
                  <Text>{carriageNett}</Text>
                </Flex>
                <Text>Total VAT:</Text>
                <Flex justifyContent={'space-between'}>
                  <Text>£</Text>
                  <Text>{vat}</Text>
                </Flex>
                <Spacer />
                <Divider
                  borderColor="gray.600"
                  borderWidth="1"
                  mt="2"
                  mb="2"
                ></Divider>
                <Flex
                  fontSize={{ base: '1.5vw', md: '1.25vw' }}
                  fontWeight={'600'}
                >
                  Invoice Total :
                </Flex>
                <Flex
                  justifyContent={'space-between'}
                  fontSize={{ base: '1.5vw', md: '1.25vw' }}
                  fontWeight={'600'}
                >
                  <Text>£</Text>
                  <Text>{invoice.value}</Text>
                </Flex>
                <Text></Text>
              </Grid>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default InvoicePage;
