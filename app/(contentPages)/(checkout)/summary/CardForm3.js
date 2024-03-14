'use client';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function CardForm3() {
  const [connectEInitialized, setConnectEInitialized] = useState(false);
  const [connectE, setConnectE] = useState(null);
  const accessToken = useSelector((state) => state.site.PSToken);

  useEffect(() => {
    if (accessToken && !connectEInitialized) {
      loadConnecteScript(accessToken);
    }
  }, [accessToken]); // Including connectEInitialized

  const loadConnecteScript = useCallback(
    (accessToken) => {
      if (connectEInitialized) return;
      console.log(
        'connectEInitialized start of loadConnectionScript function',
        connectEInitialized
      );
      if (connectEInitialized) {
        return;
      }
      console.log('ConnecteScript loading...');
      // Define the URL of the Connect-e Standard script
      const connecteScriptUrl =
        'https://web.e.test.connect.paymentsense.cloud/assets/js/client.js';

      // Use Axios to fetch the script
      axios
        .get(connecteScriptUrl)
        .then((response) => {
          console.log('ConnecteScript loaded.');
          console.log('connectEInitialized .then axois', connectEInitialized);
          //setConnectEInitialized(true); // Mark the script as initialized

          // Create a script element and set its content to the loaded script

          const scriptElement = document.createElement('script');
          scriptElement.innerHTML = response.data;

          // Append the script to the document's head
          document.head.appendChild(scriptElement);

          // Initialize Connect-e Standard after the script is loaded
          // initializeConnecte(accessToken);
          setConnectEInitialized(true);
        })
        .catch((error) => {
          console.error('Error loading Connect-e Standard script:', error);
        });
      // Script loading logic...
    },
    [connectEInitialized]
  );
  //   const initializeConnecte = (accessToken) => {
  //     // Configuration object for Connect-e Standard
  //     const config = {
  //       // Define your Connect-e Standard configuration here
  //       // You can include any required configuration options
  //       containerId: 'paymentSense',
  //       paymentDetails: {
  //         paymentToken: accessToken, // Replace with your payment token
  //       },
  //       fontCss: [], // Array of URLs for font CSS files
  //       styles: {
  //         // Other style configurations...
  //         base: {}, // Styles for all fields
  //         cv2: {}, // Styles for the cv2 field
  //         cardNumber: {}, // Styles for the card number field
  //         expiryDate: {}, // Styles for the expiry date field
  //         cardName: {}, // Styles for the card name field
  //         cardIcon: {}, // Styles for the card icon
  //         form: {
  //           // Define styles for the form here
  //           // For example:
  //           backgroundColor: 'white',
  //           border: '1px solid #ccc',
  //           padding: '10px',
  //         },
  //         text: {}, // Text configuration to override defaults
  //         onIframeLoaded: () => {}, // Function to be called once the iframe is loaded and configured
  //         onIframeLoadFailed: () => {}, // Function to be called on iframe load error
  //         errorMessages: {}, // Custom validation error messages
  //         callbacks: {}, // Callback functions for various events
  //         billingAddressRequired: false, // Whether to collect the buyer's billing address (true/false)
  //       },
  //       errorMessages: {
  //         cardNameRequired: 'Card name is required.',
  //         cardNameInvalid: 'Invalid card name.',
  //         // Add more error messages for other validation types...
  //       },
  //     };

  //     // Optional callback to handle validation errors
  //     const displayErrorsCallback = (validationErrors) => {
  //       // Handle validation errors here
  //       console.error('Validation Errors:', validationErrors);
  //     };

  //     // Optional callback for onSubmitTriggered
  //     const onSubmitTriggered = () => {
  //       // Handle onSubmitTriggered event if needed
  //     };

  //     // Optional callback for onBlur
  //     const onBlur = () => {
  //       // Handle onBlur event if needed
  //     };

  //     // Initialize an instance of Connect-e Standard
  //     const connectE = new Connect.ConnectE(
  //       config,
  //       displayErrorsCallback,
  //       onSubmitTriggered,
  //       onBlur
  //     );

  //     // Now you can work with the 'connectE' instance as per your requirements
  //   };

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
    </>
  );
}

export default CardForm3;
