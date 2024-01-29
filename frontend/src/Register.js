import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Register.css';
import { Button } from 'react-bootstrap';

function Register() {
  const [userTypes, setUserTypes] = useState([]);
  const [data, setData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    city: '',
    price: '',
    description: '',
    password: '',
    repeatedPassword: '',
    picture: '',
    userTypeId: '',
  });

  const [isHandyman, setIsHandyman] = useState(true); // Set default to Handyman
  const [disabled, setDisabled] = useState(false); // Disable elements by default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5105/api/UserType/Get', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
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

  const navigate = useNavigate();
  const url = 'http://localhost:5105/api/User/Register';

  const submit = (e) => {
    e.preventDefault();
    Axios.post(url, {
      ...data,
      price: parseInt(data.price),
      userTypeId: parseInt(data.userTypeId),
    })
      .then((res) => {
        console.log(res.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setIsHandyman(e.target.value === 'handyman');
    setDisabled(e.target.value === 'customer');
    if (e.target.value === 'customer') {
      console.log('Da')
    }
    else {
      console.log('Ne')
    }
  };

  return (
    <>
      <form onSubmit={submit} className="form-signin">
        <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
          <MDBRow>
            <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
              <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#555' }}>
                Sign up <br />
                <span style={{ color: '#2B3035' }}>To get best offers for scheduling handymen</span>
              </h1>
            </MDBCol>
            <MDBCol md="6" className="position-relative">
              <MDBCard className="my-5 bg-glass">
                <MDBCardBody className="p-5">
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="name" value={data.name} wrapperClass="mb-4" label="First name" type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="lastname" value={data.lastname} wrapperClass="mb-4" label="Last name" type="text" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="city" value={data.city} wrapperClass="mb-4" label="Location" type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput disabled={disabled} onChange={handleInputChange} id="price" value={data.price} wrapperClass="mb-4" label="Price" type="number" required />
                    </MDBCol>
                  </MDBRow>
                  <div className="kont">
                    <MDBInput onChange={handleInputChange} id="username" value={data.username} wrapperClass="mb-4" label="User name" type="text" required />
                    <MDBInput onChange={handleInputChange} id="email" value={data.email} wrapperClass="mb-4" label="Email" type="email" required />
                    <MDBInput onChange={handleInputChange} id="password" value={data.password} wrapperClass="mb-4" label="Password" type="password" required />
                    <MDBInput onChange={handleInputChange} id="repeatedPassword" value={data.repeatedPassword} wrapperClass="mb-4" label="Repeat Password" type="password" required />
                    <MDBTextArea disabled={disabled} onChange={handleInputChange} id="description" value={data.description} wrapperClass="mb-4" label="Description" type="text" required />
                    <div className="selector">
                      <h4>Choose User Type</h4>
                      <select disabled={disabled} style={{ width: '35%' }} onChange={(e) => setData({ ...data, userTypeId: e.target.value })}>
                        {userTypes.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='radio-buttons'>
                      <div>
                        <input type="radio" id="handyman" name="userType" value="handyman" checked={isHandyman} onChange={handleUserTypeChange} />
                        <label htmlFor="handyman">Handyman</label>
                      </div>
                      <div>
                        <input type="radio" id="customer" name="userType" value="customer" checked={!isHandyman} onChange={handleUserTypeChange} />
                        <label htmlFor="customer">Customer</label>
                      </div>
                    </div>
                    <Button submit="true" style={{ backgroundColor: '#2B3035', border: 'none' }} type="submit" className="w-100 mb-4" size="md">
                      Sign up
                    </Button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </>
  );
}

export default Register;
