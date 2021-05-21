import {React, useState} from 'react';
import '../style/index.scss';
import '../style/loginRegister.scss';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

function DeleteMember({member, isAdmin}) {

    //State to keep track when to redirect to home
    const [redirectState, setRedirectState] = useState(false);

    const deleteActions = async (event)=> {
        //Handle delete member process
        if(event.target.id === 'yes') {

            //Define needed data for api call
            const url = 'http://'+(process.env.REACT_APP_URL)+'/members';
            const userToken = JSON.parse(localStorage.getItem('loggedInUser')).token;
            
            const payload = {
                phone : member.phone
            }
            const axiosConfig = {
                headers : {
                    Authorization : 'Bearer '+userToken
                },
                data : payload 
            };
            
            //Call the delete api
            try {
                console.log(payload);
                const response = await axios.delete(url, axiosConfig);

                //If we are not deleting from an admin account, we need to logout and set local storage empty
                if(response && !isAdmin) {
                    localStorage.setItem('loggedInUser', null);
                }
                
            }catch(e){
                alert(e);
            }

        }
        setRedirectState(true);
    }

    //Redirect if set true
    if(redirectState){
        return (<Redirect to='/home'/>);
    }

    if(member.isAdmin)
        return (<div className='deleteMember'>Admins can't be deleted, contact developer for assistance.</div>);
        //Show logout options    
    return (<div className='loginRegister'>
        <h2>Do you want to Delete member { member.name.firstName} ?</h2>
        <button onClick={deleteActions} id='yes'>Yes</button>
        <button onClick={deleteActions} id='no'>No</button>
    </div>);
}

export default DeleteMember;