import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../config/axios';

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    technician_id: '',
    mobile: '',
    status: 'active', // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('technician/create/', formData) // Update with your API endpoint
      .then(response => {
        console.log("Technician created:", response.data);
        // Reset form after successful submission
        setFormData({
          name: '',
          technician_id: '',
          mobile: '',
          status: 'active',
        });
      })
      .catch(error => {
        console.error("There was an error creating the technician!", error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Technician Registration Form</h2>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter technician name" 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formTechnicianId">
              <Form.Label>Technician ID</Form.Label>
              <Form.Control 
                type="text" 
                name="technician_id" 
                value={formData.technician_id} 
                onChange={handleChange} 
                placeholder="Enter technician ID" 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control 
                type="text" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                placeholder="Enter mobile number" 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control 
                as="select" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TechnicianForm;
