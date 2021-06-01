import React from 'react';
import '../style/MemberCard.scss';
import generateQRCode from '../utilFunctions/generateQRCode';
import MemberCard from '../components/MemberCard';
import MemberCardBack from '../components/MemberCardBack';

const Print = ({members}) => {
    //Extracting the phone number from the url
    const queryParams = new URLSearchParams(window.location.search)
    const phoneNumber = queryParams.get('phone');

    //Do when print button is clicked
    const printListner = ()=> {
        window.print();
    };
    //Print button defination
    let printButton = <button onClick={printListner}>Print</button>;

    //Get member object from the phone number
    const member = (members.filter((member)=> (member.phone === phoneNumber)))[0];

    if(!member) {
        return (<div className='member'> INVALID USER DETAILS</div>)
    }

    const url = 'http://'+(process.env.REACT_APP_FRONTEND_URL)+'/members/detail/?phone='+phoneNumber;

    return (
        <>
            <h2>To Print</h2>
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

export default Print;