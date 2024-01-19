import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Link, Route,useNavigate} from 'react-router-dom'
import Home from './Home';
import LogIn from './LogIn';
import Register from './Register';
import Fixers from './Fixers';

function App() {

  

  const [username, setUserName] = useState('');
  const [userId, setUserId] = useState(-1);
  

    

  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fixers/:userTypeId" element={<Fixers />} />
        </Routes>
       </BrowserRouter>
       <h1>{userId}</h1>
    </>
  );
}


export default App;
