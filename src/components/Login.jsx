import React, { useState, useContext, useEffect } from "react";
import "../styles/LoginPage.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";

const Login = () => {
  const { setCustomerData } = useContext(CustomerContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromRegistration) {
      setSuccessMessage("Login with your new credentials!");
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const loginCredentials = {
      customerEmail: email,
      password: password,
    };

    try {
      await axios.post(
        "http://localhost:8082/api/customers/login",
        loginCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const customerDetailsResponse = await axios.get(
        `http://localhost:8082/api/customers/${email}`
      );

      const customerData = customerDetailsResponse.data;

      setCustomerData(customerData);

      if (customerData.customerId === 1) {
        navigate("/adminPage");
      } else {
        navigate("/home");
      }
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
      <div className="background">
        <div className="image-section">
          <img src="src/assets/login-img.png" alt="Login Visual" />
        </div>
        <div className="login-section">
          <h2>Login</h2>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

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
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
