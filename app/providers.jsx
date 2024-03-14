// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme"; // Adjust the import path as needed

export function Providers({ children }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
