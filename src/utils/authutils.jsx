import axios from "axios";

// Check if the user is logged in (i.e., customerData is present)
export const isLoggedIn = (customerData) => {
  return customerData !== null;
};

// Get the customerId from customerData
export const getCustomerId = (customerData) => {
  if (customerData) {
    return customerData.customerId; // Ensure this matches your customerData structure
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
    if (response.data.includes("success")) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    } else {
      console.error("Error checking document verification status:", error);
      throw error;
    }
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
  if (!isLoggedIn(customerData)) {
    navigate(loginRedirect); // Redirect to login page
    return;
  }

  const customerId = getCustomerId(customerData);

  if (!customerId) {
    console.error("Customer ID not found");
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
    console.error("Error during document verification process:", error);
  }
};

// Reusable handler for plan clicks
export const onPlanClickHandler = async (navigate, customerData, planId) => {
  console.log("Selected plan: ", planId);
  localStorage.setItem("planId", planId); // Save the selected plan

  await handleAuthRedirect(
    navigate,
    customerData,
    "/login", // Redirect to login if not logged in
    "/documentVerification", // Redirect to document verification if not verified
    {
      pathname: "/planConfirmation", // Redirect to confirmation page with the selected plan
      state: { planId }, // Pass the planId as part of state
    }
  );
};
