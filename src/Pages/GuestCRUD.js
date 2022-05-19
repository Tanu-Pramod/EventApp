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
import { eventContext } from '../App';
import { useContext } from 'react';


export default function GuestCRUD() {
  const {isGuestPage,setIsGuestPage,guest} = useContext(eventContext)
  
  
  const [editObj, setEditObj] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  


setIsGuestPage(true);


  

  const filteredGuest= guest.filter((guest) => {

  

      if (searchTerm === "") {
        return guest
      }
      else if (guest.guest_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return guest
      }
    })

  
 


  const editHandle = (id) => {

    
    const editList = guest.filter((guest) => {
      return guest._id === id
    })

   

    editList.map((guest) => {
      setEditObj(guest);
    })
  }


  const columns = [
    { field: '_id', headerName: 'ID', width: 80 },
    { field: 'guest_name', width: 180, headerName: 'Name' },

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
              <PopUpEdit  editObj={editObj} id={id} />}
            label="Edit"
            onClick={() => { editHandle(id) }}
            className="textPrimary"

            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteDialog  id={id} />}
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
        { isGuestPage &&
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>
          <TextField onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />
    



<Box sx={{alignSelf:'center'}}>

<Stack direction="row">
            <Link to='/GuestStepperForm' style={{textDecoration:'none'}}>

              <Button variant="contained" color="success" >

                Add Guest
              </Button>
            </Link>

          </Stack>
</Box>
          




        </Box> }

        <DataGrid
          rows={filteredGuest}
          columns={columns}
          pageSize={5}
          getRowId={row=>row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
}
