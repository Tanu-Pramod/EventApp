import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import ImageDialog from './ImageDialog';
import { eventContext } from '../App';

function PersonalDetail(props) {
  const {guestData} = useContext(eventContext);
  const [open, setOpen] = React.useState(false);

  
  const handleClose = () => {
    setOpen(false);
  };

  const [image, setImage] = useState(null);
  const [src, setSrc] = useState(null);

  




  const personalValidationSchema = Yup.object({
    guest_name: Yup.string().required('Please enter the guest name !!'),
    age: Yup.number()
      .required('Please enter your age')
      .test(
        'Is positive?',
        'Age must be in range of 0-100',
        (value) => value > 0 && value <=100
      ),
    image: Yup.mixed().required('Please select your photo'),
    gender: Yup.string().required('Please select your gender ')


  });


  const handleSubmit = (values) => {

   
    props.next(values);
  }

  const handleChange = (event) => {

    setOpen(true);

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {

      setImage(reader.result)
    };

  }


  return (
    <Formik
      initialValues={guestData}
      onSubmit={handleSubmit}
      validationSchema={personalValidationSchema}>
      {({ values, setFieldValue }) => (
        <Form  >
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <p style={{ width: '25%', textAlign: 'start' }} >Guest Name : </p>

            <div style={{ width: '75%' }}>
              <Field
                type="text"
                name="guest_name"
                className="formikFieldGuest"
              />

              <ErrorMessage name="guest_name" component="div" className='error'/>
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

         


          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, }}>
            <p style={{ width: '25%', textAlign: 'start' }} >Image : </p>

            <div style={{ width: '75%' }}>

              <input
                type="file"
                name="image"
                onChange={(event) => handleChange(event)}
                className="formikFieldGuest"
              />


              <ErrorMessage name="image" component="div" className='error' />
            </div>
            {image && 
            <img
              
              src={src}
              style={{ maxWidth: '30%',marginLeft:'auto',marginRight:'auto' }}

            />}
           
          </Box>


          <ImageDialog handleClose={handleClose} setFieldValue={setFieldValue} open={open} setOpen={setOpen}  setSrc={setSrc} image={image} />
          
          
          




         





          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>

            <p style={{ width: '25%', textAlign: 'start' }} id="my-radio-group">Gender:</p>

            <div style={{ width: '75%', textAlign: 'start', alignSelf:'center' }} role="group" aria-labelledby="my-radio-group">

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