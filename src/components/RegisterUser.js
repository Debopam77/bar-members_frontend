import React,{useState, useEffect} from 'react';
import loaderElement from '../utilFunctions/loaderElement';
import '../style/index.scss';
import '../style/loginRegister.scss';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

function RegisterUser({setLoggedIn}) {

    const [sent, setSent] = useState(false);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);
    const [passwordMatches, setPasswordMatches] = useState('placeholder');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [newUser, setNewUser] = useState({
        'name' : {
        },
        'email' : '',
        'phone' : '',
        'password' : '',
        'registration' : ''
    });

    const submit = async (event)=> {
        event.preventDefault();
        //Check if both password and confirm password strings are same or not
        if(!passwordMatches) {
            alert('Please enter the passwords correctly');
            return;
        }

        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/members';

        //Trigger api to create new user
        try{
            //change sent state to true
            setSent(true);
            const response = await axios.post(url, newUser);
            localStorage.setItem('loggedInUser', JSON.stringify(response.data));

            setLoggedIn(true);
            //Prep to redirect to home
            setRedirectToHome(true);
        }catch(e){
            alert(e)
        }
    }

    const getValue = (event) => {
        
        const elementName = event.target.name;
        const elementValue = event.target.value;

        //set the newUser state creating a new object
        setNewUser(()=> {
            let result = newUser;

            if(elementName === 'confirmPassword'){
                if(result['password'] === elementValue)
                    setPasswordMatches(true);
                else
                    setPasswordMatches(false);    
            }else if(elementName.includes('.')) {
                //Handle object based attributes
                const part = elementName.split('.');
                result[part[0]][part[1]] = elementValue;

            }else {
                //For creating a temporary registration number
                if(elementName === 'phone')
                    result['registration'] = 'placeholder'+elementValue;
                //Handle normal attributes
                result[elementName] = elementValue; 
            }
            return result;
        });
    }

    if(redirectToHome){
        return (
            <>
                <Navigate to='/' />
            </>
        );
    }

    const output = (
        <div className='loginRegister'>
            <form className='centerElements' onSubmit={submit}>
                <h2>Enter user details here</h2>

                <div>Name :
                    <div className='descriptionInputLogin'><div className='description'>First name</div>
                    <input onChange={getValue} required name='name.firstName'></input></div>

                    <div className='descriptionInputLogin'><div className='description'>Middle name</div>
                    <input onChange={getValue} name='name.middleName'></input></div>

                    <div className='descriptionInputLogin'><div className='description'>Last name</div>
                    <input onChange={getValue} required name='name.lastName'></input></div>
                </div>

                <div className='descriptionInputLogin'><div className='description'>Email :</div>
                <input onChange={getValue} required name='email'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Phone :</div>
                <input onChange={getValue} required name='phone'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Password :</div>
                <input type='password' onChange={getValue} required name='password'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Confirm Password :</div>
                <input onChange={getValue} required name='confirmPassword' className={(!passwordMatches)? 'passwordMatches' : ''}></input></div>

                <button name='register'>Register</button>
            </form>
        </div>
    );

    return (sent) ? loaderElement : output ;
}

export default RegisterUser;