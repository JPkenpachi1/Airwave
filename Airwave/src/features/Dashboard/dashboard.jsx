import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import NavBar from '../../components/Navbar/navbar';
import { Outlet } from 'react-router-dom';
import '../../components/Navbar/navabar.css'
const Dashboard = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [sidebarclick, sidebarClicked] = useState(false);
    const [navToggle, setNavToggle] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        sidebarClicked(!sidebarclick);
        setNavToggle(!navToggle);
    };

    return (
        <>
            <NavBar navToggle={navToggle} />
            <Sidebar
                isClicked={isClicked}
                sidebarclick={sidebarclick}
                navToggle={navToggle}
                handleClick={handleClick}
            />
            <div>
            <div className={`dashboard__container ${navToggle ? 'nav-collapsed' : ''}`}>
                <Outlet />
            </div>
            </div>
        </>
    );
};

export default Dashboard;
