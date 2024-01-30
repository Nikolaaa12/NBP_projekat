import { useState, useEffect } from 'react';
import plumbing from '../src/plumbing-logos.jpg';
import { MDBInput } from 'mdb-react-ui-kit';
import { useParams, useNavigate, Route  } from 'react-router-dom';
import Axios from 'axios';
import { Cursor } from 'react-simple-typewriter';

function MyReservations() {
  const { logovanikorisnik } = useParams();
  const id = parseInt(logovanikorisnik);
  const [reservations, setReservations] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  
  const handleWrapperClick = (userId) => {
    // Handle the click event, e.g., navigate to the profile page
    // You can use the useHistory hook or any navigation method you prefer
    console.log(`Clicked on user with ID: ${userId}`);
    navigate(`/profile/${userId}/${id}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5105/api/Reservation/GetByHandyman?id=${id}`, {
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

        const data = await response.json();
        setReservations(data);

        const usersData = await Promise.all(
          data.map(async (reservation) => {
            const userResponse = await fetch(`http://localhost:5105/api/User/GetUserbyId?id=${reservation.idCustomer}`, {
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

            return await userResponse.json();
          })
        );

        setUserDetails(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  function submit(e,id){
    e.preventDefault()
    const isConfirmed = window.confirm('Are you sure you want to cancel this reservation?');

  if (!isConfirmed) {
    // User clicked "Cancel" in the confirmation dialog
    return;
  }
    const deleteId = parseInt(id);
    const uri = `http://localhost:5105/api/Reservation/Delete?id=${deleteId}`;
    Axios.delete(uri)
    .then(() => {
      console.log('Delete successful');
      window.location.reload();
      // Optionally, you can update the userTypes state to reflect changes in the UI
  })
  .catch(error => {
      console.error('Delete failed:', error);
  });
  }

  return (
    <div>
      <h2 className='reservations-title' style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold', marginTop: '5rem'}}>My reservations</h2>
      <table className='table'>
          <thead className='table-head'>
            <tr>
              <th>Customer name</th>
              <th>Customer lastname</th>
              <th>Customer email</th>
              <th>Reservation date</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {reservations.map((reservation, index)=>(
              <tr key={index}>
                <td className='hover-cont' style={{cursor: 'pointer'}}  onClick={() => handleWrapperClick(reservation.idCustomer)}>
                  {userDetails[index] && userDetails[index].name}
                </td>
                <td className='hover-cont' style={{cursor: 'pointer'}} onClick={() => handleWrapperClick(reservation.idCustomer)}>
                  {userDetails[index] && userDetails[index].lastName}
                </td>
                <td className='hover-cont' style={{cursor: 'pointer'}} onClick={() => handleWrapperClick(reservation.idCustomer)}>
                  {userDetails[index] && userDetails[index].email}
                </td>
                <td>
                  {reservation.date}
                </td>
                <td>
                  <button className='cancelbtn' onClick={(e) => submit(e, reservation.id)}>Cancel reservation</button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}

export default MyReservations;
