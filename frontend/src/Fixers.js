import { IonIcon } from '@ionic/react';
import {logoFacebook, logoTwitter, mail, lockClosed} from 'ionicons/icons';
import './Log-In.css';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom'; 
import { useState,useEffect } from 'react';


    function Fixers(){ 
        const { userTypeId } = useParams();
        const [users, setUsers] = useState([]);
    const typeId = userTypeId; // Replace with the actual type ID you want to fetch

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
  return(<>
    <div>
    <h2>User List by Type ID: {typeId}</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {/* Display user information as needed */}
            {user.username}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}
    
export default Fixers;