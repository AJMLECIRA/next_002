'use client';
import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@chakra-ui/react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    console.log('Form submitted');
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/test/',
      },
      redirect: 'if_required',
    });
    const error = result.error;
    console.log(result);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (result.error) {
      setMessage(result.error.message);
      console.error(result.error.message);
    }
    // else if (result.redirect_status === 'succeeded') {
    //   console.log('Redirect succeeded!');
    //   // Handle successful redirect
    // } else if (result.redirect_status === 'failed') {
    //   console.log('Redirect failed!');
    //   setMessage('Payment failed. Please try again.');
    //   clearFormInputs();
    // } else {
    //   setIsProcessing(false);
    //   if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
    //     console.log('Payment succeeded! ' + result.paymentIntent.status + '🎉');
    //   } else {
    //     console.logo('unexpected state');
    //   }
    // }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };
  const onReady = () => {
    console.log('Element form loaded');
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        onReady={onReady}
      />
      <Button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        mt={5}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
