import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBTextArea,
  MDBFile
}
  from 'mdb-react-ui-kit';
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, mail } from 'ionicons/icons';
import './Register.css';
import { Button } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [city, setcity] = useState('');
  const [profilePicture] = useState('');
  const [userTypeId] = useState('1');
  const [description, setdecription] = useState('');
  const [pricePerHour, setpricePerHour] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5105/api/User/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          LastName: lastName,
          Username: username,
          Email: email,
          City: city,
          PricePerHour: parseInt(pricePerHour, 10), // Assuming price is a string, convert it to an integer
          Description: description,
          Password: password,
          RepeatedPassword: repeatedPassword,
          ProfilePicture: profilePicture,
          UserTypeId: 1, // Update with the appropriate UserTypeId
        }),
        credentials: 'include',
        mode: 'cors',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setRedirect(true);
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle the error as needed, e.g., show an error message to the user
    }
  };
  
  if (redirect) {
    navigate('/LogIn');
  };


  return (
    <form onSubmit={submit} className="form-signin">
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#555' }}>
            The best offer <br />
            <span style={{ color: '#2B3035' }}>for your business</span>
          </h1>

          <p className='px-3' style={{ color: '#555' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' required onChange={e => setName(e.target.value)} />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' required onChange={e => setLastName(e.target.value)} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Location' id='form3' type='text' required onChange={e => setcity(e.target.value)} />
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Price' id='form4' type='number' required onChange={e => setpricePerHour(e.target.value)} />
                </MDBCol>
              </MDBRow>
              <div className='kont'>
              <MDBInput wrapperClass='mb-4' label='User name' id='form5' type='text' required onChange={e => setUserName(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Email' id='form5' type='email' required onChange={e => setEmail(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Password' id='form6' type='password' required onChange={e => setPassword(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Repeat Password' id='form7' type='password' required onChange={e => setRepeatedPassword(e.target.value)} />
                <MDBTextArea wrapperClass='mb-4' label='Description' id='form8' type='text' required onChange={e => setdecription(e.target.value)} />
                <MDBFile wrapperClass='mb-4' label='Choose Image' id='form8' type='file'></MDBFile>


                <Button style={{ backgroundColor: '#2B3035', border: 'none' }} type = 'submit' className='w-100 mb-4' size='md'>Sign up</Button>
              </div>
              <div className="text-center">

                <p>or sign up with:</p>
                <div className='icon-wrapper' style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                  <div className='icon-div'>
                    <IonIcon color='red' className='icon' style={{ cursor: 'pointer' }} icon={logoFacebook}></IonIcon>
                  </div>
                  <div className='icon-div'>
                    <IonIcon color='white' className='icon' style={{ cursor: 'pointer' }} icon={logoTwitter}></IonIcon>
                  </div>
                  <div className='icon-div'>
                    <IonIcon color='white' className='icon' style={{ cursor: 'pointer' }} icon={mail}></IonIcon>
                  </div>
                </div>
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </form>
  );
};

export default Register;