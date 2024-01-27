import { IonIcon } from '@ionic/react';
import {useState} from 'react';
import { logoFacebook, logoTwitter, mail, lockClosed } from 'ionicons/icons';
import './Log-In.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogIn(props) {
    const { setUserId, setUsername } = props;
    const navigate = useNavigate();
    const url = "http://localhost:5105/api/User/Login";


    const [data, setData] = useState({
        email: "",
        password: ""
    });


    function submit(e) {
        e.preventDefault();
        const { email, password } = data;
        const response = fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
              email,
              password
          }), 
          mode:"cors"
      });
      }


      function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata)
      }

    return (
        <>
            <form onSubmit={submit} className='container1'>
                <div className='header'>
                    <div className='text'>
                        Sign In
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <IonIcon icon={mail}></IonIcon>
                        <input onChange={handle} id="email" value={data.email} className='input1' type='text' placeholder='Enter email address'></input>
                    </div>
                    <div className='input'>
                        <IonIcon icon={lockClosed}></IonIcon>
                        <input onChange={handle} id="password" value={data.password} className='input1' type='password' placeholder='Enter password'></input>
                    </div>
                </div>
                <div className='forgot-password'>
                    <div>Forgot password? </div>
                    <a href="#smtng">Click here!</a>
                </div>
                <button type="submit" className='sign-in'>Sign In</button>
            </form>
        </>
    );
}

export default LogIn;
