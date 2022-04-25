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



export default function GuestCRUD(props) {
  
  
  const [editObj, setEditObj] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  


props.setIsGuestPage(true);

  

  const guest= props.guest.filter((guest) => {

      if (searchTerm === "") {
        return guest
      }
      else if (guest.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return guest
      }
    })

  
 


  const editHandle = (id) => {
    const editList = props.guest.filter((guest) => {
      return guest.id === id
    })

    editList.map((guest) => {
      setEditObj(guest);
    })
  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
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
      width: 120
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 270,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<Link to={`/GuestDetail/${id}`} style={{textDecoration:'none'}}>
              <Button variant="contained" color="success" >

                View
              </Button></Link>}
            label="View"
          />,
          <GridActionsCellItem
            icon={
              <PopUpEdit isGuestPage={props.isGuestPage} editObj={editObj} id={id} guest={props.guest} setGuest={props.setGuest} guestData={props.guestData} setGuestData={props.setGuestData} />}
            label="Edit"
            onClick={() => { editHandle(id) }}
            className="textPrimary"

            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteDialog guest={props.guest} setGuest={props.setGuest} isGuestPage={props.isGuestPage} id={id} />}
            label="Delete"
          />


        ];
      },
    } ,

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
        { props.isGuestPage &&
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>
          <TextField onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />
    




          <Stack direction="row">
            <Link to='/GuestStepperForm' style={{textDecoration:'none'}}>

              <Button variant="contained" color="success" >

                Add Guest
              </Button>
            </Link>

          </Stack>




        </Box> }

        <DataGrid
          rows={guest}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
}
