import React from 'react';
import Card from 'react-bootstrap/Card';


const SimpleCard = ({ title, count, imageSrc }) => {
    return (
        <Card style={{ width: '18rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Card.Body style={{ flex: 1 }}>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {count}
                </Card.Text>
            </Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Card.Img variant="top" src={imageSrc} alt="Card image"  style={{ width: '50px', height: '50px', marginBottom: '10px', margin:'10px' }} />
              
            </div>
        </Card>
    );
};

export default SimpleCard;
