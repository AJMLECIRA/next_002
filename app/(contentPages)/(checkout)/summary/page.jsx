'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  Spacer,
  Divider,
  Center,
  Button,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import SummaryBasket from '@/app/components/basket/SummaryBasket';
import Contact from './Contact';
import DelMethod from './DelMethod';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import ConfirmAddresses from './ConfirmAddresses';
import useAddOrderToStore from '@/app/hooks/basket/useAddOrderToStore';
import { useRouter } from 'next/navigation';
import OrderSummary from './OrderSummary';
import Stripe from './Stripe';
import {
  setCustomerData,
  setDeliveryData,
  setBillingData,
} from '@/app/redux/slices/configBasketSlice';
import { setPaymentMessage } from '@/app/redux/slices/configSiteSlice';
import { useDispatch } from 'react-redux';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const addOrderToStore = useAddOrderToStore();
  const fullName = useSelector((state) => state.basket.customerData.fullName);
  const companyName = useSelector(
    (state) => state.basket.customerData.companyName
  );
  const email = useSelector((state) => state.basket.customerData.email);
  const phone = useSelector((state) => state.basket.customerData.phone);
  const basketID = useSelector((state) => state.basket.basketData.basketID);
  const delAddInfo = useSelector((state) => state.basket.deliveryData);
  const billAddInfo = useSelector((state) => state.basket.billingData);
  const itemsQty = useSelector(
    (state) => state.basket.basketData.basketItemsQty
  );
  const billValue = useSelector((state) => state.basket.basketOrderValue);
  const delCost = useSelector((state) => state.basket.delCost);
  const delMethod = useSelector((state) => state.basket.delMethod);
  const delAddError = useSelector((state) => state.site.DelAddError);
  const billAddError = useSelector((state) => state.site.BillAddError);
  const [hidePayMethods, setHidePayMethods] = useState(true);
  const [customer, setCustomer] = useState({});
  const [billInfo, setBillInfo] = useState({});
  const [newOrder, setNewOrder] = useState({});
  const [orderDetailsShow, setOrderDetailsShow] = useState(true);
  const [orderSummaryShow, setOrderSummaryShow] = useState(false);
  const [redirectStatus, setRedirectStatus] = useState('');
  const [localData, setLocalData] = useState(false);
  const postcodeDel = useSelector(
    (state) => state.basket.deliveryData.postcode
  );
  const postcodeBill = useSelector(
    (state) => state.basket.billingData.postcode
  );
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
        'Invalid phone number'
      )
      .required('Phone is required'),
  });
  const formik = useFormik({
    initialValues: {
      fullName: fullName || '',
      companyName: companyName || '',
      email: email || '',
      phone: phone || '',
    },
    validationSchema,

    onSubmit: async (values) => {
      setCustomer(values);
      console.log('onSubmit Called', values);
      const data = {
        customer: values,
        delInfo: delAddInfo,
        billInfo: billAddInfo,
      };
      // Update customerData in localStorage with the merged data
      // ##########  IMPORTANT NOTES FOR FUTURE USE  ###########
      // system currently saves local Contact Data ONLY if redux Login is false
      // else localStorage should be set from login info
      // making sure NOT to overwrite if logged in
      // #######################################################
      localStorage.setItem('customerData', JSON.stringify(data));
    },
  });
  const paymentButtonClick = async () => {
    formik.handleSubmit(); // Wait for handleSubmit to complete
    checkForm();
    window.scrollTo(0, 0);
    // Create order after handleSubmit is done
    try {
      const billInfoData = {
        itemsQty: itemsQty,
        billValue: billValue,
        delCost: delCost,
        delMethod: delMethod,
        paymentStatus: 'pending',
      };
      setBillInfo(billInfoData);
    } catch {
      //console.log('Error processing Order');
    }
    //console.log(delAddError);
    //console.log(billAddError);
  };
  const backToPaymentButtonClick = () => {
    setOrderDetailsShow(true);
    setOrderSummaryShow(false);
    window.scrollTo(0, 0);
    //console.log(delAddError);
    //console.log(billAddError);
  };
  const checkForm = () => {
    if (formik.isValid && delAddError && billAddError) {
      setOrderDetailsShow(false);
      setOrderSummaryShow(true);
    }
  };

  // Get the current URL
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
    const status = urlParams.get('redirect_status');

    if (status && status.includes('failed')) {
      dispatch(setPaymentMessage('Payment Declined or Cancelled'));
      checkForm();
    }
    if (status && status.includes('succeeded')) {
      router.push('/thankyou');
    }

    //setRedirectStatus(status);
  }, [dispatch]); // Include only dispatch in the dependency array

  useEffect(() => {
    // Check if localStorage has any data stored
    const storedCustomerData = JSON.parse(localStorage.getItem('customerData'));
    if (storedCustomerData && !localData) {
      // Extract data from localStorage
      const { customer, delInfo, billInfo } = storedCustomerData;
      // Dispatch actions to set Redux state
      dispatch(setCustomerData(customer));
      dispatch(setDeliveryData(delInfo));
      dispatch(setBillingData(billInfo));
      // Set form values using formik's setValues method
      formik.setValues({
        fullName: customer.fullName || '',
        companyName: customer.companyName || '',
        email: customer.email || '',
        phone: customer.phone || '',
      });
      setLocalData(true);
    }
  }, []);
  useEffect(() => {
    const newOrderData = {
      basketID: basketID,
      customer: customer,
      delAddInfo: delAddInfo,
      billAddInfo: billAddInfo,
      billInfo: billInfo,
    };
    setNewOrder(newOrderData);
  }, [billInfo, basketID, customer, delAddInfo, billAddInfo]);
  useEffect(() => {
    // Update Store when all data is available and NOT empty, this was being triggered when retruned from Klarna or Paypal
    if (
      newOrder &&
      Object.keys(newOrder).length > 0 &&
      Object.keys(newOrder.billInfo || {}).length > 0
    ) {
      addOrderToStore(newOrder);
    }
  }, [newOrder, addOrderToStore]);
  useEffect(() => {
    // Check if the form is valid and other conditions
    const isFormValid =
      formik.isValid &&
      !!postcodeDel &&
      !!postcodeBill &&
      !!formik.values.fullName &&
      !!formik.values.email &&
      !!formik.values.phone;
    // Set the hidePayMethods based on the conditions
    setHidePayMethods(!isFormValid);
    // console.log('Is form valid?', formik.isValid);
  }, [
    formik.isValid,
    postcodeDel,
    postcodeBill,
    formik.values.fullName,
    formik.values.email,
    formik.values.phone,
    hidePayMethods,
  ]);

  return (
    <div>
      <Spacer
        height={{ base: '110px', sm: '120px', md: '130px', lg: '90px' }}
      />
      <Grid
        templateColumns={{
          base: '',
          md: '1fr 1fr',
        }}
        padding={{
          base: '0vw 0vw 8vw',
          md: '0 5vw 5vw',
          lg: '0 10vw 10vw',
          xl: '0 15vw 15vw',
        }}
      >
        {orderDetailsShow && (
          <>
            <GridItem
              flexDirection={'column'}
              padding="0.5vw 2vw"
              backgroundColor="#00000010"
              borderRadius="1vw 0 0 1vw"
            >
              <GridItem>
                <Contact formik={formik} />
              </GridItem>
              <Divider
                margin="0 0 1vw"
                height="0vw"
                border="solid 0.1vw rgba(121, 121, 121, 0.25)"
              />
              <GridItem>
                <ConfirmAddresses />
              </GridItem>
              <GridItem>
                <DelMethod />
              </GridItem>
              <Center padding="2vw 0" display="flex" hidden={hidePayMethods}>
                <Button
                  type="submit"
                  color="#ffffff"
                  onClick={paymentButtonClick}
                  style={{ backgroundColor: '#0cc6de' }}
                  width="100%"
                  borderRadius={{ base: '3vw', md: '1.5vw' }}
                  height="40px"
                >
                  Proceed to Payment
                </Button>
              </Center>
            </GridItem>
            <GridItem>
              <SummaryBasket />
            </GridItem>
          </>
        )}
        {orderSummaryShow && (
          <>
            <Flex
              flexDirection={'column'}
              backgroundColor={'#00000010'}
              padding={{ base: '1vw 6vw', md: '0.5vw 2vw' }}
              borderRadius="1vw 0 0 1vw"
              height="100%"
              flex="1"
            >
              <Box
                display="flex"
                alignItems={'center'}
                margin={{ base: '3vw 0', md: '1vw 0vw' }}
              >
                <Text className="sectionTitle">Payment Methods</Text>
              </Box>
              <Divider
                height="0vw"
                border="solid 0.1vw #00000040"
                margin={{ base: '4vw 0', md: '0 0' }}
              />
              <Box width="100%">
                <Stripe />
              </Box>
              <Center padding="2vw 0" width="100%">
                <Button
                  type="submit"
                  color="#ffffff"
                  onClick={backToPaymentButtonClick}
                  style={{ backgroundColor: '#0cc6de' }}
                  width="25%"
                  borderRadius={{ base: '3vw', md: '1.5vw' }}
                  height="40px"
                >
                  Back
                </Button>
              </Center>
            </Flex>
            <GridItem>
              <OrderSummary />
            </GridItem>
          </>
        )}
      </Grid>
    </div>
  );
}
