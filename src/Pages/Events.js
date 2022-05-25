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
import { eventContext } from '../App';
import { useContext } from 'react';


export default function Events() {

 

  const { events, setIsGuestPage} = useContext(eventContext);



  const [editObj, setEditObj] = useState();
  const [searchTerm, setSearchTerm] = useState("")

  



  



  const filterdEvent = events.filter((event) => {

    if (searchTerm === "") {
      return event
    }
    else if (event.event_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return event
    }
  })



  setIsGuestPage(false);

  const editHandle = (id) => {
    const editList = events.filter((row) => {
      return row._id === id
    })

    

    editList.map((event) => {
      setEditObj(event);
    })

    
  }


  const columns = [
    { field: '_id', headerName: 'ID', width: 80 },
    { field: 'event_name', width: 100, headerName: 'Name' },
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
      width: 350,
      cellClassName: 'actions',
      getActions: ({ id}) => {

        

        return [

          <GridActionsCellItem
            icon={<Link to={`/EventDetail/${id}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="success" >

                View
              </Button></Link>}
            label="Invite Guest"
          />,
         
          <GridActionsCellItem
            icon={<PopUpEdit editObj={editObj} id={id} />}
            label="Edit"
            onClick={() => { editHandle(id) }}
            className="textPrimary"

            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteDialog id={id} />}
            label="Delete"
          />




        ];
      },
    },

  ];
 

  const options = {
    searchPlaceholder: 'Press Enter to Search',
    filterType: 'dropdown',
    responsive: 'scroll',
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 100,
    
    fixedHeader: false,
    print: false,
    download: false,
    filter: true,
    sort: false,
    // selectableRows: false,
   
    //orderList && orderList.metadata && orderList.metadata[0] && orderList.metadata[0].total,
    serverSide: true,
    server: true,
    selectableRowsOnClick: false,
    selectableRows: 'none',
    fixedHeader: false,
    search: true,
    rangePage: true,
    // rowsPerPageOptions:[],
    // rowsPerPageOptions: [10, 100, 250, 500, 1000],
    // downloadOptions: {
    //   separator:',',
    //   filename: 'tableDownload.csv',
    // },
    textLabels: {
      filter: {
        all: "",
        title: "FILTERS",
      },
    },
    onTableChange: (action, tableState) => {
      console.log('action=', action, tableState)
      switch (action) {
        case 'changePage':
          this.changePage(tableState.page);
          break;
        case 'changeRowsPerPage':
          this.changeRowsPerPage(tableState.rowsPerPage)
          break;
   
        case 'onSearchClose':
          this.handleCloseSearch();
          break;
      }
    },
  }
    // onDownload: () => {
    //   onclick = (e) => {
    //       this.handleDownload(e);
    //      }
    //     }
    // (buildHead: (columns) ,
    //  buildBody: (data)) => {

    //  }


  return (

    <div style={{ height: 400, width: '90%', margin: 'auto', marginTop: '20px' }}>

      <Box
        sx={{
          height: 400,
          width: '100%',
          '& .actions': { color: 'text.secondary' },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>
          <TextField onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />
          <Box sx={{alignSelf:'center'}}>
          <PopUpAddForm  />
          </Box>
          

        </Box>


        <DataGrid
          rows={filterdEvent}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={row=>row._id}
          // options={options}
          filterModel={{
            items: [{ columnField: 'rating', operatorValue: '>', value: '2.5' }],
          }}
        />
      </Box>
    </div>
  );
}
