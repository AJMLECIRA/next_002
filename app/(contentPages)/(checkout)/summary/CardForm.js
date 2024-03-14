import React, { useEffect } from 'react';

const CardForm = ({ accessToken }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://web.e.test.connect.paymentsense.cloud/assets/js/checkout.js';
    script.setAttribute('data-amount', '100');
    script.setAttribute('data-access-token', accessToken);
    script.setAttribute('data-currency-code', '826');
    script.setAttribute('data-description', 'Demo Payment of 1.00 GBP');
    script.setAttribute('data-button-text', 'Start Payment 2');
    script.setAttribute('data-submit-button-text', 'Pay 1.00 GBP');
    script.classList.add('connect-checkout-btn');

    document.getElementById('paymentForm').appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.getElementById('paymentForm').removeChild(script);
    };
  }, [accessToken]); // Only re-run the effect if accessToken changes

  return (
    <form id="paymentForm" action="/CheckoutDemoComplete" method="post">
      <div>Amount: 1.00 GBP</div>
    </form>
  );
};

export default CardForm;
