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



export default function Guests(props) {
  const [isSearch, setIsSearch] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState()
  const [editObj, setEditObj] = useState();
  const [searchTerm, setSearchTerm] = useState("")
  props.setGuestPage(true)

  // useEffect(() => {
  //   console.log("search===>", searchTerm)
  //   const filterdEvent = props.rows.filter((event) => {

  //     if (searchTerm === "") {
  //       return event
  //     }
  //     else if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
  //       return event
  //     }
  //   })
  //   console.log("filteredArray", filterdEvent)
  //   setFilteredEvent(filterdEvent)
  // }, [searchTerm])


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
      width: 220
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 220
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
            icon={ <Link to={`/GuestDetail/${id}`}>
            <Button variant="contained" color="success" >
        
            View
           </Button></Link>}
            label="View"
          />,
          <GridActionsCellItem
            icon={<PopUpEdit guestPage={props.guestPage} editObj={editObj} id={id} guest={props.guest} setGuest={props.setGuest} />}
            label="Edit"
            onClick={() => { editHandle(id) }}
            className="textPrimary"

            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteDialog guest={props.guest} setGuest={props.setGuest} guestPage={props.guestPage} id={id} />}
            label="Delete"
          />


        ];
      },
    },

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
          {/* <PopUpAddForm guest={props.guest} setGuest={props.setGuest} guestPage={props.guestPage} /> */}
          



    <Stack direction="row">
    <Link to='/GuestStepperForm'>
     
      <Button variant="contained" color="success" >
        
       Add Guest
      </Button>
      </Link>
     
    </Stack>




        </Box>

        <DataGrid
          rows={props.guest}
          columns={columns}
        />
      </Box>
    </div>
  );
}
