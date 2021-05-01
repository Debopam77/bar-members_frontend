import React,{useState} from 'react';
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

                result[elementName] = elementValue 

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