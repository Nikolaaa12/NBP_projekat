import {useState} from 'react'
import { useNavigate  } from 'react-router-dom'; 
import Axios from 'axios'

function AddUserType(){
    const navigate = useNavigate();
    const url = "http://localhost:5105/api/UserType/Add"
    const [name,Setname]= useState("bb")

   async function submit(e){
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name
            }),
            credentials: 'include',
            mode: 'cors'
        });
    };

    function handle(e){
        const newdata={...name}
        newdata[e.target.id]=e.target.value
        Setname(newdata)
        console.log(newdata)
    };

    return(
        <>
            <form onSubmit={(e)=>submit(e)} className='container1'>
                <div className='header'>
                    <div className='text'>
                    Add User Type
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input id="name" className='input1' type='text' placeholder='Enter name of a user type'></input>
                    </div>
                </div>

                <button submit="true" type='submit' className='sign-in'>Add</button>
                </form>
        </>
    )
}

export default AddUserType;