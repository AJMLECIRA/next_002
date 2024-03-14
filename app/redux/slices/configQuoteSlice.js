import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quoteData: {
    basketID: '', // Initial basket ID
    basketItemID: '', // Initial basket ID
    startDate: new Date().toISOString(),
    itemsQty: 1, // Initial qty items
    glassInfo: {},
    frameInfo: {},
  },
  delCostData: {
    post: 7.5, // Initial basket ID
    fedex: 20.0,
    IOW: 60.0,
    IOM: 100.0,
    lNI: 100.0,
    highlands: 70.0,
    whiteGlove: 35.0,
  },
};
// items that can be imported by components
export const delCostData = (state) => state.quote.delCostData;

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setBasketID: (state, action) => {
      state.quoteData.basketID = action.payload;
    },
    setBasketItemID: (state, action) => {
      state.quoteData.basketID = action.payload;
    },
    setStartDate: (state, action) => {
      state.quoteData.startDate = action.payload;
    },
    setItems: (state, action) => {
      state.quoteData.items = action.payload;
    },
    setItemsQty: (state, action) => {
      state.quoteData.itemsQty = action.payload;
    },
    setGlassInfo: (state, action) => {
      state.quoteData.glassInfo = action.payload;
    },
    setFrameInfo: (state, action) => {
      state.quoteData.frameInfo = action.payload;
    },
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
  },
});

// Export actions
export const {
  setBasketID,
  setBasketItemID,
  setStartDate,
  setItems,
  setItemsQty,
  setGlassInfo,
  setFrameInfo,
  setDeliveryData,
} = quoteSlice.actions;

// Export the reducer
export default quoteSlice.reducer;
