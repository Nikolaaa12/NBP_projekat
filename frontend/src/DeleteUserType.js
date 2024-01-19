import { IonIcon } from '@ionic/react';
import {logoFacebook, logoTwitter, mail, lockClosed} from 'ionicons/icons';
import './Log-In.css';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom'; 
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavDropdown} from 'react-bootstrap';


    function DeleteUserType(){ 
        const [userTypes, setUserTypes] = useState([]);
  
        const handleTypeClick = (typeId) => {
            // Redirect to the corresponding type page
            // Implement your navigation logic here
            console.log(`Redirect to type with ID: ${typeId}`);
            
          };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5105/api/UserType/Get', {
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
          setUserTypes(data);
        } catch (error) {
          console.error('Error fetching user types:', error);
        }
      };
  
      fetchData();
    }, []);

  return(<>
    <NavDropdown title="Handyman" id="collapsible-nav-dropdown">
                {userTypes.map((type) => (
                  <NavDropdown.Item key={type.id} onClick={() => handleTypeClick(type.id)}>
                    {type.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
    </>
  )
}
    
export default DeleteUserType;