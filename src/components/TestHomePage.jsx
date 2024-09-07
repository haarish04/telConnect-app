import React, { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

const TestHomePage = () => {
  const { customerData } = useContext(CustomerContext);

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <p>Customer details: {customerData.customerEmail}</p>
    </div>
  );
};

export default TestHomePage;
