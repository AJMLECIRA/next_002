'use client';
import { useState } from 'react';
import { Box, GridItem, Button, Text, FormLabel } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/pro-solid-svg-icons';
import AddressAutocomplete2 from '@/app/components/getBillAddress/page';
import { useSelector, useDispatch } from 'react-redux';
import { setBillingData } from '@/app/redux/slices/configBasketSlice';
import {
  setBillAddError,
  setBillAddSame,
} from '@/app/redux/slices/configSiteSlice';
import SwitchSame from './SwitchSame';
import './summary.css';

export default function BillingAddress({ addressType }) {
  const dispatch = useDispatch();
  const postcode = useSelector((state) => state.basket.deliveryData.postcode);
  const showBillError = useSelector((state) => state.site.BillAddError);
  const postcodeBill = useSelector(
    (state) => state.basket.billingData.postcode
  );
  const deliveryData = useSelector((state) => state.basket.deliveryData);
  const deliveryOK = postcode ? true : false;
  const capitalizedAddressType =
    addressType.charAt(0).toUpperCase() + addressType.slice(1);
  // styling
  const btnStyle = {
    backgroundColor: '#0cc6de',
    color: '#fff',
    borderRadius: '1vw',
    padding: '1vw 1vw',
  };
  const billingOK = postcodeBill ? true : false;
  // same button
  const [sameState, setSameState] = useState('');

  // Define a function to receive and handle the state from SwitchSame
  const handleSwitchState = (switchState) => {
    if (switchState === 'checked') {
      dispatch(setBillAddSame(true));
      same();
    } else {
      dispatch(setBillAddSame(false));
    }
  };

  const same = () => {
    dispatch(setBillingData(deliveryData));
    dispatch(setBillAddError(true));
  };

  return (
    <>
      <GridItem>
        <Box className="formLabel" width="100%">
          <FormLabel className="formLabel">
            <FontAwesomeIcon
              className="formIcon"
              icon={faFileInvoice}
              width="20px"
              color="#00000070"
            />
            {capitalizedAddressType} Address
          </FormLabel>
        </Box>
        <AddressAutocomplete2 addressType={addressType} />
        <Box
          className="errorStyle"
          paddingLeft="2vw"
          width="100%"
          height="100%"
        >
          {!showBillError && <div>Billing Address is Required</div>}
        </Box>
        {!billingOK && (
          <Box
            paddingTop="0.5vw"
            columnGap={'0.5vw'}
            display="flex"
            alignItems={'center'}
          >
            <SwitchSame onSwitchStateChange={handleSwitchState} />
            <Text fontSize="0.7vw" fontWeight={600}>
              Same as Delivery Address
            </Text>
          </Box>
        )}
      </GridItem>
    </>
  );
}
