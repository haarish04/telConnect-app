import React, { useState, useContext } from "react";
import "../styles/LoginPage.css";
import loginImg from "../assets/login-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import NavBar from "./NavBar";

const Login = () => {
  const { setCustomerData } = useContext(CustomerContext); // Use context to set customer data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

      console.log(loginResponse);

      // Fetch customer details
      const customerDetailsResponse = await axios.get(
        "http://localhost:8082/customer/getCustomerDetails",
        { params: { customerEmail: email } }
      );

      setCustomerData(customerDetailsResponse.data); // Update customer data in context
      navigate("/TestHomePage");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
