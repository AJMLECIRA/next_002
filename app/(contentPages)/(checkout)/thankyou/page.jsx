'use client';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams hook
import { Box, Button, Center } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function ThankYouPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get('redirect_status'); // Access redirect_status from URL
  const orderRef = useSelector((state) => state.basket.basketData.basketID);
  const clientName = useSelector((state) => state.basket.customerData.fullName);
  const orderRefShort = orderRef.substring(0, 8);
  if (redirectStatus === 'failed') {
    router.push('/summary');
  }
  return (
    <>
      {redirectStatus === 'failed' ? (
        <Box b>Payment failed. Please try again.</Box>
      ) : (
        <Center
          width="100vw"
          backgroundImage={`url('/images/thankyou-5x2.jpg')`}
          backgroundSize="cover"
          backgroundPosition="center"
          height="70vh"
          margin="-100"
          marginBottom="-100"
        >
          <Center flexDirection={'column'} width="80%">
            <Box
              fontSize={{
                base: '5vw',
                sm: '4.25vw',
                md: '3.75vw',
                lg: '3vw',
              }}
              fontWeight="700"
              color="#00000090"
            >
              Thank you, {clientName}
            </Box>
            <Box
              mt="4"
              fontSize={{
                base: '3.2vw',
                sm: '2.4vw',
                md: '1.6vw',
                lg: '1.2vw',
              }}
            >
              Your order reference is:{' '}
              <span style={{ fontWeight: 'bold' }}>{orderRefShort}</span>
            </Box>
            <Box
              mb="4"
              fontSize={{
                base: '3.2vw',
                sm: '2.4vw',
                md: '1.6vw',
                lg: '1.2vw',
              }}
            >
              You should receive your email confirmation shortly
            </Box>
            <Button className="mwButtonRoundedSm">
              Explore our latest designs
            </Button>
          </Center>
        </Center>
      )}
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Box padding="100px">
      <Suspense fallback={<div>Loading...</div>}>
        <ThankYouPageContent />
      </Suspense>
    </Box>
  );
}
