import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import { Form, Formik, Field } from 'formik';


export default function FormEditLStorage(props) {

  const id = props.editObj.id;

  const handleChange = (e, setFieldValue) => {

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.setGuestData({
        ...props.guestData,
        img: reader.result
      });
      setFieldValue('img', reader.result)

    };
  }

  return (
    <Box>

      {
        props.guestPage ? <Formik
          initialValues={{
            id: props.editObj.id,
            name: props.editObj.name,
            email: props.editObj.email,
            contact: props.editObj.contact,
            img: props.editObj.img,
            address: props.editObj.address
          }}

          onSubmit={(values) => {

            const updatedGuest = props.guest.map((guest) => {
              if (guest.id === id) {
                return values
              }
              else {
                return guest
              }
            })
            localStorage.setItem("guest_list", JSON.stringify(updatedGuest));
            props.setGuest(updatedGuest);
            props.setOpen(false)
          }}>

          {({ values, setFieldValue }) => (

            <Form>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                <Box sx={{ width: '70%' }}>
                  <Field
                    placeholder="Guest Name"
                    name="name"
                    className="formikFieldGuest"
                  />

                  <Field
                    placeholder="Email"
                    name="email"
                    className="formikFieldGuest"
                  />
                  <Field
                    placeholder="Contact"
                    name="contact"
                    className="formikFieldGuest"
                  />
                  <Field
                    placeholder="Address"
                    name="address"
                    className="formikFieldGuest"
                  />

                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ width: '30%' }}>Change Image : </p>
                    <input
                      type="file"
                      onChange={(e) => handleChange(e, setFieldValue)}
                      className="formikFieldGuest"
                      style={{ width: '70%' }}
                    />
                  </div>
                </Box>
                <Box sx={{ flex: '1 1 auto' }} />
                <Box sx={{ width: '20%' }}>

                  <CardMedia
                    component="img"
                    height="140"
                    image={values.img}
                    sx={{ width: '100%' }}

                  />
                </Box>
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
              id: props.editObj.id,
              name: props.editObj.name,
              date: props.editObj.date,
              venue: props.editObj.venue
            }}
            onSubmit={(values) => {
              props.setOpen(false)
              console.log("submitting")

              const updatedEvent = props.rows.map((event) => {
                if (event.id === id) {
                  return values
                }
                else {
                  return event
                }
              })
              localStorage.setItem("event_list", JSON.stringify(updatedEvent));
              props.setRows(updatedEvent);

            }}>
            {() => (
              <Form >
                <Field
                  placeholder="Event Name"
                  name="name"
                  className="formikFieldGuest"
                />
                <Field
                  placeholder="Date"
                  type="date"
                  name="date"
                  className="formikFieldGuest"
                />
                <Field
                  placeholder="Venue"
                  name="venue"
                  className="formikFieldGuest"
                />
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
