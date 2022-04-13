import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AccountDetail(props) {

  const accountValidationSchema = Yup.object({
    account_no: Yup.string().required('Please enter account number'),
  

  });
const handleSubmit = (values)=>{
  props.next(values)

}
   
  return (
    <Formik
          initialValues={props.guestData}
          onSubmit={handleSubmit}
          validationSchema={accountValidationSchema}>
          {() => (
            <Form >
              <Field
                placeholder="Account Number"
                type="text"
                name="account_no"
                className="formikFieldGuest"


              />
              <ErrorMessage name="account_no" component="div" />
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

export default AccountDetail