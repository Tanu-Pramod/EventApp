import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { eventContext } from '../App';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import CardMedia from '@mui/material/CardMedia';






export default function Guests(props) {
  const {guest} = React.useContext(eventContext)
  
const handleSelect = (id) => {
  
   props.setInvitedGuestID(id);
   
  }
  
  const filteredGuest = guest.filter((guest)=>{
    if(props.searchTerm === ""){
      return guest
    }
    else if(guest.guest_name.toLowerCase().includes(props.searchTerm.toLowerCase())){
      return guest
    }
  })




  const columns = [
    { field: '_id', headerName: 'ID', width: 180 },
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
      field: 'image',
      type: 'actions',
      headerName: 'Image',
      width: 350,
      cellClassName: 'actions',
      getActions: ({ id}) => {
        

        

        return [


        
          <GridActionsCellItem
            icon={
              <CardMedia
              component="img"
              height="140"
              image={`http://localhost:3000/uploads/${guest.image}`}
              sx={{width:'auto',p:1,alignSelf:'center'}}
              
            />}
           
          />
         
          




        ];
      },
    },

   


  ];


  return (

    <div style={{ height: 400, width: '90%', margin: 'auto' }}>

      <Box
        sx={{
          height: 400,
          width: '100%',
          '& .actions': { color: 'text.secondary' },
          '& .textPrimary': {
            color: 'text.primary',
          },
          margin:'auto'
        }}
      >

        

        <DataGrid
          rows={filteredGuest}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={row=>row._id}
          onSelectionModelChange={(id) => handleSelect(id)}
        />
      </Box>
    </div>
  );
}
