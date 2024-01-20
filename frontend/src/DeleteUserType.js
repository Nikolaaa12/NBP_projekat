import { IonIcon } from '@ionic/react';
import {logoFacebook, logoTwitter, mail, lockClosed} from 'ionicons/icons';
import './Log-In.css';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom'; 
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownToggle, DropdownButton, DropdownItem, DropdownMenu, NavDropdown} from 'react-bootstrap';
import './DeleteUserType.css';


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

    const [value, setValue]=useState('');
    function handleSelect(event){
        setValue(event.target.value);
    }

  return(<>
      <form className='container1'>
                <div className='header'>
                    <div className='text'>
                      Delete UserType
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='selector'>
                  <h4>Choose user type to delete</h4>
                  <select onChange={handleSelect}>
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>
                <button submit="true" className='sign-in'>Delete</button>
                </form>
    </>
  )
}
    
export default DeleteUserType;