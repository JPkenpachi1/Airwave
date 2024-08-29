import React from 'react';
import './sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";

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
                        <li className="sidelinks">Home</li>
                        <li className="sidelinks">Complaints</li>
                        <li className="sidelinks">Reports</li>
                        <li className="sidelinks">Chat</li>
                        <li className="sidelinks">Misc</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
