import React from 'react';
import '../style/index.scss';
import './../style/MemberCard.scss';
import {convertBufferToImg,getFileURL} from '../utilFunctions/avatarImageConversions'
import blankUserImage from '../resources/img/user.png'

function MemberCard({member, propsOnClick}) {

    const output = (
        (<div className='card' onClick={()=>{propsOnClick(member)}}>
            <div className='memberName'><div className='advocateIcon'/><div className='associationHeading'>Displaced Lawyers' Bar Association</div><div className='associationAddress'>Barrackpore Court, WB</div></div>
            <div className='nameDisplay'><div className='advocate'>ADVOCATE</div><div className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName}</div></div>
            <div className='cardContents'>
                <div className='space'>
                    <div className='pad'>Regi#<span className='memberInfo'>{member.registration}</span></div>
                    <div className='pad'>Court<span className='memberInfo'>{member.courtOfPractice[0]}</span></div>
                    <div className='pad'>Exper<span className='memberInfo'>{member.expertise[0]}</span></div>
                    <div className='pad'>Phone<span className='memberInfo'>{member.phone}</span></div>
                    <div className='pad'>Email<span className='memberInfo'>{member.email}</span></div>
                </div>
                <img src={(member.avatar && member.avatar.data.length>0) ? getFileURL(convertBufferToImg(member.avatar.data)) : blankUserImage} className='avatar' alt='avatar'></img>
            </div>
            
        </div>)
    );

    return (output);
}


export default MemberCard;