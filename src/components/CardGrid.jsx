import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const CardGrid = ({ plan_card1, plan_card2, plan_card3 }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      <Col>
        <Card>
          <Card.Img variant="top" src={"https://via.placeholder.com/150"} />
          <Card.Body>
            <Card.Title>{plan_card1.planName}</Card.Title>
            <Card.Text>
              {plan_card1.description}
            </Card.Text>
            <Button style={{
                backgroundColor: '#1E2A5A',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'block',
                margin: '10px auto',
                fontSize: '16px',
            }}>{'Learn More'}</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img variant="top" src={"https://via.placeholder.com/150"} />
          <Card.Body>
            <Card.Title>{plan_card2.planName}</Card.Title>
            <Card.Text>
              {plan_card2.description}
            </Card.Text>
            <Button style={{
                backgroundColor: '#1E2A5A',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'block',
                margin: '10px auto',
                fontSize: '16px',
            }}>{'Learn More'}</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img variant="top" src={"https://via.placeholder.com/150"} />
          <Card.Body>
            <Card.Title>{plan_card3.planName}</Card.Title>
            <Card.Text>
              {plan_card3.description}
            </Card.Text>
                <Button style={{
                    backgroundColor: '#1E2A5A',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '10px auto',
                    fontSize: '16px',
                }}>{'Learn More'}</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CardGrid;
