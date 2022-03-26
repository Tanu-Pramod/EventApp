import * as React from 'react';
import Box from '@mui/material/Box';
import {

  GridActionsCellItem
} from '@mui/x-data-grid-pro';
import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import PopUpAddForm from '../components/PopUpAddForm';
import PopUpEdit from '../components/PopUpEdit'
import { DataGrid } from '@mui/x-data-grid';
import DeleteDialog from '../components/DeleteDialogMui';

export default function Events(props) {
  const [isSearch, setIsSearch] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState()
  console.log("isSearch===>", isSearch)
  const [editObj, setEditObj] = useState();
  const [searchTerm, setSearchTerm] = useState("")

  const changeHandle = (e) => {
    setSearchTerm(e.target.value)
    setIsSearch(true)
  }
  useEffect(() => {
    console.log("search===>", searchTerm)
    const filterdEvent = props.rows.filter((event) => {

      if (searchTerm === "") {
        return event
      }
      else if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return event
      }
    })
    console.log("filteredArray", filterdEvent)
    setFilteredEvent(filterdEvent)
  }, [searchTerm])


  const editHandle = (id) => {
    const editList = props.rows.filter((row) => {
      return row.id === id
    })

    editList.map((event) => {
      setEditObj(event);
    })
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 80, editable: true },
    { field: 'name', width: 180, headerName: 'Name', editable: true },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 120,
      editable: true,
    },
    {
      field: 'venue',
      headerName: 'Venue',
      width: 220,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
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


          />,
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
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>
          <TextField onFocus={() => {setIsSearch(true) }} onBlur={() => { setIsSearch(false) }} onChange={(e) => {setSearchTerm(e.target.value);  }} id="outlined-basic" label="Search here" variant="outlined" />
          <PopUpAddForm rows={props.rows} setRows={props.setRows} AddEvent={props.AddEvent} setAddEvent={props.setAddEvent} />

        </Box>

        <DataGrid
          rows={isSearch && searchTerm.length>0 ? filteredEvent : props.rows}
          columns={columns}
        />
      </Box>
    </div>
  );
}
