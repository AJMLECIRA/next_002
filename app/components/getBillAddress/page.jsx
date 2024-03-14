//get billAddress
'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  setBillingData,
  resetBillingData,
} from '../../redux/slices/configBasketSlice';
import {
  setBillAddError,
  setBillAddSame,
} from '@/app/redux/slices/configSiteSlice';
import { useDispatch, useSelector } from 'react-redux';
import '@/app/(contentPages)/(checkout)/summary/summary.css';
import { Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/pro-solid-svg-icons';

function AddressAutocomplete2({ addressType }) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [formatAddressBlock, setFormatAddressBlock] = useState([]);
  const [postcodeBlock, setPostcodeBlock] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_GETADDRESS_API_KEY;
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const postcodeBill = useSelector(
    (state) => state.basket.billingData.postcode
  );
  const billingData = useSelector((state) => state.basket.billingData);
  const billingOK = postcodeBill ? true : false;
  const SaveAddress = (addressData, addressType) => {
    dispatch(setBillingData(addressData));
  };

  useEffect(() => {
    //console.log('Running BILLING script again');
    const script = document.createElement('script');
    script.src =
      'https://cdn.getaddress.io/scripts/getaddress-autocomplete-1.1.3.min.js';
    script.async = true;
    script.onload = () => {
      const getAddress = window.getAddress;
      getAddress.autocomplete('address-input2', apiKey, {
        select_on_focus: true,
        //suggestion_class_names: ['billing'],
      });
    };
    document.body.appendChild(script);
    document.addEventListener(
      'getaddress-autocomplete-address-selected',
      function (e) {
        if (e.target.id.includes('input2')) {
          //console.log('Process Billing Data');
          let tobeformatted = e.address.formatted_address.toString();
          let formattedAddress = tobeformatted
            .replace(/,+/g, ', ')
            .replace(/,$/, '');
          setSelectedAddress(formattedAddress);
          setFormatAddressBlock(e.address.formatted_address);
          setPostcodeBlock(e.address.postcode);
          SaveAddress(e.address, addressType);
          dispatch(setBillAddError(true));
        }
      }
    );
    return () => script.remove();
  }, [billingOK]);

  // Set the input value to the selectedAddress
  const handleInputChange = (e) => {
    const cleanedValue = e.target.value.replace(/,+/g, ',');
    setSelectedAddress(e.target.value);
  };
  const handleChangeBilling = () => {
    setSelectedAddress('');
    dispatch(resetBillingData());
    setFormatAddressBlock('');
    dispatch(setBillAddError(false));
    dispatch(setBillAddSame(false));
  };

  const handleKeyDown = (e) => {
    // If the Tab key is pressed (key code 9), prevent its default behavior
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
    }
  };
  //console.log('showBillInput ', showBillInput);
  //console.log('postcodeBill ', postcodeBill);
  //console.log('billingOK ', billingOK);
  //console.log('formatAddressBlock ', formatAddressBlock);
  //console.log('billingData ', billingData);
  //console.log('billingData.formatted_address ', billingData.formatted_address);

  return (
    <>
      {!billingOK && (
        <Box
          borderWidth="1px"
          borderRadius="3vw"
          border="solid 1px #00000030"
          backgroundColor={'white'}
          p="0.5vw 1.5vw"
          cursor="text"
          _hover={{ borderColor: 'blue.300' }}
          _focus={{ borderColor: 'blue.500' }}
        >
          <input
            type="text"
            id="address-input2"
            style={{ border: 'solid 0 white', outline: 'none' }}
            value={selectedAddress}
            onChange={handleInputChange}
            placeholder="Start typing your address or postcode"
            onKeyDown={handleKeyDown}
            width="100%"
            ref={inputRef}
          />
        </Box>
      )}
      {billingData.formatted_address && (
        <>
          <Box padding="1vw 0 1vw 2vw" fontWeight={600} color="#00000070">
            {billingData.formatted_address[0] && (
              <div>{billingData.formatted_address[0]}</div>
            )}
            {billingData.formatted_address[1] && (
              <div>{billingData.formatted_address[1]}</div>
            )}
            {billingData.formatted_address[2] && (
              <div>{billingData.formatted_address[2]}</div>
            )}
            {billingData.formatted_address[3] && (
              <div>{billingData.formatted_address[3]}</div>
            )}
            {billingData.formatted_address[4] && (
              <div>{billingData.formatted_address[4]}</div>
            )}
            {postcodeBlock && (
              <div style={{ marginRight: 'auto' }}>{billingData.postcode}</div>
            )}
          </Box>
          <Box paddingLeft="2vw">
            <Button
              className="dkButtonRoundedSlim"
              columnGap="1vw"
              onClick={handleChangeBilling}
            >
              <FontAwesomeIcon icon={faPen} width="20px" />
              Change Address
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default AddressAutocomplete2;
