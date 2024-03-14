// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

if (process.env.NEXT_PUBLIC_SUPPRESS_GRAMMARLY_WARNINGS === 'true') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0].includes('data-new-gr-c-s-check-loaded') ||
      args[0].includes('data-gr-ext-installed')
    ) {
      return;
    }
    originalWarn(...args);
  };
}
