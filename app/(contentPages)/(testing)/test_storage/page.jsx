// pages/test-storage.js
'use client';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const TestStoragePage = () => {
  return (
    <div>
      <h1>Testing Firebase Storage Access</h1>
      <p>Check the browser console for output.</p>
    </div>
  );
};

export default TestStoragePage;
