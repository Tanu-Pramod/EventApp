import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { eventContext } from '../App';








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

    { field: 'image',
    headerName: 'Image',
    width: 80, 
    renderCell: (params)=>
  
    <img  style={{maxWidth:'100%',marginLeft:'auto',marginRight:'auto'}} src={`http://localhost:3000/uploads/${params.row.image}`} />
      
      
     },
    


   


  ];


  return (

    <div style={{ height: 400, width: '100%' }}>

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

        

        <DataGrid
          rows={filteredGuest}
          columns={columns}
          pageSize={5}
          rowHeight={80}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={row=>row._id}
          onSelectionModelChange={(id) => handleSelect(id)}
        />
      </Box>
    </div>
  );
}
