import React,{ useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import AddEditMember from '../components/AddEditMember';
import DeleteMember from '../components/DeleteMember';
import '../style/MemberCardDetails.scss'
import '../style/index.scss';
import {getAvatar} from '../utilFunctions/avatarImageConversions';
import blankUserImage from '../resources/img/user.png';
import {arrayToString, arrayToDayString} from '../utilFunctions/displayArrays';
import loaderElement from '../utilFunctions/loaderElement';
import axios from 'axios';

function MemberCardDetails({member, members, loggedIn, isAdmin}) {

    const [sent, setSent] = useState(false);
    useEffect(()=> {}, [sent]);

    //Getting the phone number from the query string if any
    const queryParams = new URLSearchParams(window.location.search)
    const phoneNumber = queryParams.get('phone');

    // To figure out if the edit button was clicked
    const [clicked, setClicked] = useState([ false, false, false, false]);
    const [isApproved, setIsApproved] = useState(()=> (member && member.isAdmin) ? true : ((member) ? member.isApproved : true));
    
    //Refresh if approval status is changed
    useEffect(()=> {}, [isApproved]);

    //Avatar picture file
    const [avatarPic, setAvatarPic] = useState(getAvatar(member));

    //If edit button should be visible or not
    let buttonsVisible = false;

    //If a phone number is passed in the query string
    if(phoneNumber){

        //Waiting till the members object is populater
        if(members.length === 0)
            return(loaderElement);
        //Finding the correct member using the phone number
        member = (members.filter((member)=> (member.phone === phoneNumber)))[0];

        //If none of the members match the phone number    
        if(!member)
            return(<div className='member'>INVALID DETAILS</div>);

    //If we get a member prop and the user is an admin    
    }else if(member && isAdmin){
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

    //Define the optional edit, delete and view card buttons
    const editButton = (<button onClick={()=>{setClicked([true, false, false, false])}}><div className='dp-editIcon'></div>Edit</button>);
    const deleteButton = (<button onClick={()=>{setClicked([false, true, false, false])}} ><div className='dp-deleteIcon'></div></button>);
    const approveButton = (<button onClick={()=>{setClicked([false, false, true, false])}} name='approve'>Approve</button>);
    const viewCardButton = (<button onClick={()=>{setClicked([false, false, false, true])}} name='viewCard'>Show Card</button>);
    const disApproveButton = (<button onClick={()=>{setClicked([false, false, true])}} name='dis-approve'>Dis-approve</button>);
    
    const notApprovedClass = (!isApproved) ? 'backgroundUnset' : '';

    //Define the optional elements, display or not to display using ternary operator
    const avatarImageElement = (avatarPic) ? <img src={(avatarPic.url) ? avatarPic.url : blankUserImage} className='dp-avatar' name='avatar' alt='User'></img> : undefined;
    const qualificationElement = (member.qualification[0]) ? (<span className='dp-highlight dp-memberName dp-pad'>{arrayToString(member.qualification, 5)}</span>) : '';
    const chamberOpenElement = (member.chamberOpenDays[0]) ? (<div className='dp-pad'>Chamber Open on : <span className='dp-memberInfo'>{arrayToDayString(member.chamberOpenDays)} {(member.chamberOptional) ? ', (' +member.chamberOptional + ')' : undefined}</span></div>) : undefined;
    const certificateElement = (member.certificates[0]) ? (<div className='dp-pad'>Certificates : <span className='dp-memberInfo'>{arrayToString(member.certificates, 15)}</span></div>) : undefined;
    const courtsElement = (member.courtOfPractice[0]) ? (<div className='dp-pad'>Court of practice : <span className='dp-memberInfo'>{arrayToString(member.courtOfPractice)}</span></div>) : undefined;
    const expertiseElement = (member.expertise[0]) ? (<div className='dp-pad'>Expertise : <span className='dp-memberInfo'>{arrayToString(member.expertise)}</span></div>) : undefined;
    const emailElement = (member.email) ? (<div className='dp-pad'>Email : <span className='dp-memberInfo'>{member.email}</span></div>) : undefined;
    const ageElement = (member.age) ? (<div className='dp-pad'>Age : <span className='dp-memberInfo'>{member.age}</span></div>) : undefined;
    const experienceElement = (member.experience) ? (<div className='dp-pad'>Experience : <span className='dp-memberInfo'>{member.experience}</span></div>) : undefined;
    const residentialAddressElement = (member.address.residentialPincode) ? (<div className='dp-pad'>Residential address : <span className='dp-memberInfo'>{member.address.residentialAddress} {member.address.residentialPincode}</span></div>) : undefined;
    const chamberAddressElement = (member.address.chamberPincode) ? (<div className='dp-pad'>Chamber address : <span className='dp-memberInfo'>{member.address.chamberAddress} {member.address.chamberPincode}</span></div>) : undefined;
    const registrationElement = (!member.registration.startsWith('placeholder')) ? (<div className='dp-pad'>BAR Registration # : <span className='dp-memberInfo'>{member.registration}</span></div>) : undefined;
    const memberOfLibraryElement = (member.memberOfLibraryElement) ? (<div className='dp-pad'>Member of Library : <span className='dp-memberInfo'>{member.memberOfLibrary}</span></div>) : undefined;

    const toggleApproval = async (member)=> {
        const userToken = JSON.parse(localStorage.getItem('loggedInUser')).token;
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/members/';
        const axiosConfig = {
            headers : {
                Authorization : 'Bearer '+userToken
            }
        };
        const payload = {
            phone : member.phone,
            isApproved : !isApproved
        };

        try {
            if(isAdmin){
                setClicked([false, false, false]);
                //Change sent state to true
                setSent(true);
                //Call the edit api and pass the edit request
                const res = await axios.patch(url, payload, axiosConfig);
                if(res) {
                    //Set the isApproved state to opposite of what it was before
                    setIsApproved(!isApproved);
                    //Chang sent state to false
                    setSent(false);
                    //Provide an alert to indicate that it was completed successfully
                    alert(member.name.firstName + ' is '+ ((payload.isApproved) ? 'approved' : 'dis-approved'));

                }
            }else
                throw new Error('Must be an admin to approve');
            

        }catch(e) {
            alert(e);
        }
    }

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
    //If the approve button is clicked {
    if(clicked[2]) {
        //Function to approve or dis-approve member
        toggleApproval(member);
    }
    //If the print button is clicked
    if(clicked[3]) {
        //Start the print utility
        return (
            <>
                <Redirect to={'/members/showCard/?phone='+member.phone} />
            </>);
    }

    const output = (
        <div className='dp-detailedCardPage'>
            <h2>Member Details</h2>     
            <div className={'dp-detailedCard '+notApprovedClass}>
                <div className='dp-memberName dp-pad'>Advocate <span className='dp-highlight'>{member.name.firstName} {member.name.middleName} {member.name.lastName}</span></div>
                {qualificationElement}
                {(avatarImageElement)}
                <div className='dp-space'>
                    <div className='dp-pattern'>
                        {courtsElement}
                        {expertiseElement}
                        <div className='dp-pad'>Phone : <span className='dp-memberInfo'>{member.phone}</span></div>
                        {emailElement}
                        {registrationElement}
                        {ageElement}
                        {experienceElement}
                        {residentialAddressElement}
                        {chamberAddressElement}
                        {certificateElement}
                        {chamberOpenElement}
                        {memberOfLibraryElement}
                    </div>  
                    <div className='dp-buttonDock'>
                        {(buttonsVisible)? editButton : undefined}
                        {(buttonsVisible && isAdmin && !isApproved)? approveButton : ( (buttonsVisible && isAdmin && isApproved) ? disApproveButton : undefined)}
                        {(buttonsVisible) ? viewCardButton : undefined}
                        {(buttonsVisible)? deleteButton : undefined}
                    </div>
                    
                </div>
            </div>
        </div>
    );

    return (sent) ? loaderElement : output;
}

export default MemberCardDetails;