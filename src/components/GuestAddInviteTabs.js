import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AppBar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import Guests from './Guests';
import InvitedGuest from './InvitedGuest'



export default function GuestAddInviteTabs(props) {
  const [value, setValue] = React.useState('1');
  const [searchTerm, setSearchTerm] = useState("");

  const [invitedGuestID, setInvitedGuestID] = useState([]);
  
  
  
  


const handleChange = (event, newValue) => {
    setValue(newValue);
  };

console.log("props invitedGuest",props.invitedGuest)
const guestList = [...props.invitedGuest];
  const handleSet = ()=>{

    const selectedGuest = props.guest.filter((guest) => {

      if (invitedGuestID.includes(guest.id)) {
        return guest;
      }

    })
    
    

    console.log("guestlist",guestList);

    selectedGuest.map((guest)=>{
      console.log("inside map guestlist",guestList);
      console.log("guestList includes",guestList.includes(guest))
     
        if(guestList.includes(guest)){
          console.log(" already exist so not adding",guest.name)
          alert("already Invited")

        }
        else{
          console.log("so adding",guest.name)
          guestList.push(guest);
        }
        console.log("inside map guestlist",guestList);
       
      
       
    })
    console.log("now guestlist",guestList);

    props.setInvitedGuest(guestList);
    localStorage.setItem("invited_guest", JSON.stringify(guestList))



   

   
  }
  





  return (


    <>
      <Container sx={{ marginTop: '20px' }}>


        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>

          <TextField onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />


          <Stack direction="row">

            <Link to="" style={{ textDecoration: 'none' }}>
              <Button onClick={handleSet}  variant="contained" color="primary" sx={{ mr: 2 }} >

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
      </Container>


      <Container>
        <AppBar position='static' color='inherit'>
          <Box sx={{ width: '100%', typography: 'body1' }}>

            <TabContext value={value}>


              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" variant='fullWidth' >

                  <Tab label="All Guest" value="1" />
                  <Tab label="Invitation Sent" value="2" />
                  <Tab label="Invitation Accepted" value="3" />


                </TabList>
              </Box>

              <TabPanel value="1">
                <Guests guest={props.guest} invitedGuest={props.invitedGuest} setInvitedGuest={props.setInvitedGuest}  searchTerm={searchTerm} setInvitedGuestID={setInvitedGuestID}/>
              </TabPanel >
              <TabPanel value="2"><InvitedGuest  searchTerm={searchTerm} invitedGuest={props.invitedGuest} /></TabPanel>
              <TabPanel value="3"></TabPanel>

            </TabContext>
          </Box>
        </AppBar>
      </Container>



    </>

  );
}

