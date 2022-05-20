
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { eventContext } from '../App';
import React, { useContext, useState, useEffect } from 'react';
import ImageDialog from './ImageDialog';
import axios from 'axios';


export default function FormEditLStorage(props) {

  const { isGuestPage, guest, setGuest, events, setEvents } = useContext(eventContext)









  const [open, setOpen] = useState(false);



  const handleClose = () => {
    setOpen(false);
  };


  const [image, setImage] = useState(null);
  const [src, setSrc] = useState(null);
  


  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(0, 0, 0, 0);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const guestValidationSchema = Yup.object({
    guest_name: Yup.string().required('Please enter the guest name !!'),
    //age: Yup.string().required('please enter your age in numeric format'),
    image: Yup.mixed().required('please select your photo'),
    //gender: Yup.string().required('please select your gender '),
    email: Yup.string().email('Invalid email').required('please provide your email'),
    //address: Yup.string().required('please enter the address'),
    contact: Yup.string().min(10, 'contact Must be of 10 digit').max(11, 'cannot be of more than 10 digit').required('Please fill in phone number in numeric format'),
    //account_no: Yup.string().required('Please enter account number'),


  });
  const eventValidationSchema = Yup.object({
    event_name: Yup.string().required('please enter the event name'),
    date: Yup.date().min(minDate, `You can book events from ${minDate.getDate() + 0} ${months[minDate.getMonth()]} `).max(maxDate, "you can book events only one month in advance").required("Please select the date"),
    venue: Yup.string().required('Please enter the venue')

  });

  console.log("IsGuestPage",isGuestPage)

  const handleChange = (e) => {
    setOpen(true);
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result)

    };
  }

  useEffect(() => {


    if(isGuestPage){
      axios.get("http://localhost:3000/guestIndex/guestlist").then((response) => {
        setGuest(response.data.data)
      })
    }

    else{
    axios.get("http://localhost:3000/list").then(
      (response) => {

        setEvents(response.data.data)

      }
    )
  }
   

  }, [props.open])


  return (
    <Box>

      {
        isGuestPage ? <Formik

          initialValues={
            props.editObj
          }

          onSubmit={(values) => {

            const formdata = new FormData();

            for (const properties in values) {

              console.log("id",values._id)


              formdata.append(`${properties}`, values[properties])
            }

            for (let [key, value] of formdata) {
              console.log(`${key}: ${value}`)
            }

            axios.post(`http://localhost:3000/guestIndex/edit/${values._id}`, formdata)

            // const updatedGuest = guest.map((guest) => {
            //   if (guest.id === props.editObj.id) {
            //     return values
            //   }
            //   else {
            //     return guest
            //   }
            // })
            // localStorage.setItem("guest_list", JSON.stringify(updatedGuest));
            // setGuest(updatedGuest);
            props.setOpen(false)
          }}
          validationSchema={guestValidationSchema}>

          {({ values, setFieldValue }) => (

            <Form>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>


                <Box sx={{ width: '70%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                    <p style={{ width: '25%', textAlign: 'start' }}>Guest Name : </p>
                    <div style={{ width: '70%' }}>
                      <Field
                        name="guest_name"
                        className="formikFieldGuest"
                      />
                      <ErrorMessage name='name' component='div' className='error' />
                    </div>
                  </Box>


                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                    <p style={{ width: '25%', textAlign: 'start' }}>Email : </p>
                    <div style={{ width: '70%' }}>

                      <Field
                        name="email"
                        className="formikFieldGuest"
                      />
                      <ErrorMessage name='email' component='div' className='error' />
                    </div>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                    <p style={{ width: '25%', textAlign: 'start' }}>Contact : </p>
                    <div style={{ width: '70%' }}>
                      <Field
                        name="contact"
                        className="formikFieldGuest"
                      />
                      <ErrorMessage name='contact' component='div' className='error' />
                    </div>
                  </Box>



                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ width: '30%' }}>Change Image : </p>
                    <input
                      type="file"
                      name='image'
                      onChange={(e) => handleChange(e)}
                      className="formikFieldGuest"
                      style={{ width: '70%' }}
                    />
                  </div>
                  <ErrorMessage name="image" component="div" className='error' />
                </Box>
                <Box sx={{ flex: '1 1 auto' }} />
                <Box sx={{ width: '20%' }}>

                  <CardMedia
                    component="img"
                    height="140"
                    image={src ? src : `http://localhost:3000/uploads/${values.image}`}
                    sx={{ width: '100%' }}

                  />
                </Box>

                <ImageDialog setFieldValue={setFieldValue} open={open} handleClose={handleClose} setOpen={setOpen} setSrc={setSrc} image={image} />
              </Box>

              <Box sx={{ float: 'right' }}>
                <Button sx={{ fontSize: '18px' }} type='submit' >
                  Save
                </Button>
              </Box>
            </Form>

          )}
        </Formik>

          : <Formik
            initialValues={{
              _id: props.editObj._id,
              event_name: props.editObj.event_name,
              date: props.editObj.date.slice(0, 10),
              venue: props.editObj.venue
            }}

            onSubmit={(values) => {

              console.log("id---------", values._id)


              axios.post(`http://localhost:3000/edit/${values._id}`,
                values
              );
              props.setOpen(false)


              // const updatedEvent = events.map((event) => {
              //   if (event._id === props.editObj.id) {
              //     return values
              //   }
              //   else {
              //     return event
              //   }
              // })


              // localStorage.setItem("event_list", JSON.stringify(updatedEvent));
              // setEvents(updatedEvent);

            }}
            validationSchema={eventValidationSchema}>
            {() => (
              <Form >
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                  <p style={{ width: '25%', textAlign: 'start' }}>Event name : </p>
                  <div style={{ width: '70%' }}>
                    <Field
                      name="event_name"
                      className="formikFieldGuest"
                    />
                    <ErrorMessage name='event_name' component='div' className='error' />
                  </div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                  <p style={{ width: '25%', textAlign: 'start' }}>Date : </p>
                  <div style={{ width: '70%' }}>

                    <Field
                      type="date"
                      name="date"
                      className="formikFieldGuest"
                    />
                    <ErrorMessage name='date' component='div' className='error' />
                  </div>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                  <p style={{ width: '25%', textAlign: 'start' }}>Venue : </p>
                  <div style={{ width: '70%' }}>

                    <Field
                      name="venue"
                      className="formikFieldGuest"
                    />
                    <ErrorMessage name='venue' component='div' className='error' />
                  </div>
                </Box>
                <Box sx={{ float: 'right' }}>
                  <Button type='submit' >
                    Save
                  </Button>
                </Box>
              </Form>

            )}</Formik>

      }

    </Box >
  );
}
