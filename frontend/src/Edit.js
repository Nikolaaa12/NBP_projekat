import React, {useEffect, useState} from 'react';
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


function Edit(){

    const navigate = useNavigate();
    const url = "http://localhost:5105/api/User/UpdateProfile"

    const [user, setUser] = useState({
        email: '',
        username: '',
        name: '',
        lastName: '',
        password: '',
        city: '',
        description: '',
        pricePerHour: 0,
        // ... other properties
      });
      const [userType, setUserType] = useState({
        name: '',
      });
      const { userId } = useParams();
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch user details
            const userResponse = await fetch(`http://localhost:5105/api/User/GetUserbyId?id=${1}`, {
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

      }, [userId]);

      function submit(e){
        e.preventDefault();
        Axios.put(url,{
            name:user.name,
            lastname:user.lastname,
            username:user.username,
            email:user.email,
            city:user.city,
            price:parseInt(user.price),
            description:user.description,
            password:user.password,
            repeatedPassword:user.repeatedPassword,
        })
      }

    return(
<>
<form onSubmit={(e)=>submit(e)} className="form-signin">
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
                  <MDBInput value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} id = "lastname"  wrapperClass='mb-4' label='Last name' type='text' required />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} id = "city"  wrapperClass='mb-4' label='Location'  type='text' required  />
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput value={user.pricePerHour} onChange={(e) => setUser({ ...user, pricePerHour: e.target.value })} id = "price"  wrapperClass='mb-4' label='Price'  type='number' required />
                </MDBCol>
              </MDBRow>
              <div className='kont'>
              <MDBInput value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} id = "username"  wrapperClass='mb-4' label='User name'  type='text' required  />
                <MDBInput value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id = "email"  wrapperClass='mb-4' label='Email'  type='email' required  />
                <MDBInput onChange={(e) => setUser({ ...user, password: e.target.value })} id = "password"  wrapperClass='mb-4' label=' New Password'  type='password' required  />
                <MDBInput onChange={(e) => setUser({ ...user, repeatedPassword: e.target.value })} id = "repeatedPassword"  wrapperClass='mb-4' label='Repeat Password'  type='password' required />
                <MDBTextArea value={user.description} onChange={(e) => setUser({ ...user, description: e.target.value })} id = "description"  wrapperClass='mb-4' label='Description'  type='text' required  />
               


                <Button submit="true" style={{ backgroundColor: '#2B3035', border: 'none' }} type = 'submit' className='w-100 mb-4' size='md'>Save changes</Button>
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