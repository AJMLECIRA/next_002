import { configureStore } from '@reduxjs/toolkit';
import glassTypeReducer from './slices/configGlassSlice';
import configureSizeReducer from '../redux/reducers/configureSizeReducer';
import basketReducer from './slices/configBasketSlice'; // Import your basket slice
import quoteReducer from './slices/configQuoteSlice'; // Import your basket slice
import siteReducer from './slices/configSiteSlice'; // Import your basket slice

export const store = configureStore({
  reducer: {
    configGlass: glassTypeReducer,
    configSize: configureSizeReducer,
    basket: basketReducer,
    quote: quoteReducer,
    site: siteReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],

  devTools: process.env.NODE_ENV !== 'production',
});
