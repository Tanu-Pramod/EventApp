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
import axios from 'axios';


export const eventContext = createContext();


function App() {
  const [events, setEvents] = useState([]);
  const [guest, setGuest] = useState([]);
  const [invitedGuest, setInvitedGuest] = useState([]);
  const [isGuestPage, setIsGuestPage] = useState(false);
  const [eventID, setEventID] = useState('');

  const [eventt, setEventt] = useState({})
  const [guestData, setGuestData] = useState({
    guest_name: '',
    _id: new Date().getTime(),
    age: '',
    gender: '',
    image: null,
    email: '',
    contact: '',
    address: '',
    account_no: '',

  })
 






  useEffect(() => {


    axios.get("http://localhost:3000/list").then(
      (response) => {
        const event = response.data.data
        const eData = event.map((ev) => {

          const d = new Date(ev.date);
          d.toLocaleDateString();

          return {
            _id: ev._id,
            event_name: ev.event_name,
            date: d,
            venue: ev.venue
          }
        })
        
        setEvents(eData)

      }
    )




    axios.get("http://localhost:3000/guestIndex/guestlist").then((response) => {
      setGuest(response.data.data)
    })



  }, [])






  useEffect(() => {
    const invitedGuestList = JSON.parse(localStorage.getItem("invited_guest_" + eventID))
    setInvitedGuest(invitedGuestList || [])
  }, [eventID])


  return (
    <div className="App">
      <eventContext.Provider value={{ events, setEvents, guest, setGuest, invitedGuest, setInvitedGuest, isGuestPage, setIsGuestPage, guestData, setGuestData, eventID, setEventID }}>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate replace to="/Events" />} />
            <Route path='/Events' element={<Events />} />
            <Route path='/Guests' element={<GuestCRUD />} />
            <Route path='/GuestStepperForm' element={<GuestStepperForm />} />
            <Route path='/GuestDetail/:id' element={<GuestDetail />} />
            <Route path='/EventDetail/:id' element={<GuestAddInviteTabs />} />

          </Routes>

        </BrowserRouter>
      </eventContext.Provider>

    </div>
  );
}

export default App;
