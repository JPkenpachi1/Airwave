import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './navabar.css';
import ThemeToggle from '../theme/theme';


const NavBar = ({ navToggle }) => {
    return (
        <Navbar
            expand="lg"
            className={`bg-body-tertiary ${navToggle ? 'nav-collapsed' : ''}`}
        >
            <Container fluid>
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
                <ThemeToggle/>
                
            </Container>
        </Navbar>
    );
};

export default NavBar;
