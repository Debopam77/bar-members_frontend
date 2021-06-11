import {React, useEffect, useState} from 'react';
import '../style/MemberCard.scss';
import generateQRCode from '../utilFunctions/generateQRCode';
import MemberCard from './MemberCard';
import MemberCardBack from './MemberCardBack';

const ShowCard = ({members}) => {

    const [loggedInUserIsAdmin, setLoggedInUserIsAdmin] = useState(undefined);
    //Get user that is logged in
    useEffect(()=> {
        setLoggedInUserIsAdmin(JSON.parse(localStorage.getItem('loggedInUser')).member.isAdmin);
    }, []);

    //Extracting the phone number from the url
    const queryParams = new URLSearchParams(window.location.search)
    const phoneNumber = queryParams.get('phone');

    //Do when print button is clicked
    const printListner = ()=> {
        window.print();
    };
    //Print button defination
    let printButton = (loggedInUserIsAdmin) ? (<button onClick={printListner}>Print</button>) : undefined;

    //Get member object from the phone number
    const member = (members.filter((member)=> (member.phone === phoneNumber)))[0];

    if(!member) {
        return (<div className='member'> INVALID USER DETAILS</div>)
    }

    const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_FRONTEND_URL)+'/members/detail/?phone='+phoneNumber;

    return (
        <>
            <h2>Card</h2>
            <div className='member'>
                <MemberCard member={member}/>
            </div>
            <div className='member'>
                <MemberCardBack src={generateQRCode(url)} url={url}/>
            </div>
            <div className='member'>
                {printButton}    
            </div>
        </>
    );
}

export default ShowCard;