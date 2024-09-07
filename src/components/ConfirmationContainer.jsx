import React, { useState, useEffect } from "react";
import "../styles/ConfirmationPage.css";
import axios from "axios";
import ConfirmationPage from "../pages/ConfirmationPage";

export default function ConfirmationContainer() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("hello");

  useEffect(() => {
    const fetchPlan = async () => {
      console.log("Fetching plan details...");
      try {
        const response = await axios.get(
          "http://localhost:8082/plan/getPlan/PREP-TC-0549"
        );

        // Additional logging for debugging

        setPlan(response.data);
        setLoading(false);
      } catch (error) {
        console.error("API Call Failed: ", error);
        setError("Failed to load plan details");
        setLoading(false);
      }
    };

    fetchPlan(); // Call the async function to fetch data
  }, []);

  const handleCancel = () => {
    console.log("Cancellation initiated");
  };

  const handleConfirm = () => {
    console.log("Confirmation initiated");
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message or spinner while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if something goes wrong
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
