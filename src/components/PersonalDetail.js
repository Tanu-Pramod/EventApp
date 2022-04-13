import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function PersonalDetail(props) {
  const personalValidationSchema = Yup.object({
    name: Yup.string().required('Please enter the guest name'),
  

  });
  
 const handleSubmit=(values)=>{
  
 props.next(values);
 }
  return (
    <Formik
        initialValues={props.guestData}

        onSubmit={handleSubmit}

        validationSchema={personalValidationSchema}>
        {() => (
          <Form >

            <Field
              placeholder="Guest Name"
              type="text"
              name="name"
              className="formikFieldGuest"
            />
            <ErrorMessage name="name" component="div" />
            <Field
              placeholder="Age"
              type="text"
              name="age"
              className="formikFieldGuest"
            />
            <ErrorMessage name="age" component="div" />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={props.activeStep === 0}
                  onClick={props.back}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />


                <Button type="submit">
                  {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
          </Form>
        )
        }
      </Formik>
  )
}

export default PersonalDetail