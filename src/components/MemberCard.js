import React from 'react';
import '../style/index.scss';
import './../style/MemberCard.scss';
import {convertBufferToImg,getFileURL} from '../utilFunctions/avatarImageConversions';
import blankUserImage from '../resources/img/user.png';
import {arrayToString} from '../utilFunctions/displayArrays'

function MemberCard({member, propsOnClick}) {

    //Define the optional elements, if not in memory, set to undefined using ternary operator
    const registrationElement = (!member.registration.startsWith('placeholder')) ? (<div className='pad'>Regi#<span className='memberInfo'>{member.registration}</span></div>) : undefined;
    const courtElement = (member.courtOfPractice[0]) ? (<div className='pad'>Court<span className='memberInfo'>{member.courtOfPractice[0]}</span></div>) : undefined;
    const expertiseElement = (member.expertise[0]) ? (<div className='pad'>Exper<span className='memberInfo'>{member.expertise[0]}</span></div>) : undefined;
    const emailElement = (member.email) ? (<div className='pad'>Email<span className='memberInfo'>{member.email.substr(0,25)}</span></div>) : undefined;
    const chamberAddressElement = (member.address.chamberAddress) ? (<div className='pad'>Addr*<span className='memberInfo'>{member.address.chamberAddress.substr(0,25)} {member.address.chamberPincode}</span></div>) : undefined;
    const qualificationElement = (member.qualification[0]) ? (<div className='qualifications'>{arrayToString(member.qualification, 3)}</div>) : undefined;

    const notApproved = (!member.isApproved) ? 'not-approved' : '';

    const output = (
        (<div className={'card '+notApproved} onClick={()=>{propsOnClick(member)}}>
            <div className='memberName'><div className='advocateIcon'/><div className='associationChunk'><div className='associationHeading'>Displaced Lawyers' Bar Association</div><div className='associationAddress'>Barrackpore Court, WB, Kolkata - 700120</div></div></div>
            <div className='nameDisplay'><div className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName} {(qualificationElement)? qualificationElement : ''}</div><div className='advocate'>ADVOCATE</div></div>
            <div className='cardContents'>
                <div className='space'>
                    {registrationElement}
                    {courtElement}
                    {expertiseElement}
                    <div className='pad'>Phone<span className='memberInfo'>{member.phone}</span></div>
                    {emailElement}
                    {chamberAddressElement}
                </div>
                <img src={(member.avatar && member.avatar.data.length>0) ? getFileURL(convertBufferToImg(member.avatar.data)) : blankUserImage} className='avatar' alt='avatar'></img>
            </div>
            
        </div>)
    );

    return (output);
}


export default MemberCard;