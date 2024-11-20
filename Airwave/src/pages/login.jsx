import React, { useState } from 'react';
import axiosInstance from '../config/axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const loginData = {
            email: email,
            password: password,
        };

        axiosInstance.post('login/', loginData)
            .then(response => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                window.location.href = '/';
            })
            .catch(err => {
                setError('Invalid email or password');
            });
    };

    return (
        <div className='loginPage'>
        <Container className=' d-flex justify-content-center align-items-center flex-column '>
            
            <Form className='login-container' onSubmit={handleSubmit}>
            <h2 className="text-center mt-4 mb-2">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formEmail" className='mb-4'>
                    <Form.Label className='fw-bold fs-6'>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        className='login-form-control'
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className='mb-4'>
                    <Form.Label className='fw-bold fs-6'>Password</Form.Label>
                    <Form.Control 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        className='login-form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* <span 
                        style={{ position: 'absolute', right: '10px', top: '35px', cursor: 'pointer' }} 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span> */}
                </Form.Group>

                <button   type="submit"  className=" mt-4 login-button-primary" >
                    Login
                </button>
            </Form>
        </Container>
        </div>
    );
};

export default Login;
