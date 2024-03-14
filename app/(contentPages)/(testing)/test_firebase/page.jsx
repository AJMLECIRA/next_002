// pages/test-firebase.js
'use client';
// pages/test-firebase.js

import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { app } from '../../../firebase/config';
import { getStorage } from 'firebase/storage';

const storage = getStorage(app);

const TestFirebasePage = () => {
  return (
    <Box p="100">
      <h1>Testing Page</h1>
    </Box>
  );
};
export default TestFirebasePage;
