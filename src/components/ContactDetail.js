import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ContactDetail(props) {

  const contactValidationSchema = Yup.object({

    email: Yup.string().email('Invalid email').required('please provide your email'),
    contact: Yup.string().min(10, 'contact Must be of 10 digit').max(11, 'cannot be of more than 10 digit').required('Please fill in your phone number')

  });
  const handleSubmit = (values)=>{
    props.next(values)
  
  }
 
  return (
    <Formik
      initialValues={props.guestData}

      onSubmit={handleSubmit}

      validationSchema={contactValidationSchema}>
      {() => (
        <Form >
          <Field
            placeholder="Email"
            type="email"
            name="email"
            className="formikFieldGuest"
          />
          <ErrorMessage name="email" component="div" />
          <Field
            placeholder="Contact"
            type="number"
            name="contact"
            className="formikFieldGuest"
          />
          <ErrorMessage name="contact" component="div" />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
          
              onClick={props.back}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button type="submit">
              Next
            </Button>
          </Box>

        </Form>
      )
      }
    </Formik>
  )
}

export default ContactDetail