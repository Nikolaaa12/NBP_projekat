import { IonIcon } from '@ionic/react';
import {logoFacebook, logoTwitter, mail, lockClosed} from 'ionicons/icons';
import './Log-In.css';


function LogIn(){
    return (
        <>
        <div className='container1'>
            <div className='header'>
                <div className='text'>
                    Sign In
                </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <IonIcon icon={mail}></IonIcon>
                    <input className='input1' type='text' placeholder='Enter email adress'></input>
                </div>
                <div className='input'>
                    <IonIcon icon={lockClosed}></IonIcon>
                    <input className='input1' type='text' placeholder='Enter password'></input>
                </div>
            </div>
            <div className='forgot-password'>
                <div>Forgot password? </div>
                <a href="#smtng">Click here!</a>
            </div>
            <button className='sign-in'>Sign In</button>
            <div>OR</div>
            <div className='fb'>
                <IonIcon icon={logoFacebook}></IonIcon>
                <div>Continue with facebook</div>
            </div>
            <div className='twitter'>
                <IonIcon icon={logoTwitter}></IonIcon>
                <div>Continue with twitter</div>
            </div>
        </div>
        </>
    );
}
    
export default LogIn;