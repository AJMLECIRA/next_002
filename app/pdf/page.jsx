'use client';
import React from 'react';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import generatePDF from './generatePDF';
import generateAndSavePDF from './generateAndSavePDF';
import generateWebpagePDF from './generateWebpagePDF';
import generateWebpageSaveLocalPDF from './generateWebpageSaveLocalPDF';
import generateWebpageSaveStoragePDF from './generateWebpageSaveStoragePDF';

export default function Page() {
  return (
    <Flex p="4" gap="4" flexDirection="column">
      <Button onClick={generatePDF} width="300px">
        Generate PDF
      </Button>
      <Button onClick={generateAndSavePDF} width="300px">
        Generate and Save PDF
      </Button>
      <Spacer />
      <Spacer />
      <Button onClick={generateWebpagePDF} width="300px">
        Generates PDF from Web Page
      </Button>
      <Button onClick={generateWebpageSaveLocalPDF} width="500px">
        Generates PDF from Web Page & Save to local Drive
      </Button>
      <Spacer />
      <Spacer />
      <Button onClick={generateWebpageSaveStoragePDF} width="500px">
        Generates PDF from Web Page & Save to Firebase Storage
      </Button>
    </Flex>
  );
}
