import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';




export default function FormAddEvent(props) {
  const guestValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('please provide your email'),
    contact: Yup.string().min(10, 'contact Must be of 10 digit').max(11, 'cannot be of more than 10 digit').required('Please fill in your phone number')

  });
  const formikField = {
    width: '100%'
  }


  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      {
        props.guestPage ? <Formik
          initialValues={{
            id: new Date().getTime(),
            name: '',
            email: '',
            contact: ''
          }}
          onSubmit={(values, { setSubmitting }) => {

            props.setOpen(false);
            props.setGuest([...props.guest, values]);
            localStorage.setItem("guest_list", JSON.stringify([...props.guest, values]));
            setSubmitting(false);

          }}
          validationSchema={guestValidationSchema}>
          {() => (
            <Form className='formikForm'>

              <Field
                placeholder="Guest Name"
                type="text"
                name="name"
                className='formikField'
              />
              <ErrorMessage name="name" component="div" />
              <Field
                placeholder="Email"
                type="email"
                name="email"
                className='formikField'
              />
              <ErrorMessage name="email" component="div" />
              <Field
                placeholder="Contact"
                type="text"
                name="contact"
                className='formikField'
              />
              <ErrorMessage name="contact" component="div" />
              <Box>
                <Button type='submit'>
                  Save
                </Button>
              </Box>
            </Form>
          )
          }
        </Formik> : <Formik
          initialValues={{
            id: new Date().getTime(),
            name: '',
            date: '',
            venue: ''
          }}
          onSubmit={(values, { setSubmitting }) => {

            props.setOpen(false);
            props.setRows([...props.rows, values]);
            localStorage.setItem("event_list", JSON.stringify([...props.rows, values]));
            setSubmitting(false);

          }}

        >{() => (
          <Form >
            <Field
              placeholder="Event Name"
              type="text"
              name="name"
              className='formikField'

            />
            <ErrorMessage name="name" component="div" />
            <Field
              placeholder="Date"
              type="date"
              name="date"
              className='formikField'
            />
            <ErrorMessage name="venue" component="div" />
            <Field
              placeholder="Venue"
              type="text"
              name="venue"
              className='formikField'
            />
            <ErrorMessage name="contact" component="div" />
            <Box>
              <Button type='submit'>
                Save
              </Button>
            </Box>
          </Form>
        )
          }
        </Formik>
      }

    </Box>
  );
}
