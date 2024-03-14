'use client';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box } from '@chakra-ui/react';
import StripePaymentForm from './StripePaymentForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'your-product-or-service-id' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = { clientSecret };

  return (
    <Box padding="100px" width="50%">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={options}>
          <StripePaymentForm />
        </Elements>
      )}
    </Box>
  );
}
