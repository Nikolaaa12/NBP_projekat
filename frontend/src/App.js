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

function App() {

  

  const [username, setUserName] = useState('');
  const [userId, setUserId] = useState(-1);
  

    

  return (
    <>
       <BrowserRouter>
       <OurNavbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fixers/:userTypeId/:userTypeName" element={<Fixers />} />
          <Route path="/addusertype" element={<AddUserType/>}></Route>
          <Route path="/deleteUT" element={<DeleteUserType />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<Edit />} />
          <Route path="/myreservations" element={<MyReservations />} />
          
        </Routes>
       </BrowserRouter>
    </>
  );
}


export default App;
