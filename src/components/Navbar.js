import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Status from './Status';
import './Navbar.css'; 

function Navbar({ mode, setmode }) {
    const [hidden1, setHidden1] = useState(true); 

    const handleClick = () => {
        setHidden1(!hidden1); 
    }

    return (
        <div>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <Link className='navbar-link' to="/"> DSA Tracker </Link>
                </div>
                <div className='navbar-right' onClick={handleClick}>
                    <img className='navbar-icon' src="bulb.png" alt="Bulb"></img>
                    <div className='navbar-text'>
                        Hot Tip
                    </div>
                </div>
            </div>
            {hidden1 && <Status visi="hidden" />} 
        </div>
    )
}

export default Navbar;
