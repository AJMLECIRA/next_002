//get delAddress
'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  setDeliveryData,
  setBillingData,
  resetDeliveryData,
} from '../../redux/slices/configBasketSlice';
import {
  setDelAddError,
  setBillAddError,
} from '@/app/redux/slices/configSiteSlice';
import { useSelector, useDispatch } from 'react-redux';
import '@/app/(contentPages)/(checkout)/summary/summary.css';
import { Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/pro-solid-svg-icons';

function AddressAutocomplete({ addressType }) {
  const billSame = useSelector((state) => state.site.BillAddSame);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [formatAddressBlock, setFormatAddressBlock] = useState([]);
  const [postcodeBlock, setPostcodeBlock] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_GETADDRESS_API_KEY;
  const deliveryData = useSelector((state) => state.basket.deliveryData);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const postcodeDel = useSelector(
    (state) => state.basket.deliveryData.postcode
  );
  const delData = useSelector((state) => state.basket.deliveryData);
  const deliveryOK = postcodeDel ? true : false;

  const SaveAddress = (addressData, addressType) => {
    dispatch(setDeliveryData(addressData));
    if (billSame) {
      dispatch(setBillingData(addressData));
      dispatch(setBillAddError(true));
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdn.getaddress.io/scripts/getaddress-autocomplete-1.1.3.min.js';
    script.async = true;
    script.onload = () => {
      const getAddress = window.getAddress;
      getAddress.autocomplete('address-input1', apiKey, {
        select_on_focus: true,
        id_prefix: 'getAddress-autocomplete',
        //suggestion_class_names: ['delivery'],
      });
    };
    document.body.appendChild(script);
    document.addEventListener(
      'getaddress-autocomplete-address-selected',
      function (e) {
        //console.log(e);
        if (e.target.id.includes('input1')) {
          //console.log('Process Delivery Data');
          let tobeformatted = e.address.formatted_address.toString();
          let formattedAddress = tobeformatted
            .replace(/,+/g, ', ')
            .replace(/,$/, '');
          setSelectedAddress(formattedAddress);
          setFormatAddressBlock(e.address.formatted_address);
          setPostcodeBlock(e.address.postcode);
          SaveAddress(e.address, addressType);
          dispatch(setDelAddError(true));
        }
      }
    );
    return () => script.remove();
  }, [deliveryOK]);

  // Set the input value to the selectedAddress
  const handleInputChange = (e) => {
    const cleanedValue = e.target.value.replace(/,+/g, ',');
    setSelectedAddress(e.target.value);
  };
  const handleChangeDelivery = () => {
    setSelectedAddress('');
    dispatch(resetDeliveryData());
    setFormatAddressBlock('');
    dispatch(setDelAddError(false));
  };

  const handleKeyDown = (e) => {
    // If the Tab key is pressed (key code 9), prevent its default behavior
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      {!deliveryOK && (
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
            id="address-input1"
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
      {deliveryOK && (
        <Box padding="1vw 0 1vw 2vw" fontWeight={600} color="#00000070">
          {deliveryData.formatted_address[0] && (
            <div>{deliveryData.formatted_address[0]}</div>
          )}
          {deliveryData.formatted_address[1] && (
            <div>{deliveryData.formatted_address[1]}</div>
          )}
          {deliveryData.formatted_address[2] && (
            <div>{deliveryData.formatted_address[2]}</div>
          )}
          {deliveryData.formatted_address[3] && (
            <div>{deliveryData.formatted_address[3]}</div>
          )}
          {deliveryData.formatted_address[4] && (
            <div>{deliveryData.formatted_address[4]}</div>
          )}
          {postcodeBlock && (
            <div style={{ marginRight: 'auto' }}>{deliveryData.postcode}</div>
          )}
        </Box>
      )}
      {deliveryOK && (
        <Box paddingLeft="2vw">
          <Button
            className="dkButtonRoundedSlim"
            columnGap="1vw"
            onClick={handleChangeDelivery}
          >
            <FontAwesomeIcon icon={faPen} width="20px" />
            Change Address
          </Button>
        </Box>
      )}
    </>
  );
}

export default AddressAutocomplete;
