import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./RegisterPage.css";
import telconnectimg1 from "../assets/login-img.png";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = () => {
    // Logic to send OTP
    setOtpSent(true);
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
    <div className="register-container">
      <div className="image-section">
        <img src={telconnectimg1} alt="Animation" />
      </div>
      <div className="register-section">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {step === 1 && (
            <div className="step-box">
              <h3>Step 1 of 2</h3>
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
                <label className="bold-label">Create Password:</label>
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
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
