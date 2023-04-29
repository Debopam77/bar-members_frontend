import React,{useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Axios from 'axios';
import Members from '../components/Members';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';
import SearchMembers from '../components/SearchMembers';
import Logout from '../components/Logout';
import MemberCardDetails from '../components/MemberCardDetails';
import DeleteMember from '../components/DeleteMember';
import ShowCard from '../components/ShowCard';

function Router() {
    //Store the member data
    const [members, setMembersValue] = useState([]);

    //To check if app has a logged in user or not
    const [loggedIn, setLoggedIn] = useState(()=> {
        return (JSON.parse(localStorage.getItem('loggedInUser'))) ? true : false;
    });

    //Trigger when app starts
    useEffect(()=>{
        
        //Get the environment details from the config folder
        const environment = process.env.REACT_APP_URL;

        //Declared inside because if declared outside REACT gives warning
        const getMembers = async ()=> {
            try {
                const url = (process.env.REACT_APP_SSL)+environment+'/members'
                const member = await Axios.get(url);
                setMembersValue(member.data);
            }catch(e){
                alert('Some error occured');
            }
        }
        //Run the get members API
        getMembers();
    },[]);

    return  (
    <BrowserRouter>
    <Navbar loggedIn={loggedIn}/>
        <Routes>
            <Route path='/members/login' element={<Login setLoggedIn={setLoggedIn}/>}/>

            <Route path='/members/logout' element= {<Logout setLoggedIn={setLoggedIn}/>}/>
                
            <Route path='/members/delete' element={<DeleteMember setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>

            <Route path='/members/showCard' element = {<ShowCard members={members}/>}/>

            <Route path='/members/detail' element = {<MemberCardDetails members={members} loggedIn={loggedIn}/>}/>

            {//Sending the members state array as props
                }
            <Route path='/members' element = {<Members members={members} loggedIn={loggedIn}/>}/>

            <Route path='/aboutUs' element = {<AboutUs/>}/>
                
            <Route path='/register' element = {<RegisterUser setLoggedIn={setLoggedIn}/>}/>

            <Route path='/searchMembers' element = {<SearchMembers members={members}/>}/>
                
            <Route path='/' element = {<Members members={members} loggedIn={loggedIn}/>}/>
                {//Redirect to members page
                }

        </Routes>
    </BrowserRouter>
    );
}

export default Router;