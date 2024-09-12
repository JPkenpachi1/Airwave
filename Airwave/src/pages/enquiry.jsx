import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    enquiryStartDate: '',
    bookingDate: '',
    enquiryCloserDate: '',
    name: '',
    address: '',
    area: '',
    contactNo: '',
    enquiryState: '',
    enquiryStatus: '',
    assignedTo: '',
    submittedBy: '',
    resolutionSummary: '',
    remarks: '',
    endingStatus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add submission logic here (e.g., API call)
  };

  return (
    <Container>
      <h2 className="mb-4">Enquiry Management Form</h2>
      <Form onSubmit={handleSubmit}>
        {/* Enquiry Dates */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="enquiryStartDate">
              <Form.Label>Enquiry Start Date</Form.Label>
              <Form.Control
                type="date"
                name="enquiryStartDate"
                value={formData.enquiryStartDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="bookingDate">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="enquiryCloserDate">
              <Form.Label>Enquiry Closer Date</Form.Label>
              <Form.Control
                type="date"
                name="enquiryCloserDate"
                value={formData.enquiryCloserDate}
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
            <Form.Group controlId="contactNo">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Enquiry State and Status */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="enquiryState">
              <Form.Label>Enquiry State</Form.Label>
              <Form.Control
                as="select"
                name="enquiryState"
                value={formData.enquiryState}
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
            <Form.Group controlId="enquiryStatus">
              <Form.Label>Enquiry Status</Form.Label>
              <Form.Control
                as="select"
                name="enquiryStatus"
                value={formData.enquiryStatus}
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
            <Form.Group controlId="assignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of person assigned to"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="submittedBy">
              <Form.Label>Submitted By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the submitter's name"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Resolution Summary and Remarks */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="resolutionSummary">
              <Form.Label>Resolution Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter resolution summary"
                name="resolutionSummary"
                value={formData.resolutionSummary}
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
            <Form.Group controlId="endingStatus">
              <Form.Label>Ending Status</Form.Label>
              <Form.Control
                as="select"
                name="endingStatus"
                value={formData.endingStatus}
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
