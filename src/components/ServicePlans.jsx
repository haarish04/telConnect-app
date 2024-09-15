import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/ServicePlans.css";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import { onPlanClickHandler } from "../utils/authUtils";
import Alert from "@mui/material/Alert"; // Import Alert component from Material-UI

const ServicePlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [serviceType, setServiceType] = useState("prepaid");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const { customerData } = useContext(CustomerContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setAlertMessage("Failed to load plans. Please try again later.");
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const filtered = plans.filter((plan) =>
      serviceType === "prepaid"
        ? plan.planId.startsWith("PREP")
        : plan.planId.startsWith("POST")
    );
    setFilteredPlans(filtered);
  }, [serviceType, plans]);

  const handleServiceChange = (type) => {
    setServiceType(type);
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setAlertMessage(""); // Clear previous alert message
  };

  const handleClick = async () => {
    if (selectedPlan) {
      try {
        await onPlanClickHandler(
          navigate,
          customerData,
          selectedPlan,
          setAlertMessage
        );
      } catch (error) {
        setAlertMessage("Error activating plan. Please try again.");
      }
    } else {
      setAlertMessage("Please select a plan.");
    }
  };

  return (
    <div className="service-plans-container">
      {alertMessage && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "80%",
            maxWidth: "500px",
            zIndex: 9999,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Optional: Keep boxShadow for subtle elevation
            textAlign: "center",
            boxSizing: "border-box", // Ensure padding is included in the width calculation
          }}
        >
          <Alert
            severity="info"
            style={{
              fontSize: "1rem",
              margin: 0, // Remove default margin
              boxShadow: "none", // Remove internal shadow
            }}
          >
            {alertMessage}
          </Alert>
        </div>
      )}

      <h2 className="headline">
        Experience the Power of Unlimited Connections with Our Services!
      </h2>

      <div className="service-select">
        <button
          className={`service-button ${
            serviceType === "prepaid" ? "active" : ""
          }`}
          onClick={() => handleServiceChange("prepaid")}
        >
          Prepaid
        </button>
        <button
          className={`service-button ${
            serviceType === "postpaid" ? "active" : ""
          }`}
          onClick={() => handleServiceChange("postpaid")}
        >
          Postpaid
        </button>
      </div>

      <div className="plans-box">
        <div className="plans-grid">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div
                key={plan.planId}
                className={`plan-box ${
                  selectedPlan === plan.planId ? "selected" : ""
                }`}
                onClick={() => handlePlanSelect(plan.planId)}
              >
                <h3>{plan.planName.replace("?", "")}</h3>
                <p>{plan.planDescription}</p>
                <p>
                  <strong>Price:</strong> ₹{plan.planPrice.replace("?", "")}
                </p>
                <p>
                  <strong>Duration:</strong> {plan.planDuration}
                </p>
              </div>
            ))
          ) : (
            <p>No plans available</p>
          )}
        </div>
      </div>

      <button className="activate-button" onClick={handleClick}>
        Activate
      </button>
    </div>
  );
};

export default ServicePlans;
