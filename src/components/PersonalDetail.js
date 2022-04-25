import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

function PersonalDetail(props) {
  const personalValidationSchema = Yup.object({
    name: Yup.string().required('Please enter the guest name !!'),
    age: Yup.number()
    .required('Please enter your age')
    .test(
      'Is positive?', 
      'Age must be greater than 0', 
      (value) => value > 0
    ),
    img: Yup.mixed().required('Please select your photo'),
    gender: Yup.string().required('Please select your gender ')

 
  });


  const handleSubmit = (values) => {
    props.next(values);
  }

  const handleChange = (event, setFieldValue) => {

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFieldValue("img", reader.result)
    };
  }



  return (
    <Formik
      initialValues={props.guestData}
      onSubmit={handleSubmit}
      validationSchema={personalValidationSchema}>
      {({ values,setFieldValue }) => (
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

              <input
                type="file"
                name="img"
                onChange={(event) => handleChange(event, setFieldValue)}
                className="formikFieldGuest"
              />

              <ErrorMessage name="img" component="div" className='error' />
            </div>
            <CardMedia
              component="img"
              height="140"
              image={values.img}
              sx={{width:'30%'}}
              
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <p style={{ width: '25%', textAlign: 'start' }} id="my-radio-group">Gender:</p>

            <div style={{ width: '75%', textAlign: 'start' }} role="group" aria-labelledby="my-radio-group">

              <label>
                <Field type="radio" name="gender" value="Male" />
                Male
              </label>

              <label>
                <Field type="radio" name="gender" value="Female" />
                Female
              </label>
              <ErrorMessage name="gender" component="div" style={{ marginTop: '15px' }} className='error' />
            </div>

          </Box>
      

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