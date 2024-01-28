import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Profile.css';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import OurNavbar from './Navbar';
import { IonIcon } from '@ionic/react';
import { thumbsDown, thumbsUp } from 'ionicons/icons';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    email: '',
    username: '',
    name: '',
    lastName: '',
    city: '',
    description: '',
    pricePerHour: 0,
    // ... other properties
  });
  const [userType, setUserType] = useState({
    name: '',
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`http://localhost:5105/api/User/GetUserbyId?id=${userId}`, {
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
        console.log(userId);
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch user type details based on typeId
        const userTypeResponse = await fetch(`http://localhost:5105/api/UserType/GetOne?id=${userData.typeOfUser}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
        });

        if (!userTypeResponse.ok) {
          throw new Error(`HTTP error! Status: ${userTypeResponse.status}`);
        }

        const userTypeData = await userTypeResponse.json();
        setUserType(userTypeData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

  }, [userId]);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const incrementLikes = () => {
    if (!liked) {
      setUser(prevState => ({
        ...prevState,
        upVotes: prevState.upVotes + 1,
      }));
      setLiked(true);
      setDisliked(false); // Reset dislike status
    }
  };

  const incrementDislikes = () => {
    if (!disliked) {
      setUser(prevState => ({
        ...prevState,
        downVotes: prevState.downVotes + 1,
      }));
      setDisliked(true);
      setLiked(false); // Reset like status
    }
  };

    
    return (
      <>
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
                      <MDBCardText>{userType.name}</MDBCardText>
                      <div className='likeAndDislike'>
                        <IonIcon  onClick={incrementLikes} className={`iconLD ${liked ? 'active' : ''}`} icon={thumbsUp}></IonIcon>
                        <IonIcon onClick={incrementDislikes} className={`iconLD ${disliked ? 'active' : ''}`} icon={thumbsDown}></IonIcon>
                      </div>
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Personal information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Username</MDBTypography>
                            <MDBCardText className="text-muted">{user.username}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">First name</MDBTypography>
                            <MDBCardText className="text-muted">{user.name}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Last name</MDBTypography>
                            <MDBCardText className="text-muted">{user.lastName}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Likes</MDBTypography>
                            <MDBCardText className="text-muted">{user.upVotes}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Dislikes</MDBTypography>
                            <MDBCardText className="text-muted">{user.downVotes}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">City</MDBTypography>
                            <MDBCardText className="text-muted">{user.city}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="10" className="mb-3">
                            <MDBTypography tag="h6">Description</MDBTypography>
                            <MDBCardText className="text-muted">{user.description}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
    
                        <MDBTypography tag="h6">Price information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Price</MDBTypography>
                            <MDBCardText className="text-muted">{user.pricePerHour} $</MDBCardText>
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
      </>
      );
    }
export default Profile;