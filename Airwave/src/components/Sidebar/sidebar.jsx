import React from 'react';
import './sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus, FaChartBar, FaExclamationCircle, FaQuestionCircle,FaTools } from 'react-icons/fa'; // Example icons from FontAwesome
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
                <div className="sidebar ">
                <ul className="sidebarLinks d-flex flex-column">
                <Link className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''}`} to="/home">
        <FaHome className="me-2" /> {sidebarclick ? null : 'Home'}
      </Link>
      <Link className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''}`} to="/users">
        <FaUserPlus className="me-2" /> {sidebarclick ? null : 'New Users'}
      </Link>
      <Link className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''}`} to="/reports">
        <FaChartBar className="me-2" /> {sidebarclick ? null : 'Reports'}
      </Link>
      <Link className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''}`} to="/complaints">
        <FaExclamationCircle className="me-2" /> {sidebarclick ? null : 'Complaints'}
      </Link>
      <Link className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''}`} to="/enquiry">
        <FaQuestionCircle className="me-2" /> {sidebarclick ? null : 'Enquiry'}
      </Link>
      <Link className="sidelinks" to="/tech">
          <FaTools className="me-2" /> Technicians
        </Link>
      </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
