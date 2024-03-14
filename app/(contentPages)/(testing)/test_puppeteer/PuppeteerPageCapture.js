// Import React and necessary components from Chakra UI
'use client';
import React from 'react';
import { Box, Button } from '@chakra-ui/react';

function CapturePageButton() {
  const capturePage = async () => {
    // #### Test ####
    const targetUrl = encodeURIComponent(
      'http://localhost:3000/invoice?basketId=6b8c5cfc-bbb0-446b-bb52-6e074523d0ce'
    );
    try {
      // Fetch the PDF from the API endpoint
      const response = await fetch(`/api/pdf/capturePage?url=${targetUrl}`);
      if (response.ok) {
        // Convert the response to a Blob if the request was successful
        const pdfBlob = await response.blob();
        // Create a URL for the PDF Blob and open it in a new tab
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      } else {
        // Alert the user if the fetch request failed
        alert('Failed to capture page.');
      }
    } catch (error) {
      // Log and alert the user of any errors
      console.error('Error capturing page:', error);
      alert('An error occurred while capturing the page.');
    }
  };

  return (
    <Box p="100">
      <h1>Capture Web Page Using Puppeteer</h1>
      <Button onClick={capturePage}>Capture Page</Button>
    </Box>
  );
}

export default CapturePageButton;
