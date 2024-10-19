import React from 'react';
import './sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Sidebar = ({ isClicked, sidebarclick, navToggle, handleClick }) => {
    return (
        <>
            <div className={`sidebarContainer ${sidebarclick ? 'sideClicked' : ''}`}>
                <div className="sidebarHam">
                    <RxHamburgerMenu
                        className={`hamburger-icon ${isClicked ? 'clicked' : ''}`}
                        onClick={handleClick} 
                    />
                </div>
                <div className="sidebar">
                    <ul className="sidebarLinks">
                        <li className="sidelinks"><Link to="/home">Home</Link></li>
                        <li className="sidelinks"><Link to="/users">New Users</Link></li>
                        <li className="sidelinks"><Link to="/reports">Reports</Link></li>
                        <li className="sidelinks"><Link to="/complaints">Complaints</Link></li>
                        <li className="sidelinks"><Link to="/enquiry">Enquiry</Link></li>
                       
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
