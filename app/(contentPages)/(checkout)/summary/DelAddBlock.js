import React from 'react';
import { useSelector } from 'react-redux';

function DelAddBlock() {
  const delAdd = useSelector((state) => state.basket.deliveryData);
  // Render the component with the loaded order data
  return (
    <>
      {delAdd && (
        <>
          <div>
            {delAdd.formatted_address[0] && delAdd.formatted_address[0]}
          </div>
          <div>
            {delAdd.formatted_address[1] && delAdd.formatted_address[1]}
          </div>
          <div>
            {delAdd.formatted_address[2] && delAdd.formatted_address[2]}
          </div>
          <div>
            {delAdd.formatted_address[3] && delAdd.formatted_address[3]}
          </div>
          <div>
            {delAdd.formatted_address[4] && delAdd.formatted_address[4]}
          </div>
          <div>{delAdd.postcode && delAdd.postcode}</div>
        </>
      )}
    </>
  );
}

export default DelAddBlock;
