import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, mail, lockClosed, close } from 'ionicons/icons';
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

  


  function submit(e, id) {
    e.preventDefault();

    if (logovanikorisnik === '-1') {
      // Display an error message or redirect to the login page
      toast.error('You need to log in to schedule a service', {
        className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      autoClose: 3000,
      });
      return;
    }

  // Check if the selected date is in the past
  const currentDate = new Date();
  const selectedDate = new Date(data.date);

  if (selectedDate < currentDate) {
    // Display an error message or handle it appropriately
    toast.error('Selected date is in the past', {
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      autoClose: 3000,
    });// Notification will be closed after 3 seconds
    return;
  }
    Axios.post(url, {
      date: data.date,
      idCustomer: logovanikorisnik,
      idHandyMan: parseInt(id)
    })
      .then(res => {
        console.log(res.data)
      })
  }
  const navigate = useNavigate();
  const { userTypeId, userTypeName, logovanikorisnik } = useParams();
  //console.log(logovanikorisnik)

  const [users, setUsers] = useState([]);
  const typeId = userTypeId; // Replace with the actual type ID you want to fetch
  const handleWrapperClick = (userId) => {
    // Handle the click event, e.g., navigate to the profile page
    // You can use the useHistory hook or any navigation method you prefer
    console.log(`Clicked on user with ID: ${userId}`);
    navigate(`/profile/${userId}/${logovanikorisnik}`);
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

  const [expandedDescription, setExpandedDescription] = useState(null);

  const handleDescriptionHover = (description) => {
    setExpandedDescription(description);
  };

  const handleDescriptionHoverEnd = () => {
    setExpandedDescription(null);
  };

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    // Initialize filter criteria state
  });

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');

const applyFilters = async () => {
  try {
    // Fetch the original user data from the API
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

    const originalUsers = await response.json();

    // Parse minPrice and maxPrice as numbers
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    // Filter users based on the price range
    const filteredUsers = originalUsers.filter(user => {
      const price = parseFloat(user.pricePerHour); // Parse the price as a number

      // Check if the user's price falls within the specified range
      return (!min || price >= min) && (!max || price <= max);
    });

    // Update the user data with the filtered results
    setUsers(filteredUsers);
  } catch (error) {
    console.error('Error applying filters:', error);
  }
};


  return (

    <div>
      <h2 className='fixer-name' style={{ textAlign: 'center', fontSize: '50px' }}>Available {userTypeName}</h2>

      <div>
        <div className="button-container">
          <button onClick={toggleFilterMenu}>Filter</button>
        </div>
        <div className={`filter-menu ${showFilterMenu ? 'open' : ''}`} style={{ width: showFilterMenu ? '400px' : '0' }}>
          <IonIcon icon={close} className='closebtn' onClick={toggleFilterMenu}>Close</IonIcon>
          <div className='criteria-inputs'>
            <div>
              <p>Min price</p>
              <input type='number' value={minPrice} onChange={(e) => setMinPrice(e.target.value)}></input>
            </div>
            <div>
              <p>Max price</p>
              <input type='number' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}></input>
            </div>
          </div>
          <button className='apply-criteria' onClick={applyFilters}>Apply filters</button>
        </div>
      </div>

      <div>
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <th>Personal info</th>
              <th>Price</th>
              <th>Description</th>
              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='item-wrapper'>
                <td className='slika-podaci' onClick={() => handleWrapperClick(user.id)}>
                  <div className='personal-info' style={{ fontWeight: 'bold' }}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>First name: {user.name}</p>
                    <p>Last name: {user.lastName}</p>
                  </div>
                </td>
                <td className='cena'>
                  <h2>Price</h2>
                  {user.pricePerHour} $
                </td>
                <td className='description-cont' style={{ fontWeight: 'bold', cursor: 'pointer' }} onMouseEnter={() => handleDescriptionHover(user.description)}
                  onMouseLeave={handleDescriptionHoverEnd}>
                  {expandedDescription === user.description ? user.description : `${user.description.slice(0, 50)}...`}
                </td>
                <td className='prvi'>
                  <MDBInput onChange={(e) => handle(e)} id="date" value={data.date} wrapperClass='mb-4' type='date' required />
                  <button type="submit" onClick={(e) => submit(e, user.id)}>Schedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Fixers;