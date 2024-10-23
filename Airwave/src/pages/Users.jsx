import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../config/axios";

const Users = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phone2: "",
    address: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("user-profile/create", formData) // Adjust your API URL accordingly
      .then((response) => {
        console.log("Form submitted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form", error);
      });
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">User Profile Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* Name */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Username */}
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter a unique username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/* Phone */}
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter primary phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Phone 2 */}
            <Form.Group controlId="formPhone2" className="mb-3">
              <Form.Label>Phone 2 (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="phone2"
                placeholder="Enter secondary phone number"
                value={formData.phone2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            {/* Address */}
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="d-flex justify-content-center align-items-center">
            <Button style={{width:'200px'}} variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Users;
