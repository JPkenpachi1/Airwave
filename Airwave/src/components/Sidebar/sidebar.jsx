import React from 'react';

const Sidebar = () => {
    return (
        <>
            <div className="sidebarContainer">
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
}

export default Sidebar;
