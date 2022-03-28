import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function FormAddEvent(props) {

  const [values, setValues] = useState({
    name: '',
    date: '',
    venue: ''
  });

  const handleChange = (e) => {
    setValues({ ...values, id: new Date().getTime(), [e.target.id]: e.target.value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(e);
    props.setOpen(false);
    if (values.name === "" || values.date === "" || values.venue === "") {
      alert("None of the field can be empty")
      return false;
    }
    else {
      props.setRows([...props.rows, values]);
      localStorage.setItem("event_list", JSON.stringify([...props.rows, values]));
      setValues({
        name: '',
        date: '',
        venue: ''
      });
    }

  }
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

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
          <Button type='submit'>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
