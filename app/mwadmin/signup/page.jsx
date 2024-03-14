'use client';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Heading,
  VStack,
  Center,
  Box,
} from '@chakra-ui/react';

const inputform = {
  background: 'white',
  width: '25vw',
  border: 0,
};

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for tracking submission status
  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submission
    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res.user) {
        await updateProfile(res.user, { displayName });
        setEmail('');
        setPassword('');
        setDisplayName('');
        setError(null);
        setUser(res.user);
      } else {
        // Handle the case when res is null or undefined
        setError('Failed to create user. No further details provided.');
      }

      // add display name to user
      // await updateProfile(user, { displayName });
    } catch (e) {
      console.error(e);
      setError(e.message);
      setUser(null);
    }
    setIsSubmitting(false); // End submission
  };

  React.useEffect(() => {
    console.error(user);
    if (user !== null) {
      const redirectTimeout = setTimeout(() => {
        router.push('/mwadmin/login');
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [user, router]);

  return (
    <Center>
      <Box
        border="solid 1px #999"
        width="flex"
        padding="3vw"
        marginTop="80px"
        background="rgba(12, 198, 222, 0.15)"
        borderRadius="1.5vw"
      >
        <form onSubmit={handleSubmit} className="signupform">
          <VStack spacing={4}>
            <Heading size="md">Sign Up</Heading>

            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ ...inputform }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password:</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ ...inputform }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="displayName">Display Name:</FormLabel>
              <Input
                id="displayName"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                style={{ ...inputform }}
              />
            </FormControl>

            {!isSubmitting && (
              <Button colorScheme="blue" type="submit">
                Sign Up
              </Button>
            )}

            {isSubmitting && ( // Conditional rendering based on isSubmitting
              <Button colorScheme="blue">Loading</Button>
            )}

            {error && (
              <Text color="red.500" width="25vw">
                {error}
              </Text>
            )}
          </VStack>
        </form>
      </Box>
    </Center>
  );
}
