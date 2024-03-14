'use client';
import React from 'react';
import MyDocument from './react_pdf';
import { Box, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function Page() {
  return (
    <>
      <Box p="100" display={'flex'} flexDirection={'column'} gap="10">
        {/* Render the document preview here */}
        <MyDocument />
        {/* Use PDFDownloadLink to provide a download link */}
        <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </Box>
    </>
  );
}
