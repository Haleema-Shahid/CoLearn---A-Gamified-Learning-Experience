import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavbarTwo.css'

class NavbarTwo extends Component{
    render()
    {
        return(
            <div className='navbar'>
                <div className='container flex'>
                    <h1>logo</h1>
                    <nav>
                        <ul>
                            <li className='nav'>About Us</li>
                            <li className='nav'>Profile</li>
                        </ul>
                    </nav>
                </div>
            </div>

        );
    };
}

export default NavbarTwo