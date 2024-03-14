"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { db } from "../firebase"; // Adjust the path
import { collection, addDoc } from "firebase/firestore";
import { useSendEmail } from "../hooks/useSendEmail";
import { errorMsg } from "../styles/forms.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  phone: Yup.string()
    .transform((value) => (value ? value.replace(/[^0-9]/g, "") : ""))
    .test("is-number", "Must be a valid Phone Number", (value) => !isNaN(value))
    .matches(/^[0-9]{10,11}$/, "Must be a valid UK Phone Number")
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

// these values can be implemented or deleted for each instance of a form, here they are only for testing
// but could be used when coming back to a form with data already saved..
const savedValues = {
  name: "Andrew",
  email: "andrew@mirrorworld.co.uk",
  phone: "07738922826",
  message: "This is my automated saved values",
};

// Only submits when formik is happy with the form
const onSubmit = (values, onSubmitProps, sendEmail) => {
  console.log("Submitted");
  console.log("Form Data :", values);
  console.log("submit props :", onSubmitProps);

  //   // Save data to Firestore
  addDoc(collection(db, "gitForms"), values)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      // Reset form after a successful form submission
      onSubmitProps.setSubmitting(false);
      onSubmitProps.setValues(initialValues);
      onSubmitProps.setTouched({});
      // Now, send the email
      // Details that go to the hook
      const emailInfo = {
        type: "thankYou",
        dynamic: false, // false if static for sendGrid email
        ref: "d-5338640ce0e64295a2dbff99f60dbb6f", // file name git_thanks -- ref for db letter number(dynamic) or sendGrid template id (static)
        values: values,
      };
      sendEmail(emailInfo);
      // show popop with success
      // to be added as a component using chakra
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      onSubmitProps.setSubmitting(false);
    });
};
const CustomInputComponent = ({ field, form, ...props }) => {
  const handlePhoneChange = (e) => {
    if (field.name === "phone") {
      const cleaned = e.target.value.replace(/[^0-9]/g, "");
      form.setFieldValue(field.name, cleaned, true);
    } else {
      form.setFieldValue(field.name, e.target.value);
    }
  };
  return <Input {...field} {...props} onChange={handlePhoneChange} />;
};

// Creates a Custom Label to add an asterisk to required label names
const CustomLabel = ({ name, children }) => {
  const isRequired = validationSchema.fields[name]?.tests.some(
    (test) => test.OPTIONS.name === "required"
  );

  return (
    <FormLabel
      htmlFor={name}
      fontWeight='1vw'
      fontSize={{ base: "3vw", sm: "2.5vw", md: "1vw" }}
      height={{ base: "4vw", md: "2vw" }}
      paddingTop={{ base: "0vw", sm: "1vw", md: "0.5vw" }}
      margin={{ base: "1vw", md: "0vw" }}
    >
      {children}
      {isRequired && (
        <span
          style={{
            color: "#ccc",
            paddingLeft: "5px",
            fontSize: "1.0em",
            textTransform: "capitalize",
          }}
        ></span>
      )}
    </FormLabel>
  );
};

function GitForm() {
  // invoke the sendEmail Hook
  const { sendEmail, loading, error, success } = useSendEmail();
  // if Present use formValues
  const [formValues, setFormValues] = useState(null);
  const showSpacer = useBreakpointValue({ base: true, md: false });
  const commonFieldProps = {
    bgColor: "white",
    borderRadius: { base: "3vw", sm: "2vw", md: "1vw" },
    height: { base: "10vw", sm: "7vw", md: "3.5vw" },
    fontSize: { base: "3vw", sm: "2vw", md: "1vw" },
    width: "100%",
  };

  return (
    <Box width='100%' padding='0 5vw' height='100%'>
      <Flex flexDirection={"column"} justifyContent='center' height='100%'>
        <Box
          fontSize={{ base: "6vw", md: "3vw" }}
          paddingTop={{ base: "10vw", md: "0vw" }}
          fontWeight='bold'
          width='100%'
          textAlign='center'
          color='white'
          height='auto'
        >
          Get in Touch
        </Box>
        {showSpacer && <Spacer />}
        <Formik
          // if formValues present use formValues if not, use initialValues
          initialValues={formValues || initialValues}
          onSubmit={(values, props) => onSubmit(values, props, sendEmail)}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => (
            <Box>
              <Form>
                <FormControl
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  width='100%'
                >
                  <Flex
                    gap={{ base: "0", md: "10px" }}
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <Flex flexDirection='column' width={{ base: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <CustomLabel name='name'>NAME</CustomLabel>
                        <ErrorMessage name='name'>
                          {(msg) => <span className={errorMsg}>{msg}</span>}
                        </ErrorMessage>
                      </div>
                      <Field
                        type='text'
                        id='name'
                        name='name'
                        placeholder='e.g. Dave, Dave Jones, Mr Jones'
                        component={CustomInputComponent}
                        required
                        {...commonFieldProps}
                      />
                    </Flex>

                    <Flex flexDirection='column' width={{ base: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <CustomLabel name='phone'>PHONE</CustomLabel>
                        <ErrorMessage name='phone'>
                          {(msg) => <span className={errorMsg}>{msg}</span>}
                        </ErrorMessage>
                      </div>
                      <Field
                        id='phone'
                        name='phone'
                        placeholder='UK Phone number'
                        component={CustomInputComponent}
                        {...commonFieldProps}
                      />
                    </Flex>
                  </Flex>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0px",
                      color: "white",
                    }}
                  >
                    <CustomLabel name='email'>EMAIL</CustomLabel>
                    <ErrorMessage name='email'>
                      {(msg) => <span className={errorMsg}>{msg}</span>}
                    </ErrorMessage>
                  </div>
                  <Field
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Valid email'
                    component={CustomInputComponent}
                    {...commonFieldProps}
                  />
                  <CustomLabel name='Message'>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      HOW WE CAN HELP?
                    </div>
                  </CustomLabel>
                  <Field
                    as='textarea'
                    rows='3'
                    id='message'
                    name='message'
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  {/* Messages to show state of the email process */}
                  {loading && <p>Sending request...</p>}
                  {error && <p>Error sending request: {error.message}</p>}
                  {success && <p>Your request has been successful!</p>}
                  <Button
                    className='dkButton'
                    type='submit'
                    fontSize={{ base: "3vw", sm: "2vw", md: "1vw" }}
                    height={{ base: "10vw", sm: "7vw", md: "3.5vw" }}
                    borderRadius={{ base: "5vw", sm: "3.5vw", md: "1.75vw" }}
                    padding={{
                      md: "0.8vw 6vw 1.0vw 6vw",
                    }}
                    style={{ margin: "10px 0 20px" }}
                    mt='0.5vw'
                    width='100%'
                  >
                    Send
                  </Button>
                  {/* Extra button when testing forms 
                  <Button
                    type='button'
                    mt='10'
                    ml='10'
                    onClick={() => setFormValues(savedValues)}
                  >
                    Load Saved Info
                  </Button>*/}
                </FormControl>
              </Form>
            </Box>
          )}
        </Formik>
      </Flex>
    </Box>
  );
}

export default GitForm;
