import * as React from 'react';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { eventContext } from '../App';
import axios from 'axios';
import { useEffect , useContext} from 'react';




export default function FormAddEvent(props) {
  const { setEvents } = useContext(eventContext)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(0, 0, 0, 0);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const eventValidationSchema = Yup.object({
    event_name: Yup.string().required('please enter the event name'),
    date: Yup.date().min(minDate, `You can book events from ${minDate.getDate() + 0} ${months[minDate.getMonth()]} `).max(maxDate, "you can book events only one month in advance").required("Please select the date"),
    venue: Yup.string().required('Please enter the venue')

  });


  useEffect(() => {
    axios.get("http://localhost:3000/list").then(
      (response) => {

        setEvents(response.data.data)

      }
    )
  }, [props.open])

  console.log("open",props.open)

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      <Formik
        initialValues={{
          _id: new Date().getTime(),
          event_name: '',
          date: '',
          venue: ''
        }}
        onSubmit={(values, { setSubmitting }) => {

         

          
          axios.post("http://localhost:3000/addEvent", values)



          setSubmitting(false);
          props.setOpen(false);


        }}
        validationSchema={eventValidationSchema}>{() => (
          <Form >
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <p style={{ width: '25%', textAlign: 'start' }}>Event Name : </p>
              <div style={{ width: '75%' }}>
                <Field

                  type="text"
                  name="event_name"
                  className='formikFieldGuest'


                />
                <ErrorMessage name="event_name" component="div" className='error' />

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
