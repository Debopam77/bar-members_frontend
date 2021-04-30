import React from 'react';

function MemberCardDetails({member}) {
    return (
        <div>
            <h2>Member Details</h2>
            <div className='card'>
                <div className='memberName pad'>Adv.<span className='highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName}</span></div>
                <div className='space'>
                    <div className='pad'>Registration : <span className='memberInfo'>{member.registration}</span></div>
                    <div className='pad'>Court of practice : <span className='memberInfo'>{member.courtOfPractice[0]}</span></div>
                    <div className='pad'>Expertise : <span className='memberInfo'>{member.expertise[0]}</span></div>
                    <div className='pad'>Phone : <span className='memberInfo'>{member.phone}</span></div>
                    <div className='pad'>Email : <span className='memberInfo'>{member.email}</span></div>
                </div>
            </div>
        </div>
    );
}

export default MemberCardDetails;