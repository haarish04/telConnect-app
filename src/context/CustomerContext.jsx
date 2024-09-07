// CustomerContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customerData, setCustomerData] = useState(null);

  // Load customer data from localStorage on mount
  useEffect(() => {
    const storedCustomerData = localStorage.getItem("customerData");
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData));
    }
  }, []);

  // Store customer data in localStorage whenever it changes
  useEffect(() => {
    if (customerData) {
      localStorage.setItem("customerData", JSON.stringify(customerData));
    }
  }, [customerData]);

  return (
    <CustomerContext.Provider value={{ customerData, setCustomerData }}>
      {children}
    </CustomerContext.Provider>
  );
};
