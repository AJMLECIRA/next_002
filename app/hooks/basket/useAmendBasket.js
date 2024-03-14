// useAmendBasket.js
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addItemToBasket,
  removeItemFromBasket,
  clearBasket,
  changeItemQuantity,
} from '@/app/redux/slices/configBasketSlice';

// Handles the redux dat afor the basket items

const useAmendBasket = () => {
  // console.log('use Amend Basket .js');
  const dispatch = useDispatch();
  const handleAddItem = (existingBasketId, newItem) => {
    // console.log('Item Added');
    newItem.id = uuidv4();
    // console.log(newItem);
    //const newItem = { id: uuidv4(), name: 'New Item', price: 22.99, qty: 1 };
    dispatch(addItemToBasket({ basketId: existingBasketId, item: newItem }));
  };
  const handleDeleteItem = (itemId) => {
    dispatch(removeItemFromBasket(itemId));
  };
  const handleClearBasket = () => {
    dispatch(clearBasket());
  };
  const handleQuantity = (itemId, qty) => {
    // console.log('change qty :', qty);
    dispatch(changeItemQuantity({ itemId: itemId, qty: qty }));
  };
  // You can add more functions like handleDeleteItem, handleQuantity here

  return {
    handleAddItem,
    handleDeleteItem,
    handleClearBasket,
    handleQuantity,
  };
};

export default useAmendBasket;
