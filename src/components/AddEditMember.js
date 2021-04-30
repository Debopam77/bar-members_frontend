import React,{useState} from 'react';
import '../style/index.scss';
import '../style/loginRegister.scss';

function AddEditMember({member}) {
    
    //State to store the created or updated user string
    const [newValue, setNewValue] = useState();

    //onChange triggered function to update 
    const getValue = (event)=> {
        
        //Setting the value of the state using the changed input fields
        setNewValue((newValue)=> {
            return {
                ...newValue,
                [event.target.name] : event.target.value,
            }
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
                <input type="text" name={'name:'+'firstName'} defaultValue={member.name.firstName} onChange={getValue}></input></div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default AddEditMember;