import {useState} from 'react';

function DeleteUser(){


    const [value, setValue]=useState('');
    function handleSelect(event){
        setValue(event.target.value);
    }

    return(
        <>
        <form className='container1'>
                <div className='header'>
                    <div className='text'>
                      Delete User
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='selector'>
                  <h4>Choose user to delete</h4>
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

export default DeleteUser;