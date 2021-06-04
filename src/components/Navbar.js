import React,{useState, useEffect} from 'react';
import '../style/index.scss';
import '../style/Navbar.scss';
import {convertBufferToImg, getFileURL} from '../utilFunctions/avatarImageConversions';
import blankUserImage from '../resources/img/user.png';

function Navbar({loggedIn}) {

    //weather to show navbar links or a button (Reactive)
    const [showNavMenu, setShowNavMenu] = useState(false);

    const navMenuElement = <div className='navMenuIcon' onClick={()=>{setShowNavMenu(!showNavMenu)}}></div>;

    

    //Storing the user data
    const [user, setUser] = useState();
    let myAvatarElement = undefined;
    //Array of the navbar links
    let navBarItems = [
        {
            url: '/searchMembers',
            class: 'searchIcon',
        },
        {
            title : 'Home',
            url: '/home',
            class: 'nav-links'
        },
        {
            title : 'Members',
            url: '/members',
            class: 'nav-links'
        },
        {
            title : 'Register',
            url: '/register',
            class: 'nav-links'
        },
        {
            title : 'Login',
            url: '/members/login',
            class: 'nav-links'
        },
        {
            title : 'About us',
            url: '/aboutUs',
            class: 'nav-links'
        }
    ];

    //Load user details in state at Navbar load
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedInUser')));
    }, [loggedIn]);

    //Things to change once an user logs in
    if(loggedIn){
        //Add logout link
        navBarItems[4] = {
            title : 'Logout',
            url: '/members/logout',
            class: 'nav-links'
        }
        //Remove the login link
        navBarItems.splice(3, 1);

        //Add an image of the user an point it to the user profile
        myAvatarElement = (user) ? <a href='/members/detail'><img src={(user.member.avatar && user.member.avatar.data.length>0) ? getFileURL(convertBufferToImg(user.member.avatar.data)) : blankUserImage} className='avatar' alt='avatar'></img></a> : undefined;
    }

    return (
        <div className='navbar'>
            <div className='logoName'><a href='/'><div className='advocateIcon'></div></a><a href='/'> {(user)? 'Welcome '+user.member.name.firstName : 'Bar-Council Members'}</a></div>
            <div className='navchunk'>
                <div className='links' id={(showNavMenu) ? 'hidden' : ''}>
                    {navBarItems.map((item, index)=> {
                    return (
                        <a key={'navLink'+index} className={item.class} href={item.url}>{item.title}</a>
                    )
                    })}
                </div>
                {myAvatarElement}
                {navMenuElement}
            </div>
        </div>
    );
}

export default Navbar;