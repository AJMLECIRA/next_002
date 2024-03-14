import React from 'react';
import { Spacer, Text } from '@chakra-ui/react';
import Hero from './components/Hero';
import DesignYourOwn from './components/DesignYourOwn';
import DeptGrid from './components/DeptGrid';
import Credentials from './components/Credentials';
import GitFormBanner from './components/GitFormBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Mirrorworld Home of Bespoke Mirrors',
  description: 'Made to Measure Mirrors',
};

export default function page() {
  return (
    <>
      <Navbar />
      <Spacer />
      <Hero />
      <DesignYourOwn />
      <DeptGrid />
      <Credentials />
      <GitFormBanner />
      <Footer />
    </>
  );
}
