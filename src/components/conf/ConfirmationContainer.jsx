import React, { useState, useEffect } from 'react';
import './ConfirmationPage.css';
import axios from 'axios';
import ConfirmationPage from './ConfirmationPage'; // Import the ConfirmationPage component

const ConfirmationContainer = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:8082/plan/getPlan/PREP-TC-0549')
      .then(response => {
        setPlan(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plan details:', error);
        setError('Failed to load plan details');
        setLoading(false);
      });
  }, []);

  const handleCancel = () => {
    console.log('Cancellation initiated');
    // Implement the logic for cancellation here
  };

  const handleBack = () => {
    console.log('Back navigation initiated');
    // Implement the logic to go back here
  };

  const handleConfirm = () => {
    console.log('Confirmation initiated');
    // Implement the logic for confirmation here
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message or spinner while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if something goes wrong
  }

  return (
    plan ? (
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
    )
  );
};

export default ConfirmationContainer;
