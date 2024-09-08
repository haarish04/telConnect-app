import { useNavigate, Link } from "react-router-dom";
import "../styles/ConfirmationPage.css";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

export default function ConfirmationPage({
  planId,
  planName,
  planPrice,
  planDuration,
  onCancel,
  onConfirm,
}) {
  const navigate = useNavigate();
  const { customerData } = useContext(CustomerContext);

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
    if (typeof price !== "string") {
      return "Price not available"; // Handle undefined/null price
    }
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, "")) || 0;
    return `₹${numericPrice.toFixed(2)}`;
  };

  const formattedPrice = formatPrice(planPrice);

  const handleConfirm = async () => {
    // Access customerData from context
    const email = customerData.customerEmail;
    console.log(email);
    const name = " ";

    try {
      const response = await axios.post(
        `http://localhost:8082/sendMail/thankYou?recipient=${email}&name=${name}`
      );
      console.log(response);

      // Second axios put request to another email endpoint
      await axios.post(
        `http://localhost:8082/sendMail/serviceActivation?recipient=${email}&name=${name}`
      );

      // After successful requests, navigate to the thank-you page
      navigate("/thank-you");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <h1 className="confirmation-heading">
        <p>Please review your selected plan details below:</p>
      </h1>
      <div className="confirmation-content">
        <p>
          <strong>Plan ID:</strong> {planId}
        </p>
        <p>
          <strong>Plan Name:</strong> {planName}
        </p>
        <p>
          <strong>Plan Price:</strong> {formattedPrice}
        </p>
        <p>
          <strong>Plan Duration:</strong> {planDuration}{" "}
        </p>
        <p>
          <strong>Start Date:</strong> {today.toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {endDate}
        </p>
        <div className="button-container">
          <Link to="/servicePlans">
            <button className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          </Link>
          <Link to="/thank-you">
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
