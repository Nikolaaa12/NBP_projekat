import { useState, useEffect } from 'react';
import plumbing from '../src/plumbing-logos.jpg';
import { MDBInput } from 'mdb-react-ui-kit';
import { useParams, useNavigate, Route  } from 'react-router-dom';
import Axios from 'axios';

function MyReservations() {
  const { logovanikorisnik } = useParams();
  const id = parseInt(logovanikorisnik);
  const [reservations, setReservations] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  

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
      <h2 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold' }}>{"Dadad"}</h2>
      <div>
        {reservations.map((reservation, index) => (
          <form key={reservation.id} onSubmit={(e) => submit(e, reservation.id)}>
            <div className='fixers-wrapper'>
              <div className='item-wrapper'>
                <div className='slika-podaci'>
                  <img src={plumbing} alt={`plumbing-${index}`} />
                  <div className='personal-info'>
                    <p>Username: {userDetails[index]?.username}</p>
                    <p>Email: {userDetails[index]?.email}</p>
                    <p>First name: {userDetails[index]?.name}</p>
                    <p>Last name: {userDetails[index]?.lastName}</p>
                  </div>
                </div>
                <div className='cena'>
                  <h2>Price</h2>
                  {reservation.idCustomer} $
                </div>
                <div className='prvi'>
                <p>Date: {reservation.date}</p>
                  <button type="submit">Cancel Reservation</button>
                </div>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

export default MyReservations;
