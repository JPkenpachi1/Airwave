import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';

const ToastComponent = ({ 
    variant = 'Primary', 
    message = 'Hello, world! This is a toast message.', 
    showToast, 
    setShowToast, 
    delay = 3000 
}) => {

    const toggleShowToast = () => setShowToast(false); // Use this to hide the toast when dismissed

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                bg={variant.toLowerCase()}
                show={showToast}
                onClose={toggleShowToast}
                delay={delay}
                autohide
            >
                <Toast.Header closeButton>
                    <strong className="me-auto"></strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body className={variant === 'Dark' ? 'text-white' : ''}>
                    {message}
                   
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastComponent;
