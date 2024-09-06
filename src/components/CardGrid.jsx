import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import '../styles/CardGrid.css';

const CardGrid = ({ plan_card1, plan_card2, plan_card3 }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderPlanCard = (plan) => (
    <Card className="plan-card">
      <Card.Body>
        <Card.Title className="plan-price">₹ {plan.price}</Card.Title>
        <Card.Subtitle className="mb-2">
          <Button variant="link" className="custom-link-button" onClick={() => handleViewDetails(plan)}>
            View details
          </Button>
        </Card.Subtitle>

        <div className="plan-details">
          <div className="detail-section">
            <div>VALIDITY</div>
            <div><strong>{plan.validity}</strong></div>
          </div>
          <div className="detail-section">
            <div>DATA</div>
            <div><strong>{plan.data} GB</strong></div>
          </div>
        </div>

        <Button className="recharge-button">Select</Button>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>{renderPlanCard(plan_card1)}</Col>
        <Col>{renderPlanCard(plan_card2)}</Col>
        <Col>{renderPlanCard(plan_card3)}</Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlan?.plan_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-detail">
            <h5>Price:</h5>
            <p>₹ {selectedPlan?.price}</p>
          </div>
          <div className="modal-detail">
            <h5>Description:</h5>
            <p>{selectedPlan?.description}</p>
          </div>
          <div className="modal-detail">
            <h5>Validity:</h5>
            <p>{selectedPlan?.validity} days</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="recharge-button" onClick={handleCloseModal}>Select</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardGrid;
