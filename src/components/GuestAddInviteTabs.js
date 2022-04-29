import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AppBar, Button, Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import Guests from './Guests';
import InvitedGuest from './InvitedGuest'
import { eventContext } from '../App';




export default function GuestAddInviteTabs() {

  const {
    guest,
    rows,
    invitedGuest,
    setInvitedGuest,
    eventID,
    setEventID } = useContext(eventContext);

  const [value, setValue] = React.useState('1');
  const [searchTerm, setSearchTerm] = useState("");

  const eventId = useParams();

  const [invitedGuestID, setInvitedGuestID] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const guestList = [...invitedGuest];


  const handleSet = () => {

    setEventID(eventId.name);
    console.log("event idd", eventID)

    const selectedGuest = guest.filter((guest) => {

      if (invitedGuestID.includes(guest.id)) {
        return guest;
      }

    })

    selectedGuest.map((guest) => {


      if (guestList.includes(guest)) {

        alert("already Invited")

      }
      else {

        guestList.push(guest);
      }
    })

    setInvitedGuest(guestList);
    localStorage.setItem("invited_guest_"+eventID, JSON.stringify(guestList))
  }






  return (


    <>
      <Container sx={{ marginTop: '20px' }}>


        <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>

          <TextField onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />

          <Box sx={{ alignSelf: 'center' }}>
            <Stack direction="row">


              <Button onClick={handleSet} variant="contained" color="primary" sx={{ mr: 2 }} >

                Invite Guests
              </Button>


              <Link to='/GuestStepperForm' style={{ textDecoration: 'none' }}>

                <Button variant="contained" color="success" >
                  Add Guest
                </Button>
              </Link>

            </Stack>
          </Box>

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
                <Guests searchTerm={searchTerm} setInvitedGuestID={setInvitedGuestID} />
              </TabPanel >
              <TabPanel value="2"><InvitedGuest searchTerm={searchTerm} /></TabPanel>
              <TabPanel value="3"></TabPanel>

            </TabContext>
          </Box>
        </AppBar>
      </Container>



    </>

  );
}

