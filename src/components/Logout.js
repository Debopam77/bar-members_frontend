import React, {useState} from 'react';
import '../style/index.scss';
import '../style/loginRegister.scss';
import {Redirect} from 'react-router-dom';

function Logout({setLoggedIn}) {
    //To intimate Redirect component
    const [redirectState, setRedirectState] = useState(false);

    //When any of the buttons are clicked
    const logoutActions = (event)=> {
        //Remove the user data from local storage
        if(event.target.id === 'yes') {
            
            localStorage.setItem('loggedInUser', null);
            setLoggedIn(false);
        }
            
        //prep for redirect 
        setRedirectState(true);
    }

    //Redirect if set true
    if(redirectState){
        return (<Redirect to='/home'/>);
    }

    //Show logout options    
    return (<div className='logout'>
        <h2>Want to logout?</h2>
        <button onClick={logoutActions} id='yes'>Yes</button>
        <button onClick={logoutActions} id='no'>No</button>
    </div>);
}

export default Logout;