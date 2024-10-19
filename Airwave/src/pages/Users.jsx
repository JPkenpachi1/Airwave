import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
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
      <h2>User Profile Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
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

        <Form.Group controlId="formPhone">
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

        <Form.Group controlId="formPhone2">
          <Form.Label>Phone 2 (Optional)</Form.Label>
          <Form.Control
            type="text"
            name="phone2"
            placeholder="Enter secondary phone number"
            value={formData.phone2}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
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

        <Form.Group controlId="formUsername">
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

        <Button className="mt-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Users;