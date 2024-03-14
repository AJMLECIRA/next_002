import { Box, FormLabel, GridItem, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-solid-svg-icons';
import AddressAutocomplete from '@/app/components/getDelAddress/page';
import { useSelector } from 'react-redux';
import './summary.css';

export default function DeliveryAddress({ addressType }) {
  const showDelError = useSelector((state) => state.site.DelAddError);

  const capitalizedAddressType =
    addressType.charAt(0).toUpperCase() + addressType.slice(1);

  return (
    <>
      <GridItem>
        <Box width="100%">
          <FormLabel className="formLabel">
            <FontAwesomeIcon
              className="formIcon"
              icon={faLocationDot}
              width="20px"
              color="#00000070"
            />
            {capitalizedAddressType} Address
          </FormLabel>
        </Box>
        <AddressAutocomplete addressType={addressType} />
        {!showDelError && (
          <Box className="errorStyle" paddingLeft="2vw" width="100%">
            Delivery Address is Required
          </Box>
        )}
      </GridItem>
    </>
  );
}
