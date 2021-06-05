import React, {useState, useEffect} from 'react';
import '../style/index.scss';
import '../style/loginRegister.scss';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import loaderElement from '../utilFunctions/loaderElement';


function Logout({setLoggedIn}) {

    const [sent, setSent] = useState(false);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);

    //To intimate Redirect component
    const [redirectState, setRedirectState] = useState(false);

    //When any of the buttons are clicked
    const logoutActions = async (event)=> {
        //Remove the user data from local storage
        if(event.target.id === 'yes') {
            
            //Define needed data for api call
            const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/members/logout';
            const userToken = JSON.parse(localStorage.getItem('loggedInUser')).token;
            const axiosConfig = {
                headers : {
                    Authorization : 'Bearer '+userToken
                }
            };
            //Call the logout api
            try {
                //Changing sent state to true
                setSent(true);
                await axios.post(url, {}, axiosConfig);
            }catch(e){
                alert(e);
            }

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
    const output = (
        <div className='loginRegister'>
            <h2>Want to logout?</h2>
            <button onClick={logoutActions} id='yes'>Yes</button>
            <button onClick={logoutActions} id='no'>No</button>
        </div>
    );
    return (sent) ? loaderElement : output;
}

export default Logout;