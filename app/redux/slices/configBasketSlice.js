import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  basketData: {
    basketID: uuidv4(), // Initial basket ID
    startDate: new Date().toISOString(),
    items: [], // Initial array of items
    basketItemsQty: 0,
    basketTotalValue: 0,
  },
  basketItemImg: '',
  deliveryData: {
    basketID: '', // Initial basket ID
    lng: '',
    lat: '',
    formatted_Address: [],
    postcode: '',
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    county: '',
    district: '',
    town_or_city: '',
    residential: '',
    buildingName: '',
  },
  billingData: {
    basketID: '', // Initial basket ID
    lng: '',
    lat: '',
    formatted_Address: [],
    postcode: '',
    line1: '',
    line2: '',
    line3: '',
    line4: '',
    county: '',
    district: '',
    town_or_city: '',
    residential: '',
    buildingName: '',
  },
  delMethod: 'collect',
  delCost: 0,
  basketOrderValue: 0,
  customerData: {
    fullName: '',
    companyName: '',
    email: '',
    phone: 0,
  },
  payMethod: 'paymentsense',
};
// items that can be imported by components
export const selectBasketItemsQty = (state) =>
  state.basket.basketData.basketItemsQty;

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketID: (state, action) => {
      state.basketData.basketID = action.payload;
    },
    setStartDate: (state, action) => {
      state.basketData.startDate = action.payload;
    },
    setName: (state, action) => {
      state.customerData.fullName = action.payload;
    },
    setCompany: (state, action) => {
      state.customerData.companyName = action.payload;
    },
    setEmail: (state, action) => {
      state.customerData.email = action.payload;
    },
    setTel: (state, action) => {
      state.customerData.phone = action.payload;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setItems: (state, action) => {
      state.basketData.items = action.payload;
    },
    setBasketItemsQty: (state, action) => {
      state.basketData.basketItemsQty = action.payload;
    },
    setTotalValue: (state, action) => {
      state.basketData.basketTotalValue = action.payload;
    },
    setBasketItemImg: (state, action) => {
      state.basketItemImg = action.payload;
    },
    setDelMethod: (state, action) => {
      state.delMethod = action.payload;
    },
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
    setBillingData: (state, action) => {
      state.billingData = action.payload;
    },
    setDelCost: (state, action) => {
      state.delCost = action.payload;
    },
    setBasketOrderValue: (state, action) => {
      state.basketOrderValue = action.payload;
    },
    setPayMethod: (state, action) => {
      state.payMethod = action.payload;
    },
    //Action to add an item to the basket
    addItemToBasket: (state, action) => {
      const { item } = action.payload;
      state.basketData.items.push(item);
    },
    // Action to remove an item from the basket
    removeItemFromBasket: (state, action) => {
      const itemId = action.payload;
      const index = state.basketData.items.findIndex(
        (item) => item.id === itemId
      );
      if (index !== -1) {
        state.basketData.items.splice(index, 1);
      }
      state.basketItemsQty = action.payload;
    },
    changeItemQuantity: (state, action) => {
      const { itemId, qty } = action.payload;
      const itemIndex = state.basketData.items.findIndex(
        (item) => item.id === itemId
      );
      console.log(itemId, qty);
      if (itemIndex !== -1 && qty != 0) {
        state.basketData.items[itemIndex].qty = Math.max(
          1,
          state.basketData.items[itemIndex].qty + qty
        );
      }
    },
    // Action to clear a basket
    clearBasket: (state, action) => {
      state.basketData.items = [];
    },
    resetDeliveryData: (state) => {
      state.deliveryData = {
        // reset to initial state or empty values
      };
    },
    resetBillingData: (state) => {
      state.billingData = {
        // reset to initial state or empty values
      };
    },
    resetDelMethod: (state) => {
      state.delMethod = 'fedex';
    },
    resetDelCost: (state) => {
      state.delCost = 0;
    },
    resetBasketOrderValue: (state) => {
      state.basketOrderValue = 0;
    },
    resetName: (state) => {
      state.companyData.name = '';
    },
    resetCompany: (state) => {
      state.companyData.company = '';
    },
    resetEmail: (state) => {
      state.companyData.email = '';
    },
    resetTel: (state) => {
      state.companyData.tel = 0;
    },
    resetPayMethod: (state) => {
      state.payMethod = 'paymentsense';
    },
  },
});

// Export actions
export const {
  addItemToBasket,
  removeItemFromBasket,
  clearBasket,
  setBasketID,
  setStartDate,
  setItems,
  setName,
  setEmail,
  setCompany,
  setTel,
  setCustomerData,
  changeItemQuantity,
  setBasketItemsQty,
  setBasketItemImg,
  setTotalValue,
  setBasketOrderValue,
  setDeliveryData,
  setBillingData,
  setDelMethod,
  setDelCost,
  setPayMethod,
  resetDeliveryData,
  resetBillingData,
  resetDelMethod,
  resetName,
  resetEmail,
  resetCompany,
  resetTel,
  resetPayMethod,
} = basketSlice.actions;

// Export the reducer
export default basketSlice.reducer;
