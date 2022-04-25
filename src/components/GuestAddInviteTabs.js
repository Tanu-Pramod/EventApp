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
  const [isSearch, setIsSearch] = useState(false);
  const [filteredGuest, setFilteredGuest] = useState();
  const [searchedInvitedGuest,setSearchedInvitedGuest] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  props.setIsGuestPage(false);


  useEffect(() => {

    const filteredGuest = props.guest.filter((guest) => {

      if (searchTerm === "") {
        return guest
      }
      else if (guest.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return guest
      }
    })

    setFilteredGuest(filteredGuest)

    
  }, [searchTerm])
  useEffect(()=>{
    const filteredInvitedGuest = props.invitedGuest.filter((guest)=>{
      if(searchTerm === ""){
        return guest
      }
      else if(guest.name.toLowerCase().includes(searchTerm.toLowerCase())){
        return guest
      }
    })
    setSearchedInvitedGuest(filteredInvitedGuest)
  },[searchTerm])
  

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return ( 
 

    <>
     <Container sx={{marginTop:'20px'}}>
      

      <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-between', mb: 2 }}>

        <TextField onFocus={() => { setIsSearch(true) }} onBlur={() => { setIsSearch(false) }} onChange={(e) => { setSearchTerm(e.target.value); }} id="outlined-basic" label="Search here" variant="outlined" />


        <Stack direction="row">

          <Link to="" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }} >
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
              <Guests guest={props.guest} invitedGuest={props.invitedGuest} setInvitedGuest={props.setInvitedGuest} isSearch={isSearch} searchTerm={searchTerm} filteredGuest={filteredGuest} />
            </TabPanel >
            <TabPanel value="2"><InvitedGuest isSearch={isSearch} searchTerm={searchTerm} filteredGuest={filteredGuest} invitedGuest={props.invitedGuest} searchedInvitedGuest={searchedInvitedGuest} /></TabPanel>
            <TabPanel value="3"></TabPanel>

          </TabContext>
        </Box>
      </AppBar>
    </Container>

  

</>
   
  );
}

