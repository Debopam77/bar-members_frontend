import React,{useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Multiselect} from 'multiselect-react-dropdown';
import dateFormat from 'dateformat';
import '../style/index.scss';
import '../style/loginRegister.scss';

function AddEditMember({member}) {
    
    //Values that cannot be changed
    const uniqueAttributes = ['phone', 'registration', 'updatedAt', 'age', 'isAdmin'];
    let defaultValue = Object.keys(member)
        .filter((key) => !uniqueAttributes.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key] : member[key]
            };
        }, {});

    //State to store the created or updated user string
    const [newValue, setNewValue] = useState(defaultValue);

    //onChange triggered function to update 
    const getValue = (event)=> {
        
        //Setting the value of the state using the changed input fields
        setNewValue(()=> {
            const elementName = event.target.name;
            const elementValue = event.target.value;
            let result = defaultValue;

            if(elementName.includes('.')) {
                const part = elementName.split('.');
                result[part[0]][part[1]] = elementValue;

            }else{
                result[elementName] = elementValue; 
            }

            return result;
        });
    }

    const submitData = (event)=> {
        event.preventDefault();
        console.log(defaultValue);
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

                <div className='descriptionInput'><div className='description'>Chamber Address</div>
                <input type="text" name={'address.chamberAddress'} defaultValue={member.address.chamberAddress} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Chamber Pincode</div>
                <input type="text" name={'address.chamberPincode'} defaultValue={member.address.chamberPincode} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Residential Address</div>
                <input type="text" name={'address.residentialAddress'} defaultValue={member.address.residentialAddress} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Residential Pincode</div>
                <input type="text" name={'address.residentialPincode'} defaultValue={member.address.residentialPincode} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Chamber open on</div>
                <Multiselect options={['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']} displayValue='key'/></div>

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

                <div className='descriptionInput'><div className='description'>Experience</div>
                <input type="text" name={'experience'} defaultValue={member.experience} onChange={getValue}></input></div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default AddEditMember;