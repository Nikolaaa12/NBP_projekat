import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import { IonIcon, IonSelect, IonLabel, IonSelectOption } from '@ionic/react'; // Import IonIcon from the '@ionic/react' package
import { infinite, person } from 'ionicons/icons';


function OurNavbar({ userId }) {

  const navigate = useNavigate();
  var logovanikorisnik = parseInt(userId);
  const [userTypes, setUserTypes] = useState([]);
  const [user, setUser] = useState({
    email: '',
    username: '',
    name: '',
    admin:false,
    lastName: '',
    city: '',
    description: '',
    pricePerHour: 0,
    // ... other properties
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data only if the user is logged in (userId is not -1)
        if (logovanikorisnik !== -1) {
          const userResponse = await fetch(`http://localhost:5105/api/User/GetUserbyId?id=${logovanikorisnik}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
          });

          if (!userResponse.ok) {
            throw new Error(`HTTP error! Status: ${userResponse.status}`);
          }

          const userData = await userResponse.json();
          setUser(userData);
          console.log(user);
        }

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
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [logovanikorisnik]);
  const handleTypeClick = (typeId, typeName) => {
    // Redirect to the corresponding type page
    // Implement your navigation logic here
    console.log(`Redirect to type with ID: ${typeId}`);
    navigate(`/fixers/${typeId}/${typeName}/${logovanikorisnik}`);
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
                  <NavDropdown.Item key={type.id} onClick={() => handleTypeClick(type.id, type.name)}>
                    {type.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {user.admin && (
                <NavDropdown title="Add" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/addusertype">Add User Type</NavDropdown.Item>
                </NavDropdown>
              )}

              {user.admin && (
                <NavDropdown title="Delete" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/deleteUser">Delete User</NavDropdown.Item>
                  <NavDropdown.Item href="/deleteUT">Delete User Type</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              {logovanikorisnik === -1 ? (
                <>
                  <Nav.Link href='/login'>Log-In</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              ) : (
                <div className='profile-icon-image'>
                  <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href={`/profile/${logovanikorisnik}`}>My profile</NavDropdown.Item>
                    <NavDropdown.Item href="/editprofile">Edit profile</NavDropdown.Item>
                    <hr />
                    <NavDropdown.Item href="/myreservations">My reservations</NavDropdown.Item>
                    <hr />
                    <NavDropdown.Item href="#action/3.6">Log out</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link><IonIcon icon={person}></IonIcon></Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default OurNavbar;