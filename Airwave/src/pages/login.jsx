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
        <div style={{display:'flex' ,justifyContent:'center' , alignItems:'center' , height:'100vh',width:'100%',backgroundColor:'#242424'}}>
        <Container >
         
                    <h2 className="login-title">Login</h2>
                    {error && <Alert className="login-alert-danger">{error}</Alert>}
                    <Form className='login-container' onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="login-form-control"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="login-password-container">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="login-form-control"
                            />
                            <span 
                                className="login-eye-icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </Form.Group>

                        <Button type="submit" className="login-button-primary mt-3">
                            Login
                        </Button>
                    </Form>
              
         
        </Container>
        </div>
    );
};

export default Login;
