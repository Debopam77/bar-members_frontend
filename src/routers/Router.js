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
            <Route path='/members/login'>
                <Login setLoggedIn={setLoggedIn}/>
            </Route>
            <Route path='/members/logout'>
                <Logout setLoggedIn={setLoggedIn}/>
            </Route>
            <Route path='/members/delete'>
                <DeleteMember setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            </Route>
            <Route path='/members/showCard'>
                <ShowCard members={members}/>
            </Route>
            <Route path='/members/detail'>
                <MemberCardDetails members={members} loggedIn={loggedIn}/>
            </Route>
            <Route path='/members'>
                {//Sending the members state array as props
                }
                <Members members={members} loggedIn={loggedIn}/>
            </Route>
            <Route path='/aboutUs'>
                <AboutUs/>
            </Route>
            <Route path='/register'>
                <RegisterUser setLoggedIn={setLoggedIn}/>
            </Route>
            <Route path='/searchMembers'>
                <SearchMembers members={members}/>
            </Route>
            <Route path='/'>
                {//Redirect to members page
                }
                <Members members={members} loggedIn={loggedIn}/>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default Router;