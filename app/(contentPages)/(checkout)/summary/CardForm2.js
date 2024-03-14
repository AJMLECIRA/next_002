'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CardForm2({ accessToken }) {
  const [connectEInitialized, setConnectEInitialized] = useState(false);
  const [connectE, setConnectE] = useState(null);
  // Payment execution function
  const executePayment = () => {
    if (connectE) {
      console.log('connectE : ', connectE);
      // Additional information if needed
      const additionalInfo = {
        // Add any relevant additional information here
      };

      // Call executePayment on the 'connectE' instance
      connectE
        .executePayment(additionalInfo)
        .then(function (data) {
          // Handle successful payment response here
          console.log('Payment successful:', data);
        })
        .catch(function (error) {
          // Handle payment failure or error here
          console.error('Payment failure:', error);
        });
    } else {
      console.error('ConnectE is not initialized.');
    }
  };

  useEffect(() => {
    console.log('accessToken', accessToken);
    console.log('connectEInitialized', connectEInitialized);
    // Ensure the accessToken is available and valid
    if (accessToken && !connectEInitialized) {
      // Load Connect-E Standard script and initialize
      loadConnecteScript(accessToken);
      setConnectEInitialized(true); // Set a flag to indicate initialization
    }
  }, [accessToken, connectEInitialized]);

  const loadConnecteScript = (accessToken) => {
    console.log('CardForm2 rendered');
    // Define the URL of the Connect-e Standard script
    const connecteScriptUrl =
      'https://web.e.test.connect.paymentsense.cloud/assets/js/client.js';

    // Use Axios to fetch the script
    axios
      .get(connecteScriptUrl)
      .then((response) => {
        // Create a script element and set its content to the loaded script
        const scriptElement = document.createElement('script');
        scriptElement.innerHTML = response.data;

        // Append the script to the document's head
        document.head.appendChild(scriptElement);

        // Initialize Connect-e Standard after the script is loaded
        initializeConnecte(accessToken);
      })
      .catch((error) => {
        console.error('Error loading Connect-e Standard script:', error);
      });
  };

  const initializeConnecte = (accessToken) => {
    // Configuration object for Connect-e Standard
    const config = {
      // Define your Connect-e Standard configuration here
      // You can include any required configuration options
      containerId: 'paymentSense',
      paymentDetails: {
        paymentToken: accessToken, // Replace with your payment token
      },
      fontCss: [], // Array of URLs for font CSS files
      styles: {
        // Other style configurations...
        base: {}, // Styles for all fields
        cv2: {}, // Styles for the cv2 field
        cardNumber: {}, // Styles for the card number field
        expiryDate: {}, // Styles for the expiry date field
        cardName: {}, // Styles for the card name field
        cardIcon: {}, // Styles for the card icon
        form: {
          // Define styles for the form here
          // For example:
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '10px',
        },
        text: {}, // Text configuration to override defaults
        onIframeLoaded: () => {}, // Function to be called once the iframe is loaded and configured
        onIframeLoadFailed: () => {}, // Function to be called on iframe load error
        errorMessages: {}, // Custom validation error messages
        callbacks: {}, // Callback functions for various events
        billingAddressRequired: false, // Whether to collect the buyer's billing address (true/false)
      },
      errorMessages: {
        cardNameRequired: 'Card name is required.',
        cardNameInvalid: 'Invalid card name.',
        // Add more error messages for other validation types...
      },
    };

    // Optional callback to handle validation errors
    const displayErrorsCallback = (validationErrors) => {
      // Handle validation errors here
      console.error('Validation Errors:', validationErrors);
    };

    // Optional callback for onSubmitTriggered
    const onSubmitTriggered = () => {
      // Handle onSubmitTriggered event if needed
    };

    // Optional callback for onBlur
    const onBlur = () => {
      // Handle onBlur event if needed
    };

    // Initialize an instance of Connect-e Standard
    const connectE = new Connect.ConnectE(
      config,
      displayErrorsCallback,
      onSubmitTriggered,
      onBlur
    );

    // Now you can work with the 'connectE' instance as per your requirements
  };

  return (
    <>
      <div id="paymentSense"></div>
      <div id="errors"></div>
      <button
        id="testPay"
        className="btn-primary btn pull-right"
        data-loading-text="Processing..."
      >
        Pay
      </button>
      <div id="demo-result" style={{ display: 'none' }}>
        <h5>Payment Complete</h5>
        <dl>
          <dt>Status Code</dt>
          <dd id="status-code"></dd>
          <dt>Auth Code</dt>
          <dd id="auth-code"></dd>
        </dl>
      </div>
      {/* <div id="paymentSense">
         Your CardForm2 component content
         <button onClick={executePayment}>Pay Now</button>
        {' '}
      </div> */}
    </>
  );
}

export default CardForm2;
