// Redux for controlling all visuals about the site such as open drawer and visible options etc
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketDrawer: false,
  DelAddError: true,
  BillAddError: true,
  BillAddSame: false,
  PSToken: '',
  paymentMessage: '',
};
// items that can be imported by components
// --- example ---
// export const selectBasketItemsQty = (state) =>
//  state.basket.basketData.basketItemsQty;

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setBasketDrawer: (state, action) => {
      state.basketDrawer = action.payload;
    },
    setDelAddError: (state, action) => {
      state.DelAddError = action.payload;
    },
    setBillAddError: (state, action) => {
      state.BillAddError = action.payload;
    },
    setBillAddSame: (state, action) => {
      state.BillAddSame = action.payload;
    },
    setPSToken: (state, action) => {
      state.PSToken = action.payload;
    },
    setPaymentMessage: (state, action) => {
      state.paymentMessage = action.payload;
    },
    // Reset
    resetDelAddError: (state) => {
      state.mirrorMaterialRad2 = true;
    },
    resetBillAddError: (state) => {
      state.mirrorMaterialRad2 = true;
    },
    resetPSToken: (state, action) => {
      state.PSToken = '';
    },
    ressetPaymentMessage: (state, action) => {
      state.paymentMessage = '';
    },
  },
});

// Export actions
export const {
  setBasketDrawer,
  setBillAddError,
  setDelAddError,
  setBillAddSame,
  setPSToken,
  setPaymentMessage,
} = siteSlice.actions;

// Export the reducer
export default siteSlice.reducer;
