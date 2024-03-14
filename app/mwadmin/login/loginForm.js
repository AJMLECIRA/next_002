import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
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
} from '@chakra-ui/react';

const inputform = {
  background: 'white',
  width: '25vw',
  border: 0,
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    console.log('attempt logging in');
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await signInWithEmailAndPassword(email, password);
      setRes(response);
    } catch (e) {
      console.log('error logging in');
      console.error(error);
      setError(error.code ? `Error: ${error.code}` : error.message);
      setRes(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (res) {
      router.push('/mwadmin'); // Redirect to a dashboard or another page post-signin
    }
  }, [res, router]);
  return (
    <form onSubmit={handleSubmit} className="signinform">
      <VStack spacing={4}>
        <Heading size="md">Sign In</Heading>
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
        {!isSubmitting && (
          <Button colorScheme="blue" type="submit">
            Sign In
          </Button>
        )}
        {isSubmitting && (
          <Button colorScheme="blue" isLoading>
            Loading
          </Button>
        )}
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </form>
  );
}
