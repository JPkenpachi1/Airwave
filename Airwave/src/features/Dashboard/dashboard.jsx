import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import NavBar from '../../components/Navbar/navbar';


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
       
            <Sidebar
                isClicked={isClicked}
                sidebarclick={sidebarclick}
                navToggle={navToggle}
                handleClick={handleClick} 
                />
                
           
           
                <NavBar navToggle={navToggle} />
                {/* Other content */}
                </>
    );
};

export default Dashboard;
