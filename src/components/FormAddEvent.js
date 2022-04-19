import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';




export default function FormAddEvent(props) {

  const eventValidationSchema = Yup.object({
    name: Yup.string().required('please enter the event name'),
    date: Yup.string().required('please select the date'),
    venue: Yup.string().required('Please enter the venue')

  });
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      <Formik
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
        validationSchema={eventValidationSchema}>{() => (
          <Form >
            <Field
            // component={TextField}
            Placeholder="Event Name"
              // Label="Event Name"
              type="text"
              name="name"
              className='formikFieldGuest'
              // sx={{ m: 1, width: '50ch' }}
              

            />
            <ErrorMessage name="name" component="div" className='error' />
            <Field
              // component={TextField}
              // Label="Date"
              type="date"
              name="date"
              className='formikFieldGuest'
              // sx={{ m: 1, width: '50ch' }}
              
            />
            <ErrorMessage name="date" component="div" className='error' />
            <Field
              // component={TextField}
              // Label="Venue"
              Placeholder="Venue"
              type="text"
              name="venue"
              className="formikFieldGuest"
              // sx={{ m: 1, width: '50ch' }}
          
            />
            <ErrorMessage name="venue" component="div" className='error' />
            <Box sx={{float:'right'}}>
              <Button  type='submit'>
                Save
              </Button>
            </Box>
          </Form>
        )
        }
      </Formik>


    </Box>
  );
}
