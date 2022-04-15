import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

function PersonalDetail(props) {
  const personalValidationSchema = Yup.object({
    name: Yup.string().required('Please enter the guest name !!'),
    age: Yup.string().required('please enter your age in numeric format'),
    img: Yup.mixed().required('please select your photo'),
    gender: Yup.string().required('please select your gender ')


  });

  const handleSubmit = (values) => {

    props.next(values);
  }
  return (
    <Formik
      initialValues={props.guestData}

      onSubmit={handleSubmit}

      validationSchema={personalValidationSchema}>
      {() => (
        <Form >
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <p style={{ width: '25%', textAlign: 'start' }} >Guest Name : </p>

            <div style={{ width: '75%' }}>
              <Field
                type="text"
                name="name"
                className="formikFieldGuest"
              />
              <ErrorMessage name="name" component="div" className='error' />
            </div>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <p style={{ width: '25%', textAlign: 'start' }}>Age:</p>

            <div style={{ width: '75%' }}>
              <Field
                type="number"
                name="age"
                className="formikFieldGuest"
              />
              <ErrorMessage name="age" component="div" className='error' />
            </div>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <p style={{ width: '25%', textAlign: 'start' }} >Image : </p>

            <div style={{ width: '75%' }}>

              <Field
                type="file"
                name="img"
                className="formikFieldGuest"
              />

              <ErrorMessage name="img" component="div" className='error' />
            </div>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <div style={{ width: '25%', textAlign: 'start' }} id="my-radio-group">Gender:</div>

            <div style={{ width: '75%', textAlign: 'start' }} role="group" aria-labelledby="my-radio-group">

              <label>
                <Field type="radio" name="gender" value="Male" />
                Male
              </label>

              <label>
                <Field type="radio" name="gender" value="Female" />
                Female
              </label>
            </div>

          </Box>
          <ErrorMessage name="gender" component="div" style={{ marginTop: '15px' }} className='error' />

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={props.activeStep === 0}
              onClick={props.back}
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

export default PersonalDetail