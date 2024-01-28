import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Link, Route,useNavigate} from 'react-router-dom'
import Home from './Home';
import LogIn from './LogIn';
import Register from './Register';
import Fixers from './Fixers';
import Profile from './Profile';
import Edit from './Edit';
import MyReservations from './MyReservation';
import DeleteUT from './DeleteUserType';
import DeleteUserType from './DeleteUserType';
import OurNavbar from './Navbar';
import AddUserType from './AddUserType';
import DeleteUser from './DeleteUser';

function App() {

  

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(-1);
  //const Navigate = useNavigate();

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:5105/api/User/GetUser', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            mode: 'cors',
          });

          if (response.status !== 200) {
           // <Navigate to="/login" />;
            return;
          }

          const content = await response.json();
          setUsername(content.username);
          setUserId(content.id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    )();
  }, [userId]);


  return (
    <>
       <BrowserRouter>
       <OurNavbar userId={userId} />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn setUsername={setUsername} setUserId={setUserId}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/fixers/:userTypeId/:userTypeName/:logovanikorisnik" element={<Fixers />} />
          <Route path="/addusertype" element={<AddUserType/>} />
          <Route path="/deleteUT" element={<DeleteUserType />} />
          <Route path="/deleteUser" element={<DeleteUser />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/editprofile" element={<Edit />} />
          <Route path="/myreservations" element={<MyReservations />} />
          
        </Routes>
       </BrowserRouter>
       <div>{userId}</div>
    </>
  );
}


export default App;
