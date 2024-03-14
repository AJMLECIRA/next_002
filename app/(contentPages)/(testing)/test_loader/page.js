'use client';
import React from 'react';
import useGetDBFieldQuery from '@/app/hooks/useGetDBFieldQuery';
import { Spacer } from '@chakra-ui/react';

export default function Page() {
  const {
    data: glassData,
    loading,
    error,
  } = useGetDBFieldQuery('allGlass', 'type', 'Tinted');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(glassData);
  return (
    <>
      <Spacer height="100" />
      <div background="#0cc6de">Test Data page</div>
      {glassData &&
        glassData.map((glass) => <div key={glass.id}>{glass.MWName}</div>)}
    </>
  );
}
