import React, { useEffect, useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import OurNavbar from './Navbar';
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

    const handleTypeClick = (typeId, typeName) => {
      // Redirect to the corresponding type page
      // Implement your navigation logic here
      console.log(`Redirect to type with ID: ${typeId}`);
      navigate(`/fixers/${typeId}/${typeName}`);
    };

  return (
    <>
    <div className='background'>
        <img className='background-img' src={background} alt="Description of the image" />
        <div className='animation-text'><h2><Typewriter words={['Book trusted help for home tasks.', 'Get help Today.']} loop={infinite} typeSpeed={50} deleteSpeed={50}></Typewriter><Cursor/></h2></div>
    </div>
    
    </>
  );
}

export default Home;