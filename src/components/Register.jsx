import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls
import "../styles/RegisterPage.css";
import telconnectimg1 from "../assets/login-img.png";

export default function Register() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState(null); // Add error state

  // Function to send OTP
  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8082/send-otp", {
        email, // Send email in the request body
      });
      console.log(response.data); // Handle the response if needed
      setOtpSent(true); // Update the state to show OTP sent message
      setError(null); // Clear error if OTP is sent successfully
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again."); // Show error message
    }
  };

  const handleVerifyOtp = () => {
    // Logic to verify OTP
    setOtpVerified(false);
    setStep(2);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Logic to register the user
  };

  return (
    <div>
      <div className="register-container">
        <div className="image-section">
          <img src={telconnectimg1} alt="Animation" />
        </div>
        <div className="register-section">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            {step === 1 && (
              <div className="step-box">
                <h4>Step 1 of 2</h4>
                <div>
                  <label className="bold-label">Enter Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="button"
                  className="send-otp-button"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
                {otpSent && (
                  <p className="success-msg">OTP has been sent successfully!</p>
                )}
                {error && <p className="error-msg">{error}</p>}
                <div>
                  <label className="bold-label">Enter OTP:</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <button
                  type="button"
                  className="verify-button"
                  onClick={handleVerifyOtp}
                >
                  Verify
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="step-box">
                <h3>Step 2 of 2</h3>
                <div>
                  <label className="bold-label">Create Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div>
                  <label className="bold-label">Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <button type="submit">Register</button>
              </div>
            )}
          </form>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
