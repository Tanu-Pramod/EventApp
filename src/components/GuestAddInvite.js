import * as React from 'react';
import Box from '@mui/material/Box';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import PopUpAddForm from '../components/PopUpAddForm';
import PopUpEdit from '../components/PopUpEdit'
import { DataGrid } from '@mui/x-data-grid';
import DeleteDialog from '../components/DeleteDialogMui';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



export default function GuestAddInvite(props) {
  const [isSearch, setIsSearch] = useState(false);
  const [filteredGuest, setFilteredGuest] = useState();
  const [searchTerm, setSearchTerm] = useState("");


  props.setIsGuestPage(true)

  useEffect(() => {

    const filteredGuest = props.guest.filter((guest) => {

      if (searchTerm === "") {
        return guest
      }
      else if (guest.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return guest
      }
    })

    setFilteredGuest(filteredGuest)
  }, [searchTerm])





  const handleSelect = (id) => {
      const selectedGuest = props.guest.filter((guest)=>{
   

      if(id.includes(guest.id)){
        return guest;
    
      }

    })
    props.setInvitedGuest(selectedGuest);
 




  }
  console.log("invitedGuest", props.invitedGuest)
  


  const columns = [
    { field: 'id', headerName: 'ID', width: 180 },
    { field: 'name', width: 180, headerName: 'Name' },

    {
      field: 'email',
      headerName: 'Email',
      width: 180
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 120
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200
    }


  ];


  return (

    <div style={{ height: 400, width: '90%', margin: 'auto', marginTop: '20px' }}>

      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': { color: 'text.secondary' },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>
          <TextField onFocus={() => { setIsSearch(true) }} onBlur={() => { setIsSearch(false) }} onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />


          <Stack direction="row">


            <Link to="" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ mr: 2 }} >

                Invite Guests
              </Button>
            </Link>
            <Link to='/GuestStepperForm' style={{ textDecoration: 'none' }}>

              <Button variant="contained" color="success" >

                Add Guest
              </Button>
            </Link>



          </Stack>




        </Box>

        <DataGrid
          rows={isSearch && searchTerm.length > 0 ? filteredGuest : props.guest}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(id) => handleSelect(id)}
        />
      </Box>
    </div>
  );
}
