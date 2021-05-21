import React,{ useState } from 'react';
import AddEditMember from '../components/AddEditMember';
import DeleteMember from '../components/DeleteMember';
import '../style/MemberCardDetails.scss'
import '../style/index.scss';
import {getAvatar} from '../utilFunctions/avatarImageConversions';
import blankUserImage from '../resources/img/user.png';

function MemberCardDetails({member, loggedIn, isAdmin}) {

    // To figure out if the edit button was clicked
    const [clicked, setClicked] = useState([false,false]);

    //Avatar picture file
    const [avatarPic, setAvatarPic] = useState(getAvatar(member));

    //If edit button should be visible or not
    let buttonsVisible = false;

    //If we get a member prop and the user is an admin
    if(member && isAdmin){
        buttonsVisible = true;
    //If the user is editing their own data    
    }else if(!member && loggedIn){
        member = JSON.parse(localStorage.getItem('loggedInUser')).member;

        //Set member avatar to avatarPic
        if(!avatarPic)
            setAvatarPic(getAvatar(member));
        buttonsVisible = true;
    //If someone accesses the details page without logging in    
    }else if(!member && !loggedIn) {
        alert('User not logged in');
        return (<div>Not logged In</div>);
    }

    const editButton = (<button onClick={()=>{setClicked([true, false])}}><div className='editIcon'></div>Edit</button>);
    const deleteButton = (<button onClick={()=>{setClicked([false, true])}} ><div className='deleteIcon'></div></button>)
    const avatarImageElement = (avatarPic) ? <img src={(avatarPic.url) ? avatarPic.url : blankUserImage} className='avatar' name='avatar' alt='User'></img> : undefined;

    //Once edit is clicked call the AddEditMember module
    if(clicked[0]) {
        //Go to the add edit module for edits
        return (<AddEditMember member={member}/>);
    }
    //Run delete member functions
    if(clicked[1]) {
        //To to the delete module
        return (<DeleteMember member={member} isAdmin={isAdmin} />);
    }

    return (
        <div className='detailedCardPage'>
            <h2>Member Details</h2>     
            <div className='detailedCard'>
                <div className='memberName pad'>Advocate <span className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName}</span></div>
                {(avatarImageElement)}
                <div className='space'>
                    <div className='pattern'>
                        <div className='pad'>Registration : <span className='memberInfo'>{member.registration}</span></div>
                        <div className='pad'>Court of practice : <span className='memberInfo'>{member.courtOfPractice[0]}</span></div>
                        <div className='pad'>Expertise : <span className='memberInfo'>{member.expertise[0]}</span></div>
                        <div className='pad'>Phone : <span className='memberInfo'>{member.phone}</span></div>
                        <div className='pad'>Email : <span className='memberInfo'>{member.email}</span></div>
                    </div>  
                    <div className='buttonDock'>
                        {(buttonsVisible)? editButton : ''}
                        {(buttonsVisible)? deleteButton : ''}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default MemberCardDetails;