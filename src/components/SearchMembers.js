import React,{useState} from 'react';
import MemberCardDetails from './MemberCardDetails';
import '../style/index.scss';
import '../style/searchMember.scss'

function SearchMembers({members}) {
    const [searchValue, setSearchValue] = useState(null);
    const [clicked, setClicked] = useState();
    //Gets the value from the input field

    const renderOutput = () => {

        const getValue= (event)=> {
            setSearchValue(event.target.value);
        }    

        //If a member div is clicked, return member details
        if(clicked){
            return (
                <div>
                    <div className='member'><MemberCardDetails member={clicked}></MemberCardDetails></div>
                </div>  
            );
        }

        //return : search field and suggestions
        return (
            <div>
                <h2>Enter name or phone number or registration</h2>
                    <div className='searchMembers'>
                    <div><input type='text' id='searchInput' onChange={getValue}></input></div>
                    </div>
                <div className='searchSuggestions'>
                    {
                        members.filter((member)=> {
                            if(searchValue === null)
                                return '';
                            else if(member.name.firstName.toLowerCase().includes(searchValue) || 
                                    member.name.lastName.toLowerCase().includes(searchValue) ||
                                    member.phone.includes(searchValue))
                                return member;
                            return <></>;         
                        }).map((member, index)=>{
                            return (
                                <div onClick={()=>{setClicked(member)}} key={'suggestion'+index} className='suggestion'>{member.name.firstName} {member.name.lastName} - {member.phone}</div>
                            );
                        })
                    }
                </div>
            </div>
         );
    }
    return renderOutput();
}

export default SearchMembers;