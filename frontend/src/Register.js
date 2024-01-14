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
  MDBIcon
}
from 'mdb-react-ui-kit';
import {IonIcon} from '@ionic/react'
import {logoFacebook, logoTwitter, mail} from 'ionicons/icons';
import './Register.css';
import { Button } from 'react-bootstrap';

function Register() {
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: '#555'}}>
            The best offer <br />
            <span style={{color: '#2B3035'}}>for your business</span>
          </h1>

          <p className='px-3' style={{color: '#555'}}>
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
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'/>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput  wrapperClass='mb-4' label='Age' id='form3' type='number'/>
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput  wrapperClass='mb-4' label='Price' id='form3' type='number'/>
                </MDBCol>
                </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <Button style={{backgroundColor: '#2B3035', border: 'none'}} className='w-100 mb-4' size='md'>Sign up</Button>

              <div className="text-center">

                <p>or sign up with:</p>
                  <div className='icon-wrapper' style={{display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center'}}>
                    <div className='icon-div'>
                    <IonIcon color='red' className='icon' style={{cursor: 'pointer'}} icon={logoFacebook}></IonIcon>
                    </div>
                    <div className='icon-div'>
                    <IonIcon color='white' className='icon' style={{cursor: 'pointer'}} icon={logoTwitter}></IonIcon>
                    </div>
                    <div className='icon-div'>
                    <IonIcon color='white' className='icon' style={{cursor: 'pointer'}} icon={mail}></IonIcon>
                    </div>
                  </div>
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register;