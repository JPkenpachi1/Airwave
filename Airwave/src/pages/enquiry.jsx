import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ToastComponent from '../components/widgets/toast';
import axiosInstance from '../config/axios';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    enquiry_start_date: '',
    booking_date: '',
    enquiry_closer_date: '',
    name: '',
    address: '',
    area: '',
    contact_no: '',
    enquiry_state: '',
    enquiry_status: '',
    assigned_to: '',
    submitted_by: '',
    resolution_summary: '',
    remarks: '',
    ending_status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('Primary');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show toast for submission start (optional)
    setToastVariant('Info');
    setToastMessage('Submitting form data...');
    setShowToast(true);
    
    axiosInstance.post('enquiries/', formData)
      .then(response => {
        // Success toast message
        setToastVariant('Success');
        setToastMessage('Form submitted successfully!');
        setShowToast(true);
        
        // Reset form data after success if needed
        setFormData({
          enquiry_start_date: '',
          booking_date: '',
          enquiry_closer_date: '',
          name: '',
          address: '',
          area: '',
          contact_no: '',
          enquiry_state: '',
          enquiry_status: '',
          assigned_to: '',
          submitted_by: '',
          resolution_summary: '',
          remarks: '',
          ending_status: ''
        });
      })
      .catch(error => {
        // Error toast message
        setToastVariant('Danger');
        setToastMessage('Failed to submit form data. Please try again.');
        setShowToast(true);
        console.error('Error submitting form:', error);
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
      <h2 className="mb-4">Enquiry Management Form</h2>
     
      <Form onSubmit={handleSubmit}>
        {/* Enquiry Dates */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="enquiry_start_date">
              <Form.Label>Enquiry Start Date</Form.Label>
              <Form.Control
                type="date"
                name="enquiry_start_date"
                value={formData.enquiry_start_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="booking_date">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="enquiry_closer_date">
              <Form.Label>Enquiry Closer Date</Form.Label>
              <Form.Control
                type="date"
                name="enquiry_closer_date"
                value={formData.enquiry_closer_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Name and Address */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="name">
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
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Area and Contact Number */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="area">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter area"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contact_no">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Enquiry State and Status */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="enquiry_state">
              <Form.Label>Enquiry State</Form.Label>
              <Form.Control
                as="select"
                name="enquiry_state"
                value={formData.enquiry_state}
                onChange={handleChange}
              >
                <option>Select Enquiry State</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="enquiry_status">
              <Form.Label>Enquiry Status</Form.Label>
              <Form.Control
                as="select"
                name="enquiry_status"
                value={formData.enquiry_status}
                onChange={handleChange}
              >
                <option>Select Enquiry Status</option>
                <option value="Resolved">Resolved</option>
                <option value="Unresolved">Unresolved</option>
                <option value="Escalated">Escalated</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Assigned To and Submitted By */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="assigned_to">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of person assigned to"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="submitted_by">
              <Form.Label>Submitted By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the submitter's name"
                name="submitted_by"
                value={formData.submitted_by}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Resolution Summary and Remarks */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="resolution_summary">
              <Form.Label>Resolution Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter resolution summary"
                name="resolution_summary"
                value={formData.resolution_summary}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="remarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Ending Status */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="ending_status">
              <Form.Label>Ending Status</Form.Label>
              <Form.Control
                as="select"
                name="ending_status"
                value={formData.ending_status}
                onChange={handleChange}
              >
                <option>Select Ending Status</option>
                <option value="Successful">Successful</option>
                <option value="Unsuccessful">Unsuccessful</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EnquiryForm;
