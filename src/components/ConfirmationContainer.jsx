import { useState, useEffect } from "react";
import "../styles/ConfirmationPage.css";
import axios from "axios";
import ConfirmationPage from "../pages/ConfirmationPage";
import { useLocation, Link } from "react-router-dom";

export default function ConfirmationContainer() {
  const location = useLocation();
  console.log("Location object:", location);
  const planId = location.state?.planId || localStorage.getItem("planId");

  console.log("Plan ID (ConfirmationContainer):", planId); // Log planId here

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(planId);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        // Use the dynamic planId in the API call
        const response = await axios.get(
          `http://localhost:8082/plan/getPlan/${planId}`
        );
        console.log(response.data);
        setPlan(response.data);
        setLoading(false);
      } catch (error) {
        console.error("API Call Failed: ", error);
        setError("Failed to load plan details");
        setLoading(false);
      }
    };

    if (planId) {
      fetchPlan(); // Only call the API if planId is available
    } else {
      setError("Plan ID not found");
      setLoading(false);
    }
  }, [planId]);

  const handleCancel = () => {
    console.log("Cancellation initiated");
  };

  const handleConfirm = () => {
    console.log("Confirmation initiated");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return plan ? (
    <ConfirmationPage
      planId={plan.planId}
      planName={plan.planName}
      planPrice={plan.planPrice}
      planDescription={plan.planDescription}
      planDuration={plan.planDuration}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  ) : (
    <p>No plan data available</p>
  );
}
