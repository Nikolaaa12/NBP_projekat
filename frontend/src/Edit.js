import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
}
  from 'mdb-react-ui-kit';
import Axios from 'axios'
import './Register.css';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import OurNavbar from './Navbar';


function Edit() {
  const { logovanikorisnik } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:5105/api/User/Edit"

  const [user, setUser] = useState({
    phoneNumber: '',
    id: '',
    name: '',
    lastName: '',
    adress: '',
    city: '',
    description: '',
    pricePerHour: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
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

        // Fetch user type details based on typeId
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

  }, [logovanikorisnik]);

  function submit(e) {
    e.preventDefault();
    Axios.put(url, {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      adress: user.adress,
      city: user.city,
      pricePerHour: parseInt(user.pricePerHour),
      description: user.description,
    })
  }

  return (
    <>
      <form onSubmit={(e) => submit(e)} className="form-signin">
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

          <MDBRow>

            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

              <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#333' }}>
                Edit your profile <br />
              </h1>

            </MDBCol>

            <MDBCol md='6' className='position-relative'>

              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <MDBCard className='my-5 bg-glass'>
                <MDBCardBody className='p-5'>

                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} wrapperClass='mb-4' label='First name' type='text' required />
                    </MDBCol>

                    <MDBCol col='6'>
                      <MDBInput value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} id="lastname" wrapperClass='mb-4' label='Last name' type='text' required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} id="city" wrapperClass='mb-4' label='Location' type='text' required />
                    </MDBCol>
                    <MDBCol col='6'>
                      <MDBInput value={user.pricePerHour} onChange={(e) => setUser({ ...user, pricePerHour: e.target.value })} id="price" wrapperClass='mb-4' label='Price' type='number' required />
                    </MDBCol>
                  </MDBRow>
                  <div className='kont'>
                    <MDBInput value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} id="phoneNumber" wrapperClass='mb-4' label='Phone number' type='text' required />
                    <MDBInput value={user.adress} onChange={(e) => setUser({ ...user, adress: e.target.value })} id="adress" wrapperClass='mb-4' label='Adress' type='text' required />
                    <MDBTextArea value={user.description} onChange={(e) => setUser({ ...user, description: e.target.value })} id="description" wrapperClass='mb-4' label='Description' type='text' required />
                    <Button submit="true" style={{ backgroundColor: '#2B3035', border: 'none' }} type='submit' className='w-100 mb-4' size='md'>Save changes</Button>
                  </div>

                </MDBCardBody>
              </MDBCard>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </form>
    </>
  )
}

export default Edit;