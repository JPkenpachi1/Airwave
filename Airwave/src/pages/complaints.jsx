import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ToastComponent from '../components/widgets/toast'; // Import your ToastComponent
import axiosInstance from '../config/axios'; // Import your axios instance

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    phone2: '',
    address: '',
    complaint_type: '',
    complaint_description: '',
    status: 'open', // Set default status
    technician: 1 
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('Primary');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show toast for submission start
    setToastVariant('Info');
    setToastMessage('Submitting your complaint...');
    setShowToast(true);

    axiosInstance.post('complaint/create/', formData) // Adjust the endpoint as needed
      .then(response => {
        // Success toast message
        setToastVariant('Success');
        setToastMessage('Complaint submitted successfully!');
        setShowToast(true);
        
        // Reset form data after success if needed
        setFormData({
          name: '',
          phone: '',
          phone2: '',
          address: '',
          complaint_type: '',
          complaint_description: '',
          status: 'open', // Reset to default status
        });
      })
      .catch(error => {
        // Error toast message
        setToastVariant('Danger');
        setToastMessage('Failed to submit complaint. Please try again.');
        setShowToast(true);
        console.error('Error submitting complaint:', error);
      });
  };

  return (
    <Container>
      <ToastComponent 
        variant={toastVariant} 
        message={toastMessage} 
        showToast={showToast} 
        setShowToast={setShowToast} 
      />
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

            {/* Phone Number */}
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Optional Phone Number 2 */}
            <Form.Group controlId="formPhone2" className="mb-3">
              <Form.Label>Optional Phone Number 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter an alternative phone number (optional)"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Address */}
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Complaint Type */}
            <Form.Group controlId="formComplaintType" className="mb-3">
              <Form.Label>Complaint Type</Form.Label>
              <Form.Control
                as="select"
                name="complaint_type"
                value={formData.complaint_type}
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
                name="complaint_description"
                value={formData.complaint_description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Status */}
            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
                <option value="in-progress">In Progress</option>
              </Form.Control>
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
