import React, { useState } from 'react';
import MemberCard from './MemberCard';
import MemberCardDetails from './MemberCardDetails';
import '../style/index.scss';

function Members({members}) {

    const [clicked, setClicked] = useState();

    const renderOutput = ()=> {
        if(clicked){
            return (
                <div>
                    <div className='member'><MemberCardDetails member={clicked}></MemberCardDetails></div>
                </div>   
            );
        }
        return (
            <div>
                <h2>Our Members</h2>
                <div className='member'>
                    {members.map((member, i)=>{
                    //onClick is getting the value of the clicked member from MemberCard component
                    if(!member.isAdmin)
                        return <MemberCard key={'Member'+i} member={member} propsOnClick={(member)=> setClicked(member)}/>
                    })}
                </div>
            </div>
        );
    }

    return (<div>{renderOutput()}</div>);
}

export default Members;