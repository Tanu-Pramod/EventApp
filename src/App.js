import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Events from './Pages/Events';
import React from 'react';
import Guests from './Pages/Guests';



function App() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const eventList = JSON.parse(localStorage.getItem("event_list"))
    setRows(eventList || [])
  }, [])

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to="/Events" />} />
          <Route path='/Events' element={<Events rows={rows} setRows={setRows} />} />
          <Route path='/Guests' element={<Guests />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
