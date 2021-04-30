import React from 'react';
import '../style/index.scss';
import './../style/MemberCard.scss';

function MemberCard({member, propsOnClick}) {
    const output = (
        (<div className='card' onClick={()=>{propsOnClick(member)}}>
            <div className='memberName'><div className='advocateIcon'></div><span className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName}</span></div>
            <div className='cardContents'>
                <div className='space'>
                    <div className='pad'>Regi# : <span className='memberInfo'>{member.registration}</span></div>
                    <div className='pad'>Court : <span className='memberInfo'>{member.courtOfPractice[0]}</span></div>
                    <div className='pad'>Exper : <span className='memberInfo'>{member.expertise[0]}</span></div>
                    <div className='pad'>Phone : <span className='memberInfo'>{member.phone}</span></div>
                    <div className='pad'>Email : <span className='memberInfo'>{member.email}</span></div>
                </div>
                <div className='avatar'></div>
            </div>
            
        </div>)
    );

    return (output);
}


export default MemberCard;