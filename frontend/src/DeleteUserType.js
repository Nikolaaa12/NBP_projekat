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

    function submit(e){
      e.preventDefault()
      const deleteId = parseInt(value);
      const uri = `http://localhost:5105/api/UserType/Delete?id=${deleteId}`;
      Axios.delete(uri)
      .then(() => {
        console.log('Delete successful');
        // Optionally, you can update the userTypes state to reflect changes in the UI
    })
    .catch(error => {
        console.error('Delete failed:', error);
    });
    }


    const [value, setValue]=useState('');

    function handleSelect(event){
        setValue(event.target.value);
        console.log(event.target.value);
    }

  return(<>
      <form onSubmit={submit} className='container1'>
                <div className='header'>
                    <div className='text'>
                      Delete UserType
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='selector'>
                  <h4>Choose user type to delete</h4>
                  <select onChange={handleSelect}>
                  {userTypes.map(user=>(
                      <option value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
          <button type='submit' submit="true" className='sign-in'>Delete</button>
      </form>
    </>
  )
}
    
export default DeleteUserType;