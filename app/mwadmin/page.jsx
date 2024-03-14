import React from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

export default function AdminHome() {
  return (
    <Center>
      <Flex flexDirection={'column'}>
        <Text align="center">Welcome to Mirrorworld Admin</Text>
        <Text align="center">Choose action from menu.</Text>
      </Flex>
    </Center>
  );
}
