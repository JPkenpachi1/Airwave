import React from 'react';
import Card from 'react-bootstrap/Card';


const SimpleCard = ({ title, count, imageSrc }) => {
    return (
        <Card className="custom-card">
        <Card.Body className="custom-card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{count}</Card.Text>
        </Card.Body>
        <div className="custom-card-img">
          <Card.Img
            variant="top"
            src={imageSrc}
            alt="Card image"
            className="custom-card-img"
          />
        </div>
      </Card>
      
    );
};

export default SimpleCard;
