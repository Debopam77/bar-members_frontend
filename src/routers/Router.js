import React,{useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Axios from 'axios';
import Home from '../components/Home';
import Members from '../components/Members';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';
import SearchMembers from '../components/SearchMembers';
import Logout from '../components/Logout';
import MemberCardDetails from '../components/MemberCardDetails';

function Router() {
    const [members, setMembersValue] = useState([]);
    const [loggedIn, setLoggedIn] = useState(()=> {
        return (JSON.parse(localStorage.getItem('loggedInUser'))) ? true : false;
    });

    //Trigger when app starts
    useEffect(()=>{
        
        //Get the environment details from the config folder
        const environment = process.env.REACT_APP_URL;

        //Api getting called
        const getMembers = async ()=> {
            try {
                const url = 'http://'+environment+'/members'
                const member = await Axios.get(url);
                setMembersValue(member.data);
            }catch(e){
                console.log('Some error occured');
            }
        }

        getMembers();
    },[]);

    return  (
    <BrowserRouter>
    <Navbar loggedIn={loggedIn}/>
        <Switch>
            <Route path='/members/login'>
                <Login setLoggedIn={setLoggedIn}/>
            </Route>
            <Route path='/members/logout'>
                <Logout setLoggedIn={setLoggedIn}/>
            </Route>
            <Route path='/members/detail'>
                <MemberCardDetails loggedIn={loggedIn}/>
            </Route>
            <Route path='/members'>
                {//Sending the members state array as props
                }
                <Members members={members}/>
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
                <Home/>
            </Route>
        </Switch>
    </BrowserRouter>
    );
}

export default Router;