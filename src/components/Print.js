import React, {useRef} from 'react';

import '../style/MemberCard.scss';
import MemberCard from '../components/MemberCard';
import MemberCardBack from '../components/MemberCardBack';

function Print({loggedIn}) {

    const printListner = ()=> {
        printButton = undefined;
        window.print();
    };
    let printButton = <button onClick={printListner}>Print</button>;

    if(!loggedIn)
        return (<div>Not Logged In</div>);

    const member = JSON.parse(localStorage.getItem('loggedInUser')).member;

    return (
        <>
            <h2>To Print</h2>
            <div className='member'>
                <MemberCard member={member} loggedIn={loggedIn}/>
            </div>
            <div className='member'>
                <MemberCardBack member={member} loggedIn={loggedIn}/>
            </div>
            <div className='member'>
                {printButton}    
            </div>
        </>
    );
}

export default Print;