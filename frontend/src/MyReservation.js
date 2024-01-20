import './MyReservations.css';

function MyReservations(){
    return(
        <>
        <h2 className='res'>My Reservations</h2>
        <div className='reservations-wrapper'>
            <div className='one-wrapper'>
              <div className='personal-information'>
                <p>Username:</p>
                <p>Email:</p>
                <p>First name:</p>
                <p>Last name:</p>
              </div>
              <div className='price'>
                <h2>Price</h2>
                 $
              </div>
              <h3>Date: </h3>
            </div>
        </div>
     </>
    )
}

export default MyReservations;