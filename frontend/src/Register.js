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
import { useNavigate  } from 'react-router-dom'; 
import Axios from 'axios'
import { SyntheticEvent, useState } from "react";
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, mail } from 'ionicons/icons';
import './Register.css';
import { Button } from 'react-bootstrap';
import OurNavbar from './Navbar';

function Register (){
  const navigate = useNavigate();
  const url = "http://localhost:5105/api/User/Register"
    const [data,Setdata]= useState({
        name: "",
        lastname:"",
        username:"",
        email: "",
        city:"",
        price:"",
        description:"",
        password: "",
        repeatedPassword:"",
        picture:"",
        userTypeId:"1"
    })
    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            name:data.name,
            lastname:data.lastname,
            username:data.username,
            email:data.email,
            city:data.city,
            price:parseInt(data.price),
            description:data.description,
            password:data.password,
            repeatedPassword:data.repeatedPassword,
            picture:data.picture,
            userTypeId:parseInt(data.userTypeId)
        })
        .then(res=>{
            console.log(res.data);
            navigate('/login');
            
        })
    }
    function handle(e){
        const newdata={...data}
        newdata[e.target.id]=e.target.value
        Setdata(newdata)
        console.log(newdata)
    }
  return (
    <>
    <form onSubmit={(e)=>submit(e)} className="form-signin">
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#555' }}>
            Sign up <br />
            <span style={{ color: '#2B3035' }}>To get best offers for scheduling handymen</span>
          </h1>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput onChange={(e)=>handle(e)} id = "name" value = {data.name} wrapperClass='mb-4' label='First name' type='text' required />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput onChange={(e)=>handle(e)} id = "lastname" value = {data.lastname} wrapperClass='mb-4' label='Last name' type='text' required />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput onChange={(e)=>handle(e)} id = "city" value = {data.city} wrapperClass='mb-4' label='Location'  type='text' required  />
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput onChange={(e)=>handle(e)} id = "price" value = {data.price} wrapperClass='mb-4' label='Price'  type='number' required />
                </MDBCol>
              </MDBRow>
              <div className='kont'>
              <MDBInput onChange={(e)=>handle(e)} id = "username" value = {data.username} wrapperClass='mb-4' label='User name'  type='text' required  />
                <MDBInput onChange={(e)=>handle(e)} id = "email" value = {data.email} wrapperClass='mb-4' label='Email'  type='email' required  />
                <MDBInput onChange={(e)=>handle(e)} id = "password" value = {data.password} wrapperClass='mb-4' label='Password'  type='password' required  />
                <MDBInput onChange={(e)=>handle(e)} id = "repeatedPassword" value = {data.repeatedPassword} wrapperClass='mb-4' label='Repeat Password'  type='password' required />
                <MDBTextArea onChange={(e)=>handle(e)} id = "description" value = {data.description} wrapperClass='mb-4' label='Description'  type='text' required  />
               


                <Button submit="true" style={{ backgroundColor: '#2B3035', border: 'none' }} type = 'submit' className='w-100 mb-4' size='md'>Sign up</Button>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </form>
    </>
  );
};

export default Register;