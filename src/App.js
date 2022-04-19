import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Events from './Pages/Events';
import React from 'react';
import Guests from './Pages/Guests';
import GuestStepperForm from './components/GuestStepperForm';
import GuestDetail from './components/GuestDetail';
import FormEditLStorage from './components/FormEditLStorage';




function App() {
  const [rows, setRows] = useState([]);
  const [guest, setGuest] = useState([]);
  const [guestPage, setGuestPage] = useState(false);
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
  }, [])

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to="/Events" />} />
          <Route path='/Events' element={<Events guestPage={guestPage} setGuestPage={setGuestPage} guest={guest} setGuest={setGuest} rows={rows} setRows={setRows} />} />
          <Route path='/Guests' element={<Guests guest={guest} setGuest={setGuest} guestPage={guestPage} setGuestPage={setGuestPage} guestData={guestData} setGuestData={setGuestData} />} />
          <Route path='/GuestStepperForm' element={<GuestStepperForm guest={guest} setGuest={setGuest} guestPage={guestPage} setGuestPage={setGuestPage} guestData={guestData} setGuestData={setGuestData} />} />
          <Route path='/GuestDetail/:id' element={<GuestDetail guest={guest} />} />
          
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
