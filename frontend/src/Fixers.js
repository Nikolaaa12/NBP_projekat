import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, mail, lockClosed } from 'ionicons/icons';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import plumbing from '../src/plumbing-logos.jpg';
import './Fixers.css';
import { MDBInput } from 'mdb-react-ui-kit';
import OurNavbar from './Navbar';


function Fixers() {
  const url = "http://localhost:5105/api/Reservation/Add"
  const [data, setData] = useState({
    date: "",
    idCustomer: "1",
    idHandyMan: "2"
  })
  function handle(e) {
    var newdata = { ...data };
    newdata[e.target.id] = e.target.value; // Use square brackets for assignment
    setData(newdata);
    console.log(newdata);
  }
  function submit(e,id) {
    console.log(data)
    Axios.post(url, {
      date: data.date,
      idCustomer: parseInt(data.idCustomer),
      idHandyMan: parseInt(id)
    })
      .then(res => {
        console.log(res.data)
      })
  }
  const navigate = useNavigate();
  const { userTypeId, userTypeName } = useParams();
  const [users, setUsers] = useState([]);
  const typeId = userTypeId; // Replace with the actual type ID you want to fetch
  const handleWrapperClick = (userId) => {
    // Handle the click event, e.g., navigate to the profile page
    // You can use the useHistory hook or any navigation method you prefer
    console.log(`Clicked on user with ID: ${userId}`);
    navigate(`/profile/${userId}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5105/api/User/GetUsersbyTypeId?id=${typeId}`, {
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
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [typeId]);
  return (

    <div>
      <h2 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold' }}>{userTypeName}</h2>
      <div>
        {users.map((user) => (
          <form onSubmit={(e) => submit(e,user.id)}>
            <div key={user.id} className='fixers-wrapper'>
              <div className='item-wrapper'>
                <div className='slika-podaci' onClick={() => handleWrapperClick(user.id)}>
                  <img src={plumbing}></img>
                  <div className='personal-info'>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>First name: {user.name}</p>
                    <p>Last name: {user.lastName}</p>
                  </div>
                </div>
                <div className='cena'>
                  <h2>Price</h2>
                  {user.pricePerHour} $
                </div>
                <div className='prvi'>
                  <MDBInput onChange={(e)=>handle(e)} id="date" value={data.date}  wrapperClass='mb-4' type='date' required />
                  <button submit="true">Schedule</button>
                </div>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>


  )
}

export default Fixers;