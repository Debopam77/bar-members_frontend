import React,{useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import '../style/index.scss';
import '../style/loginRegister.scss';
import {arrToObj, keyToValueConvert} from '../utilFunctions/arrayObjectConversions';

function AddEditMember({member}) {

    //Values that cannot be changed
    const excludedAttributes = ['phone', 'registration', 'updatedAt', 'age', 'isAdmin', 'chamberOpenDays', 'courtOfPractice', 'expertise', 'certificates'];
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

        }else if(elementName === 'certificates' || elementName === 'expertise' || elementName === 'courtOfPractice') {
            //Handle comma separated arrays
            arr = (event.target.value).split(',');
            elementValue = arrToObj(arr);
        }
        
        //Setting the value of the state using the changed input fields
        setNewValue(()=> {
            
            let result = defaultValue;

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

    const submitData = (event)=> {
        event.preventDefault();
        console.log(newValue);
    }

    return (
        <div className='loginRegister'>
            <form onSubmit={submitData}>
                
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

                <div className='descriptionInput'><div className='description'>Certificates</div>
                <input type="text" name={'certificates'} defaultValue={member.certificates} onChange={getValue}></input></div>
                
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
}

export default AddEditMember;