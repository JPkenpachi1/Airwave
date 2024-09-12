import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaintType: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Submit form logic here (e.g., API call)
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Complaint Management Form</h2>
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Complaint Type */}
            <Form.Group controlId="formComplaintType" className="mb-3">
              <Form.Label>Complaint Type</Form.Label>
              <Form.Control
                as="select"
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
              >
                <option value="">Select Complaint Type</option>
                <option value="service">Service</option>
                <option value="product">Product</option>
                <option value="billing">Billing</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* Complaint Description */}
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Complaint Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter the details of your complaint"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Submit Complaint
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Complaint;
