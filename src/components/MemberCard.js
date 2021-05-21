import React from 'react';
import '../style/index.scss';
import './../style/MemberCard.scss';
import {convertBufferToImg,getFileURL} from '../utilFunctions/avatarImageConversions';
import blankUserImage from '../resources/img/user.png';
import {arrayToString} from '../utilFunctions/displayArrays'

function MemberCard({member, propsOnClick}) {
    let qualificationElement;
    if(member.qualification[0]) {
        qualificationElement = arrayToString(member.qualification, 3);
        qualificationElement = <div className='qualifications'>{qualificationElement}</div>
    }
    const output = (
        (<div className='card' onClick={()=>{propsOnClick(member)}}>
            <div className='memberName'><div className='advocateIcon'/><div className='associationChunk'><div className='associationHeading'>Displaced Lawyers' Bar Association</div><div className='associationAddress'>Barrackpore Court, WB, Kolkata - 700120</div></div></div>
            <div className='nameDisplay'><div className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName} {(qualificationElement)? qualificationElement : ''}</div><div className='advocate'>ADVOCATE</div></div>
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