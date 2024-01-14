import React, { useState, useEffect } from 'react';
import './App.css';
import { IonIcon, IonSelect, IonLabel, IonSelectOption } from '@ionic/react'; // Import IonIcon from the '@ionic/react' package
import { infinite, person } from 'ionicons/icons';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import background from './background.jpg';
import {Typewriter, Cursor} from 'react-simple-typewriter'

function Home() {



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
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand href="/">FixHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Handyman" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Plumber</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Carpenter
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Electrician</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href='/login'>Log-In</Nav.Link>
            <Nav.Link eventKey={2} href="/register">
              Register
            </Nav.Link>
            <div className='profile-icon-image'>
            <NavDropdown title="Profile" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.4">My profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Settings
              </NavDropdown.Item>
              <hr/>
              <NavDropdown.Item href="#action/3.6">Log out</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link><IonIcon icon={person}></IonIcon></Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='background'>
        <img className='background-img' src={background} alt="Description of the image" />
        <div className='animation-text'><h2><Typewriter words={['Book trusted help for home tasks.', 'Get help Today.']} loop={infinite} typeSpeed={50} deleteSpeed={50}></Typewriter><Cursor/></h2></div>
    </div>
    </>
  );
}

export default Home;