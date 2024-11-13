import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa'; // Icon for the action button
import axiosInstance from '../../config/axios'; // Update this to your axios instance

const ReusableTable = ({ columns, apiUrl, updateUrl, showActions = true }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiUrl);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleShowModal = (row) => {
    setSelectedRow(row);
    setFormData(row); // Initialize formData with selected row data
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null);
    setFormData({});
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit (updating the data)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRow) return;

    try {
      // Send PUT request to update the data dynamically based on the ID
      const response = await axiosInstance.put(`${updateUrl}/${selectedRow.id}/`, formData);
      // Update the table data with the updated row
      setData((prevData) =>
        prevData.map((item) => (item.id === selectedRow.id ? response.data : item))
      );
      handleCloseModal();
    } catch (err) {
      setError(`Failed to update: ${err.message}`);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <>
    
    <table
      style={{
        backgroundColor: 'var(--table-bg)',
        color: 'var(--table-text-color)',
        borderColor: 'var(--table-border-color)',
      }}
      className="materialTable "
    >
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={{ backgroundColor: 'var(--table-header-bg)', color: 'var(--table-header-text-color)' }}>
              {column}
            </th>
          ))}
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{item[column]}</td>
            ))}
            {showActions && (
              <td>
                <Button
                  style={{
                    backgroundColor: 'var(--button-bg)',
                    color: 'var(--button-text-color)',
                    border: 'none',
                  }}
                  size="sm"
                  onClick={() => handleShowModal(item)}
                >
                  <FaEye />
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
      {/* Modal to show and edit row details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {columns.map((column, index) => (
              <Form.Group key={index}>
                <Form.Label>{column}</Form.Label>
                <Form.Control
                  type="text"
                  name={column}
                  value={formData[column] || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReusableTable;
