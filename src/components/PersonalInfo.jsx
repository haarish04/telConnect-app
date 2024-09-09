import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/PersonalInfo.css";
import { useNavigate } from "react-router-dom";

function PersonalInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
  });

  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullAddress = [
      formData.address1,
      formData.address2,
      formData.address3,
    ]
      .filter(Boolean)
      .join(", ");

    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    const newcustomerData = {
      customerName: formData.name,
      password: password,
      customerEmail: email,
      customerPhno: formData.phone,
      customerAddress: fullAddress,
      customerDOB: formData.dob,
    };

    console.log(newcustomerData);

    try {
      // Register new customer
      const registerResponse = await axios.post(
        "http://localhost:8082/customer/register",
        newcustomerData
      );

      const customerDetails = await axios.get(
        `http://localhost:8082/customer/getCustomerDetails?customerEmail=${email}`
      );
      console.log("customerId:", customerDetails.data.customerId);

      const blankDocument = await axios.post(
        `http://localhost:8082/document/save?customerId=${customerDetails.data.customerId}&DocumentType=Aadhar`
      );

      const documentDetails = await axios.get(
        `http://localhost:8082/document/get/${customerDetails.data.customerId}`
      );
      console.log("DocumentId:", documentDetails.data[0].documentId);

      const newVerificationRequest = await axios.post(
        `http://localhost:8082/verification/save?documentId=${documentDetails.data[0].documentId}&customerId=${customerDetails.data.customerId}`
      );
      navigate("/login");

      // Create a new record in document_verification
      // const documentVerificationResponse = await axios.post(
      //   "http://localhost:8082/createDocumentVerification",
      //   {
      //     email,
      //     status: "failed",
      //   }
      // );
      // console.log(
      //   "Document verification response:",
      //   documentVerificationResponse.data
      // );

      // Optional: Redirect or show a success message
    } catch (err) {
      console.error("Error during registration:", err);
      // Handle error
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Programmatically open the calendar
    }
  };

  return (
    <div className="page-format">
    <div className="form-container">
      <h1 className="heading">Personal Information</h1>
      <form onSubmit={handleSubmit} className="personal-info-form">
        {/* Form fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              Name: <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">
              Date of Birth: <span className="required-asterisk">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onClick={openDatePicker} // Trigger calendar on click
              ref={dateInputRef} // Reference to the input element
              required
              className="form-input date-input"
              placeholder="dd/mm/yyyy" // Custom placeholder
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address1">Address Line 1:</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Address Line 1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address2">Address Line 2:</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Address Line 2"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address3">Address Line 3:</label>
          <input
            type="text"
            id="address3"
            name="address3"
            value={formData.address3}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Address Line 3"
          />
        </div>
        <div className="form-group phone-group">
          <label htmlFor="phone">Phone Number:</label>
          <div className="phone-container">
            <span className="phone-prefix">+91 </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="\d{10}"
              maxLength="10"
              className="form-input phone-input"
              placeholder="Enter mobile number"
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default PersonalInfo;
