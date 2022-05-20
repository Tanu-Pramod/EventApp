import * as React from 'react';
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';
import { eventContext } from '../App';




export default function InvitedGuest(props) {
  const {invitedGuest} = React.useContext(eventContext)
  

  const filteredInvitedGuest = invitedGuest.filter((guest)=>{
    if(props.searchTerm === ""){
      return guest
    }
    else if(guest.name.toLowerCase().includes(props.searchTerm.toLowerCase())){
      return guest
    }
  })
  



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

    <div style={{ height: 400, width: '100%'}}>

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
          rows={filteredInvitedGuest}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          //onSelectionModelChange={(id) => handleSelect(id)}
        />
      </Box>
    </div>
  );
}
