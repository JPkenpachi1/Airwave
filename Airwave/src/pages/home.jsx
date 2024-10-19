import React, { useState, useEffect } from 'react';
import SimpleCard from '../components/widgets/card';
import { Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../config/axios'; // Assuming axiosInstance is in the utils folder

const Home = () => {
  const [counts, setCounts] = useState({
    complaint_count: 0,
    enquiry_count: 0,
    users_count: 0
  });

  // Fetch the counts from the API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axiosInstance.get('counts/'); // Assuming 'counts/' is the endpoint
        setCounts(response.data); // Update state with API data
      } catch (error) {
        console.error('Error fetching the counts:', error);
      }
    };

    fetchCounts(); // Fetch the counts when the component mounts
  }, []);

  return (
    <div className="home_container">
      <Container>
        <Row>
          <Col md={4}>
            <SimpleCard
              title="Complaints"
              count={counts.complaint_count}
              imageSrc="https://via.placeholder.com/50"
            />
          </Col>
          <Col md={4}>
            <SimpleCard
              title="Enquiries"
              count={counts.enquiry_count}
              imageSrc="https://via.placeholder.com/50"
            />
          </Col>
          <Col md={4}>
            <SimpleCard
              title="Users"
              count={counts.users_count}
              imageSrc="https://via.placeholder.com/50"
            />
          </Col>
          {/* Add more cards for other counts if needed */}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
