import React,{useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import '../style/index.scss';
import '../style/loginRegister.scss';
import {arrToObj, keyToValueConvert} from '../utilFunctions/arrayObjectConversions';
import {Redirect} from 'react-router-dom';
import blankUserImage from '../resources/img/user.png'
import {convertImgToBuffer, convertBufferToImg} from '../utilFunctions/avatarImageConversions';
import loaderElement from '../utilFunctions/loaderElement';
import axios from 'axios';

function AddEditMember({member}) {

    //Is the request sent then start load animation
    const [sent, setSent] = useState(false);
    useEffect(()=>{},[sent]);

    //Values that cannot be changed
    const excludedAttributes = ['phone', 'registration', 'updatedAt', 'age', 'isAdmin', 'chamberOpenDays', 'courtOfPractice', 'expertise', 'certificates', 'qualification', 'isApproved'];
    let defaultValue = Object.keys(member)
        .filter((key) => !excludedAttributes.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key] : member[key]
            };
        }, {});

    //State to store the created or updated user string
    const [newValue, setNewValue] = useState(defaultValue);

    //Avatar picture file
    const [avatarPic, setAvatarPic] = useState(()=> {
        let bufferImage;
        let url;
        //If the member object has a avatar field
        if(member.avatar && member.avatar.data.length > 0){
            //Getting the array from the member.avatar object
            bufferImage = member.avatar.data;
            //get url from the blo
            url = URL.createObjectURL(convertBufferToImg(bufferImage));
        }
        return {
            bufferImage : bufferImage,
            url : url
        }
    });

    //State to figure out when to redirect page back to user detail page after edit or create
    const[redirectToDetails, setRedirectToDetails] = useState(false);

    //Used to map the day array to particular day strings
    const daysInWeek = [
        { value: 1, label: 'Sun' },
        { value: 2, label: 'Mon' },
        { value: 3, label: 'Tue' },
        { value: 4, label: 'Wed' },
        { value: 5, label: 'Thu' },
        { value: 6, label: 'Fri' },
        { value: 7, label: 'Sat' },
      ];

    //Day array to store the chamber open days
    let dayArrayFunc = () => {
        let arr = [];
        let i = 1;
        const tempChamberOpenDays = member.chamberOpenDays;
        while(i <= 7) {
            if(tempChamberOpenDays.includes(i))
                arr[i] = 'dayHere';
            else
                arr[i] = false;
            i++;    
        }
        return arr;
    }

    const [chamberOpenDays, setChamberOpenDays] = useState(dayArrayFunc());

    const removePicButton = (avatarPic) => {
        if(avatarPic.url)
            return <div name='avatar.remove' className='noSubmitButton' onClick={avatarHandler}>Remove</div>
        else
            return <div className='descriptionInputLogin'>Image size should be less than 150KB</div>    
    }

    const avatarHandler = async (event)=> {
        const eventName = event.target.attributes.name.value;

        //Handle uplaod part
        if(eventName === 'avatar.upload'){
            setAvatarPic({});
            
            const file = event.target.files[0];
            
            try {
                const arrayBufferImage = await convertImgToBuffer(file);
                setAvatarPic({
                    bufferImage : arrayBufferImage,
                    url : URL.createObjectURL(file)
                });
            }catch(e) {
                setAvatarPic({});
                alert(e);
            }
        }//Handle removal part
        else if(eventName === 'avatar.remove') {
            setAvatarPic({});
        }
    }

    //onChange triggered function to update 
    const getValue = (event)=> {
        
        const elementName = event.target.name;
        let elementValue = event.target.value;

        //Storing temporary data 
        let arr = [];
        if(elementName === 'chamberOpenDays') {
            
            //checking if the new change is checked or unchecked, if it is checked, change the state chamberOpenDays so that it is preserved in the next call
            arr = chamberOpenDays;
            if(event.target.checked) 
                arr[event.target.value] = 'dayHere'
            else
                arr[event.target.value] = false       
            setChamberOpenDays(arr)

            elementValue = arrToObj(keyToValueConvert(chamberOpenDays));

        }else if(elementName === 'certificates' || elementName === 'expertise' || elementName === 'courtOfPractice' || elementName === 'qualification') {
            //Handle comma separated arrays
            arr = (event.target.value).split(',');
            elementValue = arrToObj(arr);
        }
        
        //Setting the value of the state using the changed input fields
        setNewValue(()=> {
            
            let result = newValue;

            if(elementName.includes('.')) {
                //Handle object based attributes
                const part = elementName.split('.');
                result[part[0]][part[1]] = elementValue;

            }else
                //Handle normal attributes
                result[elementName] = elementValue; 
            return result;
        });
    }

    //Submit button is clicked
    const submitData = async (event)=> {
        event.preventDefault();
        const isAdmin = JSON.parse(localStorage.getItem('loggedInUser')).member.isAdmin;
        const userToken = JSON.parse(localStorage.getItem('loggedInUser')).token;
        let payload = newValue;
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/members/';
        const axiosConfig = {
            headers : {
                Authorization : 'Bearer '+userToken
            }
        };

        //Call the edit user api
        try {
            
            //If the edit request is made from the admin account, append phone number to payload for identification of the member being edited
            if(isAdmin) {
                payload = {
                    ...payload,
                    'phone' :member.phone
                }
            }
            //Attaching the avatar image buffer if it has been uploaded
            payload = {
                ...payload,
                avatar : (avatarPic.bufferImage) ? avatarPic.bufferImage : ''
            }

            //Request is sent
            setSent(true);

            //Making the request with the PAYLOAD and the Configurations
            const res = await axios.patch(url, payload, axiosConfig);

            const localStorageToStore = {
                member : res.data,
                token : userToken
            }
            if(!isAdmin)
                //Set the new updated User data in the local storage
                localStorage.setItem('loggedInUser', JSON.stringify(localStorageToStore));
                
            //Tell the component to redirect back to the details page
            setRedirectToDetails(true);
        }catch(e){
            alert(e.message);
        }
    }

    if(redirectToDetails) {
        //Redirect back to the details page
        return (
        <>
            <Redirect to='/' />
        </>);
    }

    const output = (
        <div className='loginRegister'>

            <h2>Add or edit details</h2>

            <form onSubmit={submitData}>

                <div className='description'>Profile picture</div>
                <img src={(avatarPic.url) ? avatarPic.url : blankUserImage} className='avatar' name='avatar' alt='User'></img>
                <div>
                    <input type='file' name='avatar.upload' className='chooseFileInput' onChange={avatarHandler}/>
                </div>
                
                {removePicButton(avatarPic)}

                <div className='descriptionInput'><div className='description'>Phone Number</div>
                <div className='highlight'>{member.phone}</div></div>
                
                <div className='descriptionInput'><div className='description'>First Name</div>
                <input type="text" name={'name.firstName'} defaultValue={member.name.firstName} onChange={getValue}></input></div>
                
                <div className='descriptionInput'><div className='description'>Middle Name</div>
                <input type="text" name={'name.middleName'} defaultValue={member.name.middleName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Last Name</div>
                <input type="text" name={'name.lastName'} defaultValue={member.name.lastName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Date of Birth</div>
                <DatePicker name={'dateOfBirth'} selected={Date.parse(newValue.dateOfBirth)} onChange={(data) => {
                    setNewValue({
                    ...newValue,
                    'dateOfBirth' : dateFormat(data, 'mm-dd-yyyy')
                    });
                }
                }></DatePicker></div>

                <div className='descriptionInput'><div className='description'>E-mail</div>
                <input type="text" name={'email'} defaultValue={member.email} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>BAR Registration number</div>
                <input type="text" name={'registration'} defaultValue={member.registration} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Chamber Address</div>
                <input type="text" name={'address.chamberAddress'} defaultValue={member.address.chamberAddress} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Chamber Pincode</div>
                <input type="text" name={'address.chamberPincode'} defaultValue={member.address.chamberPincode} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Residential Address</div>
                <input type="text" name={'address.residentialAddress'} defaultValue={member.address.residentialAddress} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Residential Pincode</div>
                <input type="text" name={'address.residentialPincode'} defaultValue={member.address.residentialPincode} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Chamber open on</div>
                {daysInWeek.map((item, key)=> {
                    return (<div className='oneLine' key={key}>{item.label} - <input type='checkbox' name={'chamberOpenDays'} value={item.value} className='checkBox' 
                    onChange={getValue}
                    defaultChecked={(chamberOpenDays[key+1]) ? true : false}/></div>);
                })}</div>
                
                <div className='descriptionInput'><div className='description'>Chamber additional information (Optional)</div>
                <input type="text" name={'chamberOptional'} defaultValue={member.chamberOptional} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Certificates</div>
                <input type="text" name={'certificates'} defaultValue={member.certificates} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Qualification</div>
                <input type="text" name={'qualification'} defaultValue={member.qualification} onChange={getValue}></input></div>
                
                <div className='descriptionInput'><div className='description'>Expertise</div>
                <input type="text" name={'expertise'} defaultValue={member.expertise} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Experience</div>
                <input type="text" name={'experience'} defaultValue={member.experience} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Court</div>
                <input type="text" name={'courtOfPractice'} defaultValue={member.courtOfPractice} onChange={getValue}></input></div>
                <button>Submit</button>
            </form>
        </div>
    );

    return (sent) ? loaderElement : output ;
}

export default AddEditMember;