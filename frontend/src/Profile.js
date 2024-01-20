import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Profile.css';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Profile() {

    const [users, setUser] = useState([]);
    const typeId = 2; // Replace with the actual type ID you want to fetch

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5105/api/User/GetUserbyId?id=${typeId}`, {
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
            setUser(data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
      }, [typeId]);
  
      const [userType, setUserType] = useState(null);

     useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await fetch('http://localhost:5105/api/UserType/GetOne?id=1', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                  },
                });
        
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();
                setUserType(data);
              } catch (error) {
                console.error('Error fetching user type:', error);
              }
            };
        
            fetchData();
          }, []);
          
    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom-dark text-center text-white"
                      style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />                    
                      <MDBCardText>Web Designer</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Personal information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{userType.name}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Username</MDBTypography>
                            <MDBCardText className="text-muted">{users.username}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">First name</MDBTypography>
                            <MDBCardText className="text-muted">{users.name}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Last name</MDBTypography>
                            <MDBCardText className="text-muted">{users.lastName}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">City</MDBTypography>
                            <MDBCardText className="text-muted">{users.city}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="10" className="mb-3">
                            <MDBTypography tag="h6">Description</MDBTypography>
                            <MDBCardText className="text-muted">{users.description}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
    
                        <MDBTypography tag="h6">Price information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Price</MDBTypography>
                            <MDBCardText className="text-muted">{users.pricePerHour} $</MDBCardText>
                          </MDBCol>
                        </MDBRow>
    
                        <div className="d-flex justify-content-start">
                          <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      );
    }
export default Profile;