import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState, createContext } from 'react'
import Events from './Pages/Events';
import React from 'react';

import GuestStepperForm from './components/GuestStepperForm';
import GuestDetail from './components/GuestDetail';
import GuestCRUD from './Pages/GuestCRUD';
import GuestAddInviteTabs from './components/GuestAddInviteTabs';
import Context from '@mui/base/TabsUnstyled/TabsContext';


export const eventContext = createContext();


function App() {
  const [rows, setRows] = useState([]);
  const [guest, setGuest] = useState([]);
  const [invitedGuest, setInvitedGuest] = useState([]);
  const [isGuestPage, setIsGuestPage] = useState(false);
  const [eventID,setEventID] =  useState('');
  const [guestData, setGuestData] = useState({
    name: '',
    id: new Date().getTime(),
    age: '',
    gender: '',
    img: null,
    email: '',
    contact: '',
    address: '',
    account_no: '',

  })





  useEffect(() => {
    const eventList = JSON.parse(localStorage.getItem("event_list"))
    setRows(eventList || [])
    const guestList = JSON.parse(localStorage.getItem("guest_list"))
    setGuest(guestList || [])
   
   
  }, [])

  useEffect(()=>{
    const invitedGuestList = JSON.parse(localStorage.getItem("invited_guest_"+eventID))
    setInvitedGuest(invitedGuestList || [])
  },[eventID])


  return (
    <div className="App">
      <eventContext.Provider value={{ rows, setRows, guest, setGuest, invitedGuest, setInvitedGuest, isGuestPage, setIsGuestPage, guestData, setGuestData,eventID,setEventID }}>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate replace to="/Events" />} />
            <Route path='/Events' element={<Events />} />
            <Route path='/Guests' element={<GuestCRUD />} />
            <Route path='/GuestStepperForm' element={<GuestStepperForm />} />
            <Route path='/GuestDetail/:id' element={<GuestDetail />} />
            <Route path='/guestAddInviteTab/:name' element={<GuestAddInviteTabs />} />

          </Routes>

        </BrowserRouter>
      </eventContext.Provider>

    </div>
  );
}

export default App;
