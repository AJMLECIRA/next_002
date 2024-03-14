// useBasketTotalCalculator.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBasketItemsQty,
  setTotalValue,
} from '@/app/redux/slices/configBasketSlice';

const useBasketTotalCalculator = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => state.basket.basketData.items);

  useEffect(() => {
    // Calculate the total quantity of items in the basket
    const totalItems = basketItems.reduce((total, item) => total + item.qty, 0);

    // Dispatch the total quantity to the Redux store
    dispatch(setBasketItemsQty(totalItems));

    // Calculate the total value using the calculateTotalValue function
    const totalValue = basketItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    // Dispatch the total value to the Redux store
    dispatch(setTotalValue(totalValue));
  }, [basketItems, dispatch]);
};

export default useBasketTotalCalculator;
