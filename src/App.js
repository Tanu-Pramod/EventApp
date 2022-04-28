import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Events from './Pages/Events';
import React from 'react';

import GuestStepperForm from './components/GuestStepperForm';
import GuestDetail from './components/GuestDetail';
import GuestCRUD from './Pages/GuestCRUD';
import GuestAddInviteTabs from './components/GuestAddInviteTabs';




function App() {
  const [rows, setRows] = useState([]);
  const [guest, setGuest] = useState([]);
const [invitedGuest,setInvitedGuest] = useState([]);
  const [isGuestPage, setIsGuestPage] = useState(false);
  const [guestData, setGuestData] = useState({
    name: '',
    id: new Date().getTime(),
    age: '',
    gender:'',
    img:null,
    email: '',
    contact: '',
    address:'',
    account_no: '',
  
  })

  


  useEffect(() => {
    const eventList = JSON.parse(localStorage.getItem("event_list"))
    setRows(eventList || [])
    const guestList = JSON.parse(localStorage.getItem("guest_list"))
    setGuest(guestList || [])
    const invitedGuestList = JSON.parse(localStorage.getItem('invited_guest'))
    setInvitedGuest(invitedGuestList || [])
  }, [])

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to="/Events" />} />
          <Route path='/Events' element={<Events  isGuestPage={isGuestPage} setIsGuestPage={setIsGuestPage} guest={guest} setGuest={setGuest} rows={rows} setRows={setRows} />} />
          <Route path='/Guests' element={<GuestCRUD  guest={guest} setGuest={setGuest} isGuestPage={isGuestPage} setIsGuestPage={setIsGuestPage} guestData={guestData} setGuestData={setGuestData} setInvitedGuest={setInvitedGuest} />} />
          <Route path='/GuestStepperForm' element={<GuestStepperForm guest={guest} setGuest={setGuest} isGuestPage={isGuestPage} setIsGuestPage={setIsGuestPage} guestData={guestData} setGuestData={setGuestData} />} />
          <Route path='/GuestDetail/:id' element={<GuestDetail guest={guest} />} />
          <Route path='/guestAddInviteTab/:name' element={<GuestAddInviteTabs  guest={guest} setGuest={setGuest} isGuestPage={isGuestPage} setIsGuestPage={setIsGuestPage} guestData={guestData} setGuestData={setGuestData} invitedGuest={invitedGuest} setInvitedGuest={setInvitedGuest} />} />
          
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
