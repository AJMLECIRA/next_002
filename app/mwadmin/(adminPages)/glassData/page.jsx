'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Center } from '@chakra-ui/react'; // Import Chakra UI components
import { BasicTable } from './BasicTable';

export default function GlassList() {
  return (
    <>
      <Center style={{ fontSize: '2vw', fontWeight: '600', color: '#616161' }}>
        Glass Data
      </Center>
      <BasicTable />
    </>
  );
}
