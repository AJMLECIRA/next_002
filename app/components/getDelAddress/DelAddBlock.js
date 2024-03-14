'use client';
import React from 'react';
import useGetOrder from '@/app/hooks/basket/useGetOrder'; // Import your hook

function DelAddBlock({ basketID }) {
  const { order, loading } = useGetOrder(basketID);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }
  const delData = order.delAddInfo;
  // Render the component with the loaded order data
  return (
    <>
      <div>{delData.formatted_address[0] && delData.formatted_address[0]}</div>
      <div>{delData.formatted_address[1] && delData.formatted_address[1]}</div>
      <div>{delData.formatted_address[2] && delData.formatted_address[2]}</div>
      <div>{delData.formatted_address[3] && delData.formatted_address[3]}</div>
      <div>{delData.formatted_address[4] && delData.formatted_address[4]}</div>
    </>
  );
}

export default DelAddBlock;
