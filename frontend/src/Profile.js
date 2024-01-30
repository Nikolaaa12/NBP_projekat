import { ToastContainer, toast } from 'react-toastify';
import { MDBCol, MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Profile.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OurNavbar from './Navbar';
import { IonIcon } from '@ionic/react';
import { thumbsDown, thumbsUp } from 'ionicons/icons';
import profileIcon from './profile-icon.png';

function Profile() {
  const { userId, logovanikorisnik } = useParams();
  const [user, setUser] = useState({
    email: '',
    username: '',
    name: '',
    lastName: '',
    city: '',
    description: '',
    customer: true,
    pricePerHour: 0,
    adress: '',
    upVotes: 0,
    downVotes: 0,
    phoneNumber: ''
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
        console.log(userData.customer)
        setUser(userData);
        if (!userData.customer) {
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
        }
      }
      catch (error) {
        console.error('Error fetching user data:', error);
      }
      // Fetch user type details based on typeId

    };

    fetchData();

  }, [userId]);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const callliked = async () => {
    try {
      const response = await fetch(`http://localhost:5105/api/User/UpVote?id=${userId}`, {
        method: 'PUT',
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

      // You can handle the response here if needed
      const data = await response.json();
      console.log(data);

      toast.success('Liked successfully!', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error liking user:', error);
      toast.error('Error liking user', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    }
  };
  const calldisliked = async () => {
    try {
      const response = await fetch(`http://localhost:5105/api/User/DownVote?id=${userId}`, {
        method: 'PUT',
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

      // You can handle the response here if needed
      const data = await response.json();
      console.log(data);

      toast.success('Disliked!', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error disliking user:', error);
      toast.error('Error disliking user', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    }
  };

  const incrementLikes = () => {
    if (logovanikorisnik !== '-1') {
      if (logovanikorisnik != userId) {
        if (!liked) {
          setLiked(true);
          callliked();
          setUser(prevState => ({
            ...prevState,
            upVotes: prevState.upVotes + 1,
          }));
        }
        else {
          toast.error('You already liked this person', {
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            autoClose: 3000,
          });
        }
      }
      else {
        toast.error('You cannot like yourself', {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });
      }
    }
    else {
      toast.error('You need to be logged in to like', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    }
  };

  const incrementDislikes = () => {
    if (logovanikorisnik !== '-1') {
      if (logovanikorisnik !== userId) {
        if (!disliked) {
          setDisliked(true);
          calldisliked();
          setUser(prevState => ({
            ...prevState,
            downVotes: prevState.downVotes + 1,
          }));
        }
        else {
          toast.error('You already disliked this person', {
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body',
            autoClose: 3000,
          });
        }
      }
      else {
        toast.error('You cannot dislike yourself', {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });
      }
    }
    else {
      toast.error('You need to be logged in to dislike', {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    }
  };

  const [expandedDescription, setExpandedDescription] = useState(null);

  const handleDescriptionHover = (description) => {
    setExpandedDescription(description);
  };

  const handleDescriptionHoverEnd = () => {
    setExpandedDescription(null);
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
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src={profileIcon}
                      alt="Avatar" className="my-5" style={{ width: '80px', color: 'white' }} fluid />
                    {user.customer === false ? (
                      <MDBCardText>{userType.name}</MDBCardText>
                    ) : (
                      <MDBCardText>Customer</MDBCardText>
                    )}
                    <div className='likeAndDislike'>
                      <IonIcon onClick={incrementLikes} className={`iconLD ${liked ? 'active' : ''}`} icon={thumbsUp}></IonIcon>
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
                          <MDBTypography tag="h6">Phone number</MDBTypography>
                          <MDBCardText className="text-muted">{user.phoneNumber}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Adress</MDBTypography>
                          <MDBCardText className="text-muted">{user.adress}</MDBCardText>
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
                        {user.customer === false ? (
                          <MDBCol size="10" className="mb-3">
                            <MDBTypography tag="h6">Description</MDBTypography>
                            <MDBCardText style={{cursor: 'pointer'}} className="text-muted" onMouseEnter={() => handleDescriptionHover(user.description)}
                  onMouseLeave={handleDescriptionHoverEnd}>{expandedDescription === user.description ? user.description : `${user.description.slice(0, 50)}...`}</MDBCardText>
                          </MDBCol>
                        ) : (
                          <></>
                        )}

                      </MDBRow>
                      {user.customer === false ? (
                        <>
                          <MDBTypography tag="h6">Price information</MDBTypography>
                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Price</MDBTypography>
                              <MDBCardText className="text-muted">{user.pricePerHour} $</MDBCardText>
                            </MDBCol>
                          </MDBRow>
                        </>
                      ) : (
                        <></>
                      )}



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
      <ToastContainer />
    </>
  );
}
export default Profile;