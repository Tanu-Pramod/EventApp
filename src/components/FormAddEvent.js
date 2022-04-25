import * as React from 'react';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';




export default function FormAddEvent(props) {
const minDate = new Date();
minDate.setDate(minDate.getDate()+2);
minDate.setHours(0,0,0,0);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth()+1);

  const eventValidationSchema = Yup.object({
    name: Yup.string().required('please enter the event name'),
    date: Yup.date().min(minDate,`You can book events from ${minDate.getDate()+0} ${months[minDate.getMonth()]} `).max(maxDate,"you can book events only one month in advance").required("Please select the date"),
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
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <p style={{ width: '25%', textAlign: 'start' }}>Event Name : </p>
              <div style={{ width: '75%' }}>
                <Field

                  type="text"
                  name="name"
                  className='formikFieldGuest'


                />
                <ErrorMessage name="name" component="div" className='error' />

              </div>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <p style={{ width: '25%', textAlign: 'start' }}>Date : </p>
              <div style={{ width: '75%' }}>
                <Field

                  type="date"
                  name="date"
                  className='formikFieldGuest'


                />
                <ErrorMessage name="date" component="div" className='error' />

              </div>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <p style={{ width: '25%', textAlign: 'start' }}>Venue : </p>
              <div style={{ width: '75%' }}>
                <Field

                  type="text"
                  name="venue"
                  className="formikFieldGuest"


                />
                <ErrorMessage name="venue" component="div" className='error' />
              </div>
            </Box>
            <Box sx={{ float: 'right' }}>
              <Button type='submit'>
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
