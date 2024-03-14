import React from 'react';
import Quote from '@/app/components/calc/Quote';

export default function CreatePrice() {
  const retail = Quote();
  return <>{retail}</>;
}
