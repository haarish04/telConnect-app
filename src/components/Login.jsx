/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import loginImg from "../assets/login-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Login attempt
      const loginResponse = await axios.post(
        "http://localhost:8082/customer/login",
        {
          customerEmail: email,
          password: password,
        }
      );

      console.log("Login successful:", loginResponse.data);

      // Fetch customer details
      const customerDetailsResponse = await axios.get(
        "http://localhost:8082/customer/getCustomerDetails",
        {
          params: {
            customerEmail: email,
          },
        }
      );
      console.log("Customer Details Response:", customerDetailsResponse.data);

      setCustomerData(customerDetailsResponse.data); // Asynchronous
    } catch (err) {
      console.error("Error occurred:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerData) {
      // Pass customerData via navigate's state
      navigate("/TestHomePage", { state: { customerData } });
    }
  }, [customerData, navigate]);

  return (
    <div>
      <NavBar />
      <div className="background">
        <div className="image-section">
          <img src={loginImg} alt="Login Visual" />
        </div>
        <div className="login-section">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label className="bold-label">Enter Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="bold-label">Enter Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Please wait...." : "Login"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
