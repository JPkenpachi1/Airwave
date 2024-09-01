import React from 'react';
import SimpleCard from '../components/widgets/card';
import { Container, Row, Col } from 'react-bootstrap';
const Home = () => {
  return(
    <>
    <div className="home_container">
   
    <Container>
            <Row>
                <Col md={4}>
                    <SimpleCard
                        title="Sample Title"
                        count={42}
                        imageSrc="https://via.placeholder.com/50"
                    />
                </Col>
                <Col md={4}>
                    <SimpleCard
                        title="Sample Title"
                        count={42}
                        imageSrc="https://via.placeholder.com/50"
                    />
                </Col>
                <Col md={4}>
                    <SimpleCard
                        title="Sample Title"
                        count={42}
                        imageSrc="https://via.placeholder.com/50"
                    />
                </Col>
            </Row>
        </Container>

    </div>
    </>
  );

};

export default Home;
