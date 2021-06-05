import React, { useState } from 'react';
import MemberCard from './MemberCard';
import MemberCardDetails from './MemberCardDetails';
import {HashLoader} from 'react-spinners';
import '../style/index.scss';


function Members({members}) {

    //To check if a particular member card was clicked or not
    const [clicked, setClicked] = useState();
    //is Logged in user an Admin
    const isAdmin = (JSON.parse(localStorage.getItem('loggedInUser')))? JSON.parse(localStorage.getItem('loggedInUser')).member.isAdmin : false;
    const approvalColoursElement = (isAdmin)? (<div className='center'><div>Approved <span className='approvedColour'></span></div><div>Not Approved <span className='notApprovedColour'></span></div></div>) : undefined;
    const loaderElement = <div className='loader' ><HashLoader size='80px' color='#f8f5f1' loading/><div className='loader-text'>Loading...</div></div>;

    const renderOutput = ()=> {
        //If a particular card is clicked
        if(clicked){
            return (
                <>
                    <div className='member'><MemberCardDetails member={clicked} isAdmin={isAdmin}></MemberCardDetails></div>
                </>   
            );
        }
        return (
            <>
                <h2>Our Members</h2>
                {(members.length === 0) ? (loaderElement) : undefined}
                <div className='member'>
                    {members.map((member, i)=>{
                    //onClick is getting the value of the clicked member from MemberCard component, exclude the admin card from appearing
                    if(!member.isAdmin && (isAdmin || member.isApproved))
                        return <MemberCard key={'member'+i} member={member} propsOnClick={(member)=> setClicked(member)}/>
                    return <div key={'member'+i}></div>;    
                    })}
                </div>
                {approvalColoursElement}
            </>
        );
    }

    return (<div>{renderOutput()}</div>);
}

export default Members;