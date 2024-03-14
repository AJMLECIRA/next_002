import React from 'react';
import { Suspense } from 'react';

async function TestSuspense() {
  console.log('Running Suspense test');
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function test() {
  TestSuspense();
  return (
    <Suspense>
      <div>test</div>
    </Suspense>
  );
}
