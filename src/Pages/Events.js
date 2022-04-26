import * as React from 'react';
import Box from '@mui/material/Box';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import PopUpAddForm from '../components/PopUpAddForm';
import PopUpEdit from '../components/PopUpEdit'
import { DataGrid } from '@mui/x-data-grid';
import DeleteDialog from '../components/DeleteDialogMui';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';



export default function Events(props) {
  
  
  const [editObj, setEditObj] = useState();
  const [searchTerm, setSearchTerm] = useState("")

  
  
    const filterdEvent = props.rows.filter((event) => {

      if (searchTerm === "") {
        return event
      }
      else if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return event
      }
    })
  


  props.setIsGuestPage(false);
  const editHandle = (id) => {
    const editList = props.rows.filter((row) => {
      return row.id === id
    })

    editList.map((event) => {
      setEditObj(event);
    })
  }

 
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', width: 100, headerName: 'Name' },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 120
    },
    {
      field: 'venue',
      headerName: 'Venue',
      width: 220
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 450,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [

          <GridActionsCellItem
          icon={<Link to={`/guestAddInviteTab/Event_ID-${id}`} style={{textDecoration:'none'}}>
          <Button variant="contained" color="success" >
  
            Invite
          </Button></Link>}
          label="Invite Guest"
      />,
      <GridActionsCellItem
      icon={<Link to='' style={{textDecoration:'none'}}>
      <Button  variant="contained" color="success"  >

        View
      </Button></Link>}
      label="Invite Guest"
  />,
          <GridActionsCellItem
            icon={<PopUpEdit editObj={editObj} id={id} rows={props.rows} setRows={props.setRows} />}
            label="Edit"
            onClick={() => { editHandle(id) }}
            className="textPrimary"

            color="inherit"
          />,
        <GridActionsCellItem
        icon={<DeleteDialog setRows={props.setRows} rows={props.rows} id={id} />}
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
          <TextField onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />
          <PopUpAddForm rows={props.rows} setRows={props.setRows} IsGuestPage={props.isGuestPage} />

        </Box>
       

        <DataGrid
          rows={filterdEvent}
          columns={columns}
          pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
      </Box>
    </div>
  );
}
