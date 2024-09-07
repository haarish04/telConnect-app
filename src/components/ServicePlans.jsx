import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/ServicePlans.css";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import { onPlanClickHandler } from "../utils/authUtils";

const ServicePlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [serviceType, setServiceType] = useState("prepaid");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { customerData } = useContext(CustomerContext);
  const navigate = useNavigate();

  // Call the plan click handler on button click
  const handleClick = () => {
    if (selectedPlan) onPlanClickHandler(navigate, customerData, selectedPlan);
    else console.log("No plan selected");
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Fetch all plans from the backend
        const response = await axios.get(
          "http://localhost:8082/plan/getAllPlans"
        );
        setPlans(response.data); // Set all plans fetched from the backend
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    // Filter plans based on the selected service type (prepaid or postpaid)
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
  };

  return (
    <div className="service-plans-container">
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
                <h3>{plan.planName}</h3>
                <p>{plan.planDescription}</p>
                <p>
                  <strong>Price:</strong> ₹{plan.planPrice.replace("?", "")}
                </p>{" "}
                {/* Display price with Indian Rupee symbol */}
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
