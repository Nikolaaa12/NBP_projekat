import React, { useEffect, useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import OurNavbar from './Navbar';
import './App.css';
import { IonIcon, IonSelect, IonLabel, IonSelectOption } from '@ionic/react'; // Import IonIcon from the '@ionic/react' package
import { infinite, person } from 'ionicons/icons';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import background from './background.jpg';
import { Typewriter, Cursor } from 'react-simple-typewriter'

function Home() {
  const navigate = useNavigate();
  const [userTypes, setUserTypes] = useState([]);
  const [bestUsers, setBestUsers] = useState([]);

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

  useEffect(() => {
    const fetchBestUsers = async () => {
      try {
        const response = await fetch('http://localhost:5105/api/User/GetAll', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Calculate the difference between upVotes and downVotes for each user
        data.forEach(user => {
          user.difference = user.upVotes - user.downVotes;
        });

        // Sort the users based on the calculated difference in descending order
        const sortedUsers = data.sort((a, b) => b.difference - a.difference);

        // Select the top three users with the highest differences
        const topThreeUsers = sortedUsers.slice(0, 3);

        setBestUsers(topThreeUsers);
      } catch (error) {
        console.error('Error fetching best users:', error);
      }
    };

    fetchBestUsers();
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
        <div className='animation-text'><h2><Typewriter words={['Book trusted help for home tasks.', 'Get help Today.']} loop={infinite} typeSpeed={50} deleteSpeed={50}></Typewriter><Cursor /></h2></div>
      </div>
      <h2 className='recommended-title'>Recommended fixers</h2>
      <div className="bestFixers">
        {bestUsers.map(user => (
          <div className='oneBestFixer'>
            <div className='nameLastName'>
              <h3>{user.name}</h3>
              <h3>{user.lastName}</h3>
            </div>
            <h4>{user.email}</h4>
            <p>Price: {user.pricePerHour}$</p>
            <div>
              <p>Likes: {user.upVotes}</p>
              <p>Dislikes: {user.downVotes}</p>
            </div>
          </div>
        ))}
       </div>
    </>
  );
}

export default Home;