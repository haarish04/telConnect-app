import axios from 'axios';

// Check if the user is logged in (i.e., customerData is present)
export const isLoggedIn = (customerData) => {
  return customerData !== null;
};

// Get the customerId from customerData
export const getCustomerId = (customerData) => {
  if (customerData) {
    return customerData.customerId; // Make sure this is the correct key for customerId
  }
  return null;
};

// API call to check if the document is verified
export const isDocumentVerified = async (customerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/verification/getStatus/${customerId}`,
        { withCredentials: true }
      );
      
      // Check if the status is 'success'
      if (response.data.status === 'success') {
        return true; // Return true if the status is 'success'
      } else {
        return false; // Return false otherwise
      }
    } catch (error) {
      console.error('Error checking document verification status:', error);
      throw error; // Optionally handle the error, e.g., redirect to an error page
    }
  };
  

// Handle authentication and redirection
export const handleAuthRedirect = async (
  navigate,
  customerData,
  loginRedirect,
  verificationRedirect,
  planConfirmationRedirect
) => {
  // Check if the user is logged in
  if (!isLoggedIn(customerData)) {
    // If not logged in, redirect to the login page
    navigate(loginRedirect);
    return;
  }

  // Get customerId from customerData
  const customerId = getCustomerId(customerData);
  if (!customerId) {
    console.error('Customer ID not found');
    return;
  }

  // Check if the customer's documents are verified
  try {
    const verified = await isDocumentVerified(customerId);
    if (verified) {
      // If verified, redirect to plan confirmation page
      navigate(planConfirmationRedirect);
    } else {
      // If not verified, redirect to document verification page
      navigate(verificationRedirect);
    }
  } catch (error) {
    console.error('Error during document verification process:', error);
    // Optionally handle error (e.g., redirect to error page or show error message)
  }
};

// Reusable handler for plan clicks that can be called in any component
export const onPlanClickHandler = async (navigate, customerData) => {
  await handleAuthRedirect(
    navigate,
    customerData,
    '/login', // Redirect to login if not logged in
    '/documentVerification', // Redirect to document verification if not verified
    '/plan-confirmation' // Redirect to plan confirmation if verified
  );
};
