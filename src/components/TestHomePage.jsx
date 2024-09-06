import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
export const TestHomePage = () => {
  const location = useLocation();
  const { customerData } = location.state || {}; // Get customerData from the state

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <p>Email: {customerData.customerEmail}</p>
      <p>Address: {customerData.customerAddress}</p>
      <p>ID: {customerData.customerId}</p>
      <p>Name: {customerData.customerName}</p>
    </div>
  );
};

// Define the prop types
TestHomePage.propTypes = {
  customerData: PropTypes.object,
};
