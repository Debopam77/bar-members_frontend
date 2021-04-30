import React,{useState, useEffect} from 'react';
import '../style/index.scss';
import '../style/Navbar.scss';

function Navbar({loggedIn}) {
    const [user, setUser] = useState();

    //Array of the navbar links
    let navBarItems = [
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
            title : 'Login',
            url: '/members/login',
            class: 'nav-links'
        },
        {
            title : 'About us',
            url: '/aboutUs',
            class: 'nav-links'
        },
        {
            url: '/searchMembers',
            class: 'searchIcon',
        }
    ];

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedInUser')));
    }, [loggedIn]);

    if(loggedIn){
        
        navBarItems[2] = {
            title : 'Logout',
            url: '/members/logout',
            class: 'nav-links'
        }
        navBarItems.splice(2, 0, {
            title : 'Me',
            url: '/members/detail',
            class: 'nav-links'
        });
    }

    return (
        <div className='navbar'>
            <div className='logoName'><div className='advocateIcon'></div><a href='/'>{(user)? 'Welcome '+user.member.name.firstName : 'Bar-Council Members'}</a></div>
            <div className='navchunk'>
                {navBarItems.map((item, index)=> {
                    return (
                        <a key={'navLink'+index} className={item.class+' links'} href={item.url}>{item.title}</a>
                    )
                })}
            </div>
        </div>
    );
}

export default Navbar;