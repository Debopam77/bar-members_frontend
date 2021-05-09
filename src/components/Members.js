import React, { useState } from 'react';
import MemberCard from './MemberCard';
import MemberCardDetails from './MemberCardDetails';
import '../style/index.scss';

function Members({members}) {

    //To check if a particular member card was clicked or not
    const [clicked, setClicked] = useState();

    const renderOutput = ()=> {
        //If a particular card is clicked
        if(clicked){
            const isAdmin = (JSON.parse(localStorage.getItem('loggedInUser')))? JSON.parse(localStorage.getItem('loggedInUser')).member.isAdmin : false;
            return (
                <div>
                    <div className='member'><MemberCardDetails member={clicked} isAdmin={isAdmin}></MemberCardDetails></div>
                </div>   
            );
        }
        return (
            <div>
                <h2>Our Members</h2>
                <div className='member'>
                    {members.map((member, i)=>{
                    //onClick is getting the value of the clicked member from MemberCard component, exclude the admin card from appearing
                    if(!member.isAdmin)
                        return <MemberCard key={'member'+i} member={member} propsOnClick={(member)=> setClicked(member)}/>
                    return <div key={'member'+i}></div>;    
                    })}
                </div>
            </div>
        );
    }

    return (<div>{renderOutput()}</div>);
}

export default Members;