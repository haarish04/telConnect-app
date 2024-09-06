import React, { useState, useRef } from "react";
import "../styles/PersonalInfo.css";

function PersonalInfo() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = [
      formData.address1,
      formData.address2,
      formData.address3,
    ]
      .filter(Boolean)
      .join(", ");
    alert(
      `Submitted! Name: ${formData.name}, DOB: ${formData.dob}, Address: ${fullAddress}, Phone: ${formData.phone}`
    );
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Programmatically open the calendar
    }
  };

  return (
    <div className="form-container">
      <h1 className="heading">Personal Information</h1>
      <form onSubmit={handleSubmit} className="personal-info-form">
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
          <label htmlFor="phone">
            Phone Number: <span className="required-asterisk">*</span>
          </label>
          <div className="phone-container">
            <span className="phone-prefix">+91 </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
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
  );
}

export default PersonalInfo;
