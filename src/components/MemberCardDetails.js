import React,{ useState } from 'react';
import AddEditMember from '../components/AddEditMember';
import '../style/MemberCardDetails.scss'
import '../style/index.scss';

function MemberCardDetails({member, loggedIn}) {
    const [clicked, setClicked] = useState(false);
    let editVisible = false;
    if(!member && loggedIn){
        member = JSON.parse(localStorage.getItem('loggedInUser')).member;
        editVisible = true;
    }
    else if(!member && !loggedIn) {
        alert('User not logged in');
        return (<div>Not logged In</div>);
    }

    const editButton = (<button onClick={()=>{setClicked(true)}}><div className='editIcon'></div>Edit</button>);

    if(clicked) {
        return (<AddEditMember member={member}></AddEditMember>);
    }

    return (
        <div className='detailedCardPage'>
            <h2>Member Details</h2>     
            <div className='detailedCard'>
                <div className='memberName pad'>Adv. <span className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName}</span></div>
                <div className='space'>
                    <div className='pad'>Registration : <span className='memberInfo'>{member.registration}</span></div>
                    <div className='pad'>Court of practice : <span className='memberInfo'>{member.courtOfPractice[0]}</span></div>
                    <div className='pad'>Expertise : <span className='memberInfo'>{member.expertise[0]}</span></div>
                    <div className='pad'>Phone : <span className='memberInfo'>{member.phone}</span></div>
                    <div className='pad'>Email : <span className='memberInfo'>{member.email}</span></div>
                    {(editVisible)? editButton : ''}
                </div>
            </div>
        </div>
    );
}

export default MemberCardDetails;