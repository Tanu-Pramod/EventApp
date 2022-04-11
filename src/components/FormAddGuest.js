import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function FormAddGuest(props) {

  const [values, setValues] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setValues({ ...values, id: new Date().getTime(), [e.target.id]: e.target.value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(e);
    props.setOpen(false);
    if (values.name === "" || values.email === "") {
      alert("None of the field can be empty")
      return false;
    }
    else {
      props.setGuest([...props.guest, values]);
      localStorage.setItem("guest_list", JSON.stringify([...props.guest, values]));
      setValues({
        name: '',
        email: ''
      });
    }

  }
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      <form onSubmit={(e) => submitHandle(e)}>
        <TextField
          label="Full Name"
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
        <Box>
          <Button type='submit'>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
