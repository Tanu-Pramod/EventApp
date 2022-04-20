import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ContactDetail(props) {

  const contactValidationSchema = Yup.object({

    email: Yup.string().email('Invalid email').required('please provide your email'),
    address: Yup.string().required('please enter the address'),
    contact: Yup.string().min(10, 'contact Must be of 10 digit').max(11, 'cannot be of more than 10 digit').required('Please fill in phone number in numeric format')

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
          <Box sx={{display:'flex', flexDirection:'row',pt:2}}>
            <p style={{ width: '25%', textAlign: 'start' }}>
              Email : 
            </p>
          <div style={{width:'75%'}}>
          <Field
            type="email"
            name="email"
            className="formikFieldGuest"
          />
          <ErrorMessage name="email" component="div" className='error'    />
          </div>
         

          </Box>
          <Box sx={{display:'flex', flexDirection:'row',pt:2}}>
            <p style={{width:'25%', textAlign:'start'}}>
              Contact : 
            </p>
          <div style={{width:'75%'}}>
          <Field
            type="number"
            name="contact"
            className="formikFieldGuest"
          />
          <ErrorMessage name="contact" component="div" className='error' />

          </div>
         
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', pt:2}}>
            <p style={{width:'25%',textAlign:'start'}}>Address : </p>
            <div style={{width:'75%'}}>
            <Field
            type="text"
            name="address"
            className="formikFieldGuest"
          />
          <ErrorMessage name="address" component="div" className='error' />
         
            </div>
          </Box>
       
          
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