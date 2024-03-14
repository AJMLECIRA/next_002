'use client';
import { Montserrat } from 'next/font/google';
import './styles/globals.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Providers } from './providers';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
const montserrat = Montserrat({ subsets: ['latin'] });
// export const metadata = {
//   title: 'Mirrorworld Home of Bespoke Mirrors',
//   description: 'Made to Measure Mirrors',
// };
const customTheme = extendTheme({
  fonts: {
    body: `'montserrat', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: `'Montserrat', sans-serif`,
        backgroundImage:
          props.colorMode === 'light'
            ? 'linear-gradient(to right, #ffffff, rgba(237,237,237,1.0))'
            : 'linear-gradient(to right, #ffffff, #ffffff)',
      },
    }),
  },
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider store={store}>
          <ChakraProvider theme={customTheme}>
            <Providers>{children}</Providers>
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
