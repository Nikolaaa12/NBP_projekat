import React, { useEffect } from 'react';
import './App.css';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import Home from './Home';
import LogIn from './LogIn';
import Register from './Register';

function App() {

  

  useEffect(() => {
      // Definišite URL ka .NET backend-u
      const apiUrl = 'http://localhost:5105/api/test';
      WebFont.load({
        google: {
          families: ['Droid Sans', 'Chilanka', 'Lemon']
        }
      });
  }, []); // Prazan niz znači da će se useEffect izvršiti samo jednom nakon prvog renderovanja komponente
 

  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
       </BrowserRouter>
    </>
  );
}


export default App;
