import React, { useEffect, useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import './App.css';
import { IonIcon, IonSelect, IonLabel, IonSelectOption } from '@ionic/react'; // Import IonIcon from the '@ionic/react' package
import { infinite, person } from 'ionicons/icons';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import background from './background.jpg';
import {Typewriter, Cursor} from 'react-simple-typewriter'

function Home() {
  const navigate = useNavigate();
    const [userTypes, setUserTypes] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5105/api/UserType/Get', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // Include any additional headers if needed
            },
            credentials: 'include',
            mode: 'cors',
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setUserTypes(data);
        } catch (error) {
          console.error('Error fetching user types:', error);
        }
      };
  
      fetchData();
    }, []);

    const handleTypeClick = (typeId) => {
      // Redirect to the corresponding type page
      // Implement your navigation logic here
      console.log(`Redirect to type with ID: ${typeId}`);
      navigate(`/fixers/${typeId}`);
    };

  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand href="/">FixHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
              <NavDropdown title="Handyman" id="collapsible-nav-dropdown">
                {userTypes.map((type) => (
                  <NavDropdown.Item key={type.id} onClick={() => handleTypeClick(type.id)}>
                    {type.name}
                  </NavDropdown.Item>
                ))}
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