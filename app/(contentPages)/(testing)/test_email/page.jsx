'use client';
import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSendEmail } from '@/app/hooks/useSendEmail';
import { useSelector } from 'react-redux';

export default function Page() {
  const { sendEmail } = useSendEmail();
  const orderRef = useSelector((state) => state.basket.basketData.basketID);
  const orderRefShort = orderRef.substring(0, 8);
  const sendTestEmail = () => {
    console.log('Send Test email');
    const dataValues = {
      name: 'Andrew',
      email: 'andrew@mirrorworld.co.uk',
      orderRefShort: orderRefShort,
      attName: 'testPDFS/test5.pdf',
    };
    const emailInfo = {
      type: 'thankYou',
      dynamic: false, // false if static for sendGrid email
      ref: 'd-60e83d5bd3e44574ad2fae4cf24ebe98', // file name git_thanks -- ref for db letter number(dynamic) or sendGrid template id (static)
      values: dataValues, // Make sure values is defined or passed correctly
    };
    sendEmail(emailInfo);
    console.log('loading', emailInfo);
  };

  return (
    <Box p={100}>
      <Button onClick={sendTestEmail}>Send Email</Button>
    </Box>
  );
}
