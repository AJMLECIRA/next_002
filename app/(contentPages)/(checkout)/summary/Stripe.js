'use client';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box } from '@chakra-ui/react';
import StripePaymentForm from './StripePaymentForm';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState('');
  const basketID = useSelector((state) => state.basket.basketData.basketID);
  const basketValue = useSelector((state) => state.basket.basketOrderValue);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            id: basketID,
            amount: basketValue,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [basketID, basketValue]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0cc6de',
      colorBackground: '#ffffff',
      colorText: '#00000070',
      colorDanger: '#df1b41',
      fontFamily: 'Montserrat',
      spacingUnit: '1vw',
      borderRadius: '1vw',
      fontFamily: 'Montserrat, sans-serif',
      // See all possible variables below
    },
    rules: {
      '.Label': {
        color: '#000000', // Custom color for the input labels
      },
      '.Tab': {
        borderRadius: '3vw',
        padding: '3.5vw',
      },
      '.Input': {
        borderRadius: '5vw',
        border: 'solid 1px #00000020',
        padding: '3.5vw',
      },
    },
  };
  const options = { clientSecret, appearance };

  return (
    <Box padding="1vw" width="100%">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripePaymentForm />
        </Elements>
      )}
    </Box>
  );
}
