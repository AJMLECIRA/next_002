'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function PayPalPayment() {
  const basketID = useSelector((state) => state.basket.basketData.basketID);
  useEffect(() => {
    // Load PayPal SDK script
    if (!basketID) {
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AQ5HiZB5o0T1BLhAw-wWQDYxNto0s6klXvBO54fpmqUEtQA3L0Vl_-L3pYlqIxvcS-9FDopflaVlVbPJ&currency=GBP';
    script.async = true;

    script.onload = () => {
      console.log('PayPal SDK script loaded');
      window.paypal
        .Buttons({
          style: {
            color: 'blue',
            layout: 'horizontal',
            tagline: false,
            label: 'pay',
            tagline: true,
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '17.44', // Set your payment amount here
                    currency_code: 'GBP',
                  },
                  custom_id: basketID,
                  invoice_id: `INV_202302011234 ${basketID}_16.44`,
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            console.log(data);
            return actions.order.capture().then(function (details) {
              // Payment is successful, you can handle the success here
              const payerName = details.payer.name.given_name;
              console.log('Transaction completed by ' + payerName);
              console.log('Transaction Details', details);
            });
          },
        })
        .render('#paypal-button-container'); // Render the PayPal button in your HTML element with id "paypal-button-container"
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [basketID]);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default PayPalPayment;
