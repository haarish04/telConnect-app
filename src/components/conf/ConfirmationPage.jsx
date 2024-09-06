import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ConfirmationPage.css'; // Ensure the path is correct

const ConfigurationPage = ({ 
  planId, 
  planName, 
  planPrice, 
  planDuration, 
  onCancel, 
  onConfirm 
}) => {
  const navigate = useNavigate();

  // Get today's date
  const today = new Date();
  const durationInDays = parseInt(planDuration, 10) || 0;

  const calculateEndDate = (startDate, durationInDays) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationInDays);
    return endDate.toLocaleDateString();
  };

  const endDate = calculateEndDate(today, durationInDays);

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
    return `₹${numericPrice.toFixed(2)}`;
  };

  const formattedPrice = formatPrice(planPrice);

  const handleConfirm = () => {
    // Redirect to ThankYou page
    navigate('/thank-you');
  };

  return (
    <div>
    
      <h1 className="confirmation-heading">
        <p>Please review your selected plan details below:</p>
      </h1>
      <div className="confirmation-content">
        <p><strong>Plan ID:</strong> {planId}</p>
        <p><strong>Plan Name:</strong> {planName}</p>
        <p><strong>Plan Price:</strong> {formattedPrice}</p>
        <p><strong>Plan Duration:</strong> {planDuration} </p>
        <p><strong>Start Date:</strong> {today.toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <div className="button-container">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
