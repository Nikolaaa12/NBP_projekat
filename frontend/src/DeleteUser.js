import {useState} from 'react';
import { useEffect } from 'react';
import Axios from 'axios';

function DeleteUser(){

  const [userTypes, setUserTypes] = useState([]);
  const [user, setUser] = useState([]);
  const [value, setValue] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleteUserId, setDeleteUserId]=useState(null);
  
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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5105/api/User/GetUsersbyTypeId?id=${deleteId}`, {
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
            setUser(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    if (deleteId !== null) {
        fetchData();
    }
}, [deleteId]);




  function handleSelect(event) {
    setValue(event.target.value);
    console.log(event.target.value);
    setDeleteId(parseInt(event.target.value)); // Update deleteId when value changes
}

  function handleSelect1(event){
    setDeleteUserId(parseInt(event.target.value));
  }

  function submit(e){
    e.preventDefault();
    const deleteIdForUser=deleteUserId;
    const uri = `http://localhost:5105/api/User/Delete?id=${deleteIdForUser}`;
    Axios.delete(uri)
      .then(() => {
        console.log('Delete successful');
        // Optionally, you can update the userTypes state to reflect changes in the UI
    })
    .catch(error => {
        console.error('Delete failed:', error);
    });
  }

    return(
        <>
        <form onSubmit={submit} className='container1'>
                <div className='header'>
                    <div className='text'>
                      Delete User
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='selector' style={{display: 'flex', gap: '1rem'}}>
                  <h4>Choose UserType to delete</h4>
                  <select onChange={handleSelect}>
                  {userTypes.map(user=>(
                      <option value={user.id}>{user.name}</option>
                    ))}
                  </select>
                  <h4>Choose user to delete</h4>
                  <select onChange={handleSelect1}>
                  {user.map(user=>(
                      <option value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                <button type='submit' submit="true" className='sign-in'>Delete</button>
                </form>
    </>
    )
}

export default DeleteUser;