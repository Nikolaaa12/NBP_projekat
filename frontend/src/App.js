import React, { useState, useEffect } from 'react';
import { Navbar, Nav,Container, NavDropdown, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
      // Definišite URL ka .NET backend-u
      const apiUrl = 'http://localhost:5105/api/test';

      // Izvršite HTTP GET zahtev ka .NET backend-u
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error:', error));
  }, []); // Prazan niz znači da će se useEffect izvršiti samo jednom nakon prvog renderovanja komponente




  return (
      <div className="App">
          <AppNavbar></AppNavbar>
      </div>
  );
}
const AppNavbar = () => {
    return (
        <div className="navbar">
            <div> Majstori </div>
            <div> FixUp </div>
            <div>
                <div> Login </div>
                <div> Register </div>
            </div>

        </div>
    );
  };
  
export default App;
