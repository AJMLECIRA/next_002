'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Spacer } from '@chakra-ui/react';
import SvgImage from '@/app/components/svgImage';

export default function page() {
  return (
    <>
      <div>This is a test page</div>
      <Spacer height="100px" />
      <Box
        width="200px"
        height="200px"
        marginLeft={'100px'}
        border="solid 1px blue"
        position="relative"
      >
        <SvgImage src="Glasslight" width="100%" height="100%" fill="#202324" />
      </Box>
      <Spacer height="100px" />
    </>
  );
}
