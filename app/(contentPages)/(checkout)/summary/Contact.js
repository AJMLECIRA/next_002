'use client';
import { Box, Text, Grid, GridItem, FormLabel, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIdCard,
  faCircleUser,
  faBuildings,
  faEnvelope,
  faPhone,
} from '@fortawesome/pro-regular-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import {
  setName,
  setEmail,
  setCompany,
  setTel,
} from '@/app/redux/slices/configBasketSlice';
import './summary.css';

export default function Contact({ formik }) {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.basket.customerData.fullName);
  const companyName = useSelector(
    (state) => state.basket.customerData.companyName
  );
  const email = useSelector((state) => state.basket.customerData.email);
  const phone = useSelector((state) => state.basket.customerData.phone);

  // Define a custom change handler
  const handleCustomChange = (e) => {
    // console.log('Handle Change Fired');
    // Call Formik's handleChange
    formik.handleChange(e);

    // Dispatch actions to Redux store
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        dispatch(setName(value));
        break;
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'phone':
        dispatch(setTel(value));
        break;
      case 'companyName':
        dispatch(setCompany(value));
        break;
      default:
        // No additional action
        break;
    }
  };

  const isFormValid =
    formik.isValid &&
    !formik.errors.fullName &&
    !formik.errors.email &&
    !formik.errors.phone;

  // styling
  // const formLabel = {
  //   color: '#00000095',
  //   fontWeight: 600,
  //   marginBottom: 0,
  //   fontSize: '1.2vw',
  // };
  const formInput = {
    backgroundColor: 'white',
    borderRadius: '3vw',
    border: 'solid 1px #00000030',
    _placeholder: {
      color: '#00000050',
    },
  };
  const errorStyle = {
    height: '1.5vw',
    width: '100%',
    color: 'red',
    fontSize: '0.8vw',
    display: 'flex',
    justifyContent: 'end',
  };
  //console.log('Formik Values:', formik.values);
  //console.log('Formik Errors:', formik.errors);
  return (
    <>
      <Box className="sectionBox">
        {/* <FontAwesomeIcon className="sectionIcon" icon={faIdCard} /> */}
        <Text className="sectionTitle">Contact Details</Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid templateColumns={'1fr 1fr'} columnGap="20px">
          <GridItem>
            <FormLabel className="formLabel">
              <FontAwesomeIcon className="formIcon" icon={faCircleUser} />
              Full Name
            </FormLabel>
            <Input
              {...formInput}
              name="fullName"
              value={formik.values.fullName}
              onChange={handleCustomChange}
              onBlur={formik.handleBlur}
            />
            <Box {...errorStyle}>
              {formik.touched.fullName && formik.errors.fullName && (
                <div>{formik.errors.fullName}</div>
              )}
            </Box>
          </GridItem>

          <GridItem>
            <FormLabel className="formLabel">
              <FontAwesomeIcon icon={faBuildings} className="formIcon" />
              Company Name
            </FormLabel>
            <Input
              {...formInput}
              name="companyName"
              value={formik.values.companyName}
              onChange={handleCustomChange}
              onBlur={formik.handleBlur}
              placeholder="If applicable"
            />
          </GridItem>
          <GridItem>
            <FormLabel className="formLabel">
              <FontAwesomeIcon icon={faEnvelope} className="formIcon" />
              Email Name
            </FormLabel>
            <Input
              {...formInput}
              name="email"
              value={formik.values.email}
              onChange={handleCustomChange}
              onBlur={formik.handleBlur}
            />
            <Box {...errorStyle}>
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
            </Box>
          </GridItem>
          <GridItem>
            <FormLabel className="formLabel">
              <FontAwesomeIcon icon={faPhone} className="formIcon" />
              Phone
            </FormLabel>
            <Input
              {...formInput}
              name="phone"
              value={formik.values.phone}
              onChange={handleCustomChange}
              onBlur={formik.handleBlur}
            />
            <Box {...errorStyle}>
              {formik.touched.phone && formik.errors.phone && (
                <div>{formik.errors.phone}</div>
              )}
            </Box>
          </GridItem>
        </Grid>
      </form>
    </>
  );
}
