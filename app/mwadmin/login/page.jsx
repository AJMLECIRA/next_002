'use client';
import React, { useState } from 'react';
import LoginForm from './loginForm';
import { Center, Box } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <Center>
      <Box
        border="solid 1px #999"
        padding="3vw"
        marginTop="80px"
        background="rgba(12, 198, 222, 0.15)"
        borderRadius="1.5vw"
      >
        <LoginForm />
      </Box>
    </Center>
  );
}
