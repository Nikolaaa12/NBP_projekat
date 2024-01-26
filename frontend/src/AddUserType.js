import {useState} from 'react'
import Axios from 'axios'
import { useNavigate  } from 'react-router-dom'; 

function AddUserType(){
    const url = "http://localhost:5105/api/UserType/AddUserType"
    const [data,setData]=useState({
        name:""
    })
    function handle(e){
        var newdata = { ...data };
        newdata[e.target.id] = e.target.value; // Use square brackets for assignment
        setData(newdata);
        console.log(newdata);
    }
    function submit(e){
        console.log(data.name)
        Axios.post(url,{
            name:data.name
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    const navigate = useNavigate();
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
                        <input  onChange={(e)=>handle(e)} id="name" value={data.name} className='input1' type='text' placeholder='Enter name of a user type'></input>
                    </div>
                </div>

                <button submit="true" className='sign-in'>Add</button>
                </form>
        </>
    )
}

export default AddUserType;