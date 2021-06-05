import React, {useState, useEffect} from 'react';
import '../style/index.scss';
import '../style/loginRegister.scss';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import loaderElement from '../utilFunctions/loaderElement';

function Login({setLoggedIn}) {
    
    const [sent, setSent] = useState(false);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);

    const [inputValues, setInputValues] = useState({
        phone : '',
        password : ''
    });

    //To intimate the redirect component
    const [redirectState, setRedirectState] = useState(false);

    //Getting the values from the input field
    const getValue = (event)=>{
        setInputValues((inputValues)=> {
            return {
                ...inputValues,
                [event.target.name] : event.target.value
            }
        });
    }
    
    //Passing the values to the login api
    const login = async (event)=> {
        //form submit doesn't refresh page
        event.preventDefault();
        
        //call axios api
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/members/login';

        try {
            //Change the sent state to true
            setSent(true);
            //const response = await 
            const res = await Axios.post(url, inputValues);
            //Store login data in the browser local storage
            localStorage.setItem('loggedInUser', JSON.stringify(res.data));
            setLoggedIn(true);
            //Prep for redirect to home
            setRedirectState(true);
        }catch(e){
            alert(e.response.data);
        }
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <>
                <Redirect to='/' />
            </>        
        );
    }
    
    //The login form 
    const output = (
        <div className='loginRegister'>
            <h2>Enter your login details</h2>
            <form className='centerElements' onSubmit={login}>
                <div className='descriptionInputLogin'><div className='description'>Phone : </div><input onChange={getValue} name='phone'></input></div>
                <div className='descriptionInputLogin'><div className='description'>Password : </div><input onChange={getValue} name='password' type='password'></input></div>
                <div className='descriptionInputLogin'><div><a href='/forgotPassword'>Forgot your password?</a></div></div>
                <div className='descriptionInputLogin'><div><a href='/register'>New user? Register here.</a></div></div>
                <button>Login</button>
            </form>
        </div>
    );
    return (sent) ? loaderElement : output;
}

export default Login;