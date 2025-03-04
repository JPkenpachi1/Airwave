import React, { useState, useEffect } from "react";
import SimpleCard from "../components/widgets/card";
import { Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../config/axios";
import users from "../assets/3d-contact.png";
import complaint from "../assets/complain.png";
import en from "../assets/information.png";
import DonutChart from "../components/widgets/Donnut";
import ComplaintTable from "../components/widgets/tableWidget";


const Home = () => {
  const [counts, setCounts] = useState({
    complaint_count: 0,
    enquiry_count: 0,
    users_count: 0,
  });

  const [animate, setAnimate] = useState(false); // State to trigger animation

  // Fetch the counts from the API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axiosInstance.get("counts/");
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching the counts:", error);
      }
    };

    fetchCounts();

    // Trigger animation after a short delay
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home_container">
      <Container>
        <Row>
          <Col md={4} className={animate ? "pop-animation" : ""}>
            <SimpleCard
              title="Complaints"
              count={counts.complaint_count}
              imageSrc={complaint}
            />
          </Col>
          <Col md={4} className={animate ? "pop-animation" : ""}>
            <SimpleCard
              title="Enquiries"
              count={counts.enquiry_count}
              imageSrc={en}
            />
          </Col>
          <Col md={4} className={animate ? "pop-animation" : ""}>
            <SimpleCard
              title="Users"
              count={counts.users_count}
              imageSrc={users}
            />
          </Col>
        </Row>
        <Row>
          <Col className="p-0 pop-animation" md={6}>
            <div className="DonutChart">
              <DonutChart />
            </div>
          </Col>
          <Col className="pop-animation" md={6}>
            <ComplaintTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
