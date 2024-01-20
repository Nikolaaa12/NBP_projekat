function AddUserType(){
    return(
        <>
            <form className='container1'>
                <div className='header'>
                    <div className='text'>
                    Add User Type
                    </div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input className='input1' type='text' placeholder='Enter name of a user type'></input>
                    </div>
                </div>

                <button submit="true" className='sign-in'>Add</button>
                </form>
        </>
    )
}

export default AddUserType;