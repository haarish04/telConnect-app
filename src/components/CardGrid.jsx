import React, { useState, useContext } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import "../styles/CardGrid.css";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import { onPlanClickHandler } from "../utils/authUtils";

const CardGrid = ({ plan_card1, plan_card2, plan_card3 }) => {
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const [showModal, setShowModal] = useState(false);
  const { customerData } = useContext(CustomerContext); // Access customer data from context
  const navigate = useNavigate(); // Hook to handle navigation

  // Call the plan click handler on button click, passing planId
  const handleClick = () => {
    if (selectedPlan?.planId) {
      // Ensure selectedPlan is set and pass planId
      onPlanClickHandler(navigate, customerData, selectedPlan.planId);
    } else {
      console.log("No plan selected");
    }
  };

  // Handle viewing plan details, setting the selected plan
  const handleViewDetails = (plan) => {
    setSelectedPlan(plan); // Set selected plan
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelection = (plan) => {
    setSelectedPlan(plan);                   
    handleClick();
  }

  // Render individual plan cards
  const renderPlanCard = (plan) => (
    <Card className="plan-card" key={plan.planId}>
      <Card.Body>
        <Card.Title className="plan-price">₹ {plan.price}</Card.Title>
        <Card.Subtitle className="mb-2">
          <Button
            variant="link"
            className="custom-link-button"
            onClick={() => handleViewDetails(plan)} // View details when clicked
          >
            View details
          </Button>
        </Card.Subtitle>

        <div className="plan-details">
          <div className="detail-section">
            <div>VALIDITY</div>
            <div>
              <strong>{plan.validity} days</strong>
            </div>
          </div>
          <div className="detail-section">
            <div>DATA</div>
            <div>
              <strong>{plan.data} GB</strong>
            </div>
          </div>
        </div>

        {/* Select the plan directly from the card, then call handleClick */}
        <Button
          className="recharge-button"
          onClick={() => { handleSelection(plan) }}
        >
          Select
        </Button>
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
          {/* Ensure plan is selected from modal, then call handleClick */}
          <Button
            className="recharge-button"
            onClick={() => {
              handleSelection(selectedPlan.planId)
            }}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardGrid;
