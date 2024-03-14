'use client';
import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Divider, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMessage } from '@/app/redux/slices/configSiteSlice';

export default function StripePaymentForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const paymentMessage = useSelector((state) => state.site.paymentMessage);
  const [isVisible, setIsVisible] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (paymentMessage) {
      setMessage(paymentMessage);
    }
  }, [paymentMessage]);

  const handleSubmit = async (event) => {
    console.log('submitted');
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/summary`,
      },
      redirect: 'if_required',
    });

    console.log('Result: ', result);
    console.log('Result: ', result.error);
    console.log('Result.paymentIntent: ', result.paymentIntent);
    if (result.paymentIntent) {
      if (
        result.paymentIntent.redirect_status === 'succeeded' ||
        result.paymentIntent.status === 'succeeded'
      ) {
        console.log('Redirect succeeded!');
        router.push('/thankyou');
      }
    }
    if (result.error) {
      setMessage(result.error.message);
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        onCloseComplete: () => {
          dispatch(setPaymentMessage(''));
        },
      });
    }
  }, [message, dispatch, toast]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        mt="2vw"
        colorScheme="black"
        backgroundColor="#00000070"
        isLoading={isProcessing}
        loadingText="Processing..."
        type="submit"
        style={{ borderRadius: '2vw', width: '100%', marginTop: 20 }}
        id="submit"
        width="100%"
        color="white"
        padding="1.5vw"
      >
        Pay now
      </Button>

      {isVisible && (
        <Text
          color="red"
          fontSize="1.2vw"
          mt={5}
          id="payment-message"
          style={{ transition: 'opacity 1s ease-in-out' }}
        >
          {/* {message} */}
        </Text>
      )}
      <Divider orientation="horizontal" style={{ marginTop: 12 }} />
    </form>
  );
}
