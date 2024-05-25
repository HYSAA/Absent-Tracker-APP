import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Calendar from './calendar/calendar.jsx';
import Navbar from './navbar/myNavbar.jsx';

const App = () => {
  return (

    <Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
    </Navbar>
  );
};

export default App;

