import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function FormEditLStorage(props) {

  const id = props.editObj.id;
  const [values, setValues] = useState(props.guestPage ? {
    id: props.editObj.id,
    name: props.editObj.name,
    email: props.editObj.email,
    contact:props.editObj.contact
  } : {
    id: props.editObj.id,
    name: props.editObj.name,
    date: props.editObj.date,
    venue: props.editObj.venue
  });
  console.log("valueesss", values)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    props.setOpen(false)
    if (values.name === "" || values.date === "" || values.venue === "" || values.email === "" || values.contact === "") {
      alert("None of the field can be empty")
    }
    else {
      if(props.guestPage){
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

      }
      else{
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
      }
     
    }

  }
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {
       props.guestPage ? 
       <form onSubmit={(e) => submitHandle(e)}>
         <TextField
           label="Guest Name"
           id="name"
           onChange={(e) => handleChange(e)}
           value={values.name}
           sx={{ m: 1, width: '50ch' }}
 
         />
       
         <TextField
           label="Email"
           id="email"
           onChange={(e) => handleChange(e)}
           value={values.email}
           sx={{ m: 1, width: '50ch' }}
 
         />
         <TextField
           label="Contact"
           id="contact"
           onChange={(e) => handleChange(e)}
           value={values.contact}
           sx={{ m: 1, width: '50ch' }}
 
         />
         <Box>
           <Button type='submit' >
             Save
           </Button>
         </Box>
       </form> : 
       <form onSubmit={(e) => submitHandle(e)}>
         <TextField
           label="Event Name"
           id="name"
           onChange={(e) => handleChange(e)}
           value={values.name}
           sx={{ m: 1, width: '50ch' }}
 
         />
         <TextField
           label="Date"
           sx={{ m: 1, width: '50ch' }}
           type="date"
           id="date"
           onChange={(e) => handleChange(e)}
           value={values.date}
           InputProps={{
             startAdornment: <InputAdornment position="start"></InputAdornment>,
           }}
 
         />
         <TextField
           label="Venue"
           id="venue"
           onChange={(e) => handleChange(e)}
           value={values.venue}
           sx={{ m: 1, width: '50ch' }}
 
         />
         <Box>
           <Button type='submit' >
             Save
           </Button>
         </Box>
       </form>
      }

    </Box>
  );
}
