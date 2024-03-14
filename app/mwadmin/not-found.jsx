import React from 'react';
import Link from 'next/link';
import { Center, Box, Text, Flex } from '@chakra-ui/react';
import '../styles/globals.css';

export default function Notfound() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Center className="title">There was an admin problem.</Center>
      <Center className="para">
        We could not find the page you were looking for.
      </Center>{' '}
      <Center className="para">
        Go back to <Link href="/mwadmin">&nbsp;Home</Link>
      </Center>
    </Flex>
  );
}
