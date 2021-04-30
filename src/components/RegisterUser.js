import React from 'react';
import '../style/index.scss';

function RegisterUser() {
    return (
        <div className='loginRegister'>
            <h2>Enter user details here</h2>
            <div>Email :</div>
            <input required id='email'></input>
            <div>Phone :</div>
            <input required id='phone'></input>
            <div>Name :
                <div>First name</div>
                <input required id='firstName'></input>
                <div>Middle name</div>
                <input id='midName'></input>
                <div>Last name</div>
                <input required id='lastName'></input>
            </div>
            <div>Password :</div>
            <input required id='password'></input>
            <div></div>
            <button id='register'>Register</button>
        </div>
    );
}

export default RegisterUser;