import React, { useState, useContext } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "../styles/Carousel.css"; // Your custom CSS
import plan_image1 from "../assets/plan_image1.png";
import plan_image2 from "../assets/plan_image2.png";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import { onPlanClickHandler } from "../utils/authUtils";

const CarouselComponent = ({ plan_carousel1, plan_carousel2}) => {
  
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const { customerData } = useContext(CustomerContext); // Access customer data from context
  const navigate = useNavigate(); // Hook to handle navigation

  // Call the plan click handler on button click, passing planId
  const handleClick = (plan) => {
    setSelectedPlan(plan);
    if (selectedPlan?.planId) {
      // Ensure selectedPlan is set and pass planId
      onPlanClickHandler(navigate, customerData, selectedPlan.planId);
    } else {
      console.log("No plan selected");
    }
  };
  
  return (
    <Carousel interval={3000} controls={true} indicators={true}>
      {plan_carousel1 && (
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <img
              src={plan_image1}
              alt={plan_carousel1.planName}
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <a 
                href="#"
                onClick={() => { handleClick(plan_carousel1) }}
                className="carousel-link"
              >
                <h5>{plan_carousel1.planName}</h5>
                <p>{plan_carousel1.planDescription}</p>
                <p>Price: ₹{plan_carousel1.planPrice.replace(/[\?]/g, "")}</p>
                <p>Duration: {plan_carousel1.planDuration}</p>
              </a>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      )}
      {plan_carousel2 && (
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <img
              src={plan_image2}
              alt={plan_carousel2.planName}
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <a 
                href="#"
                onClick={() => { handleClick(plan_carousel2) }}
                className="carousel-link"
              >
                <h5>{plan_carousel2.planName}</h5>
                <p>{plan_carousel2.planDescription}</p>
                <p>Price: ₹{plan_carousel2.planPrice.replace(/[\?]/g, "")}</p>
                <p>Duration: {plan_carousel2.planDuration}</p>
              </a>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default CarouselComponent;
