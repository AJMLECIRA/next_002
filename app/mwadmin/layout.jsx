'use client';
import React from 'react';
import Navbar from './components/Navbar';
import { AuthProvider } from '@/app/mwadmin/AuthContext';
import { Suspense } from 'react';

export default function Adminlayout({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      <Suspense>{children}</Suspense>
    </AuthProvider>
  );
}
