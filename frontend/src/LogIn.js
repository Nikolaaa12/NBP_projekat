import { IonIcon } from '@ionic/react';
import {logoFacebook, logoTwitter, mail, lockClosed} from 'ionicons/icons';
import './Log-In.css';
import Axios from 'axios'
import { useNavigate  } from 'react-router-dom'; 
import { useState } from 'react';


    function LogIn(props){  
    const navigate = useNavigate();
    const url = "http://localhost:5105/api/User/Login"
    const [data,Setdata]= useState({
        email: "",
        password: ""
    })
    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            email:data.email,
            password:data.password
        })
        .then(res=>{
            console.log(res.data);
            navigate('/');
        })
    }
    function handle(e){
        const newdata={...data}
        newdata[e.target.id]=e.target.value
        Setdata(newdata)
        console.log(newdata)
    }
    return (
        <>
        <div className='container1'>
            <form onSubmit={(e)=>submit(e)}>
            <div className='header'>
                <div className='text'>
                    Sign In
                </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <IonIcon icon={mail}></IonIcon>
                    <input onChange={(e)=>handle(e)} id = "email" value = {data.email} className='input1' type='text' placeholder='Enter email adress'></input>
                </div>
                <div className='input'>
                    <IonIcon icon={lockClosed}></IonIcon>
                    <input onChange={(e)=>handle(e)} id = "password" value = {data.password} className='input1' type='password' placeholder='Enter password'></input>
                </div>
            </div>
            <div className='forgot-password'>
                <div>Forgot password? </div>
                <a href="#smtng">Click here!</a>
            </div>
            <button submit="true" className='sign-in'>Sign In</button>
            </form>
        </div>
        </>
    );
}
    
export default LogIn;