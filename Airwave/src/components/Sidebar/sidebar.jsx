import React from 'react';
import './sidebar.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus, FaChartBar, FaExclamationCircle, FaQuestionCircle,FaTools } from 'react-icons/fa'; // Example icons from FontAwesome
import { FiLogOut } from "react-icons/fi";
import authservice from '../../config/authservice';
const Sidebar = ({ isClicked, sidebarclick, navToggle, handleClick }) => {
  const handleLogout = async() =>{
    try {
      await authservice.logout();  // Use the AuthService logout function
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
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
      <Link className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''}`} to="/tech">
          <FaTools className="me-2" /> {sidebarclick ? null : 'Technicans'}
        </Link>
      </ul>
                </div>
          <button  onClick={handleLogout} className={`sidelinks ${sidebarclick ? 'collapsedLinks' : ''} sidebarButton`}>
          <FiLogOut style={{ marginRight: sidebarclick ? "0" : "8px" }} />
          {sidebarclick ? null : 'Logout'}
          </button>
            </div>
        </>
    );
};

export default Sidebar;
