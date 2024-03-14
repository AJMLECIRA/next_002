// testsPS
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button } from '@chakra-ui/react';

const Payment = () => {
  const [response, setResponse] = useState('');

  const makeApiRequest = async () => {
    const url = 'https://e.test.connect.paymentsense.cloud/v1/access-tokens';
    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25uZWN0LWUtZGV2QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vZS50ZXN0LmNvbm5lY3QucGF5bWVudHNlbnNlLmNsb3VkIiwiZXhwIjoyMzgzMDQ4NDAxLCJpYXQiOjE2MjYxODQ0MDEsInN1YiI6ImNvbm5lY3QtZS1kZXZAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwiYXBpS2V5IjoiMTM3ODQyOGMtYTMxNC00NTA5LWFjYTEtNmRhY2EzNGNiM2QyIiwiZW1haWwiOiJjb25uZWN0LWUtZGV2QGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.IKX_Kou8grA5_UTkiC4wREq8yYL4gj1W9UG6lXArlm_DQiv1eL26kMfsbzN3dfUWO-H7BJHs8zMX-EN2fXocNq16aUTrdLHtSczVSLbt8kizHcVsOMYotW3syw897vpXJBDe2xWihKMBrr6P1uBFKnx_bDeMR67wvE3-5XIh_zV9hteFneuN9QmEW-QyGEJ9RpyKwrpGKU60SPYM1WO_6L72CgkxSATLwHThsEnUQCsZoOZc058lHzjyVww0T_y7QLYsooXQo2WJy5TIunE3xjf6srZnE6yeQu_0wouUJ_m64y9lmlUNXGzAzNvmgfnDZ1IqhWdfVDiIE6ZOa__H4w',
      'Content-Type': 'application/json',
    };
    const data = {
      merchantUrl: 'https://demo-dot-connect-e-build-non-pci.appspot.com',
      currencyCode: '826',
      amount: '12345',
      transactionType: 'SALE',
      orderId: 'Order_ID_HERE',
      orderDescription: 'order_desc_here',
      merchantTransactionId: 'Basket_ID_here',
      webHookUrl: 'https://events.hookdeck.com/e/src_AtC4wEn8r1QW',
    };

    try {
      const response = await axios.post(url, data, { headers });
      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResponse(
        `Error: ${error.response ? error.response.data : error.message}`
      );
    }
  };

  return (
    <Box padding="100px">
      <h1>Paymentsense Info</h1>
      <Button onClick={makeApiRequest}>Make API Request</Button>
      <div>
        <h2>API Response:</h2>
        <pre>{response}</pre>
      </div>
    </Box>
  );
};

export default Payment;
