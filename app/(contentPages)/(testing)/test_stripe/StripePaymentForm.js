'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Divider } from '@chakra-ui/react';

export default function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    console.log('submitted');
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    setIsProcessing(false);

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        mt="2vw"
        backgroundColor="#00000070"
        colorScheme="blue"
        isLoading={isProcessing}
        loadingText="Processing..."
        type="submit"
        style={{ marginTop: 12 }}
        id-="submit"
      >
        Pay now
      </Button>
      <Divider orientation="horizontal" style={{ marginTop: 12 }} />
    </form>
  );
}
