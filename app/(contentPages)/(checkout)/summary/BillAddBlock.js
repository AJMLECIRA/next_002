import React from 'react';
import { useSelector } from 'react-redux';

function BillAddBlock() {
  const billAdd = useSelector((state) => state.basket.deliveryData);
  // Render the component with the loaded order data
  return (
    <>
      {billAdd && (
        <>
          <div>
            {billAdd.formatted_address[0] && billAdd.formatted_address[0]}
          </div>
          <div>
            {billAdd.formatted_address[1] && billAdd.formatted_address[1]}
          </div>
          <div>
            {billAdd.formatted_address[2] && billAdd.formatted_address[2]}
          </div>
          <div>
            {billAdd.formatted_address[3] && billAdd.formatted_address[3]}
          </div>
          <div>
            {billAdd.formatted_address[4] && billAdd.formatted_address[4]}
          </div>
          <div>{billAdd.postcode && billAdd.postcode}</div>
        </>
      )}
    </>
  );
}

export default BillAddBlock;
