import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/DocumentVerification.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";

export default function DocumentVerification() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); // Success or failure message
  const [isLoading, setIsLoading] = useState(false); // To show loading state
  const { customerData } = useContext(CustomerContext); // Access customerData from context
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To get the source of navigation
  const [isFromProfile, setIsFromProfile] = useState(false); // To track if user came from profile

  // Check if the user came from the profile page
  useEffect(() => {
    const state = location.state || {};
    if (state.fromProfile) {
      setIsFromProfile(true);
    }
  }, [location]);

  // Function to handle document type change
  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  // Function to handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      if (selectedFile.size > 500 * 1024) {
        // 500KB
        alert("File size exceeds 500KB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!documentType || !file) {
      alert("Please select a document type and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("file", file);

    try {
      setIsLoading(true); // Set loading to true before the request
      const response = await axios.post(
        "http://localhost:8082/OCR/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // If document verification is successful, attempt to update verification status
        const updateStatus = await updateVerificationStatus(
          customerData.customerId,
          documentType
        );
        if (updateStatus) {
          if (isFromProfile) {
            // If the user came from profile, redirect back to profile
            navigate("/profile");
          } else {
            // If the user is in registration flow, check if the plan is selected
            if (customerData.selectedPlan) {
              // If a plan is selected, redirect to confirmation page
              navigate("/confirmation");
            } else {
              // If no plan is selected, redirect to service plans
              navigate("/servicePlans");
            }
          }
        } else {
          setMessage(
            "Document verified, but status update failed. Please try again."
          );
        }
      } else {
        setMessage("Document could not be verified, please try again.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessage("Document submission failed. Please try again.");
    } finally {
      setIsLoading(false); // Turn off loading
    }
  };

  // Function to update the verification status
  const updateVerificationStatus = async (customerId, documentType) => {
    try {
      const response = await axios.patch(
        `http://localhost:8082/verification/updateStatus/${customerId}/Aadhar/status=success`,
        {}
      );
      console.log(response.data);
      // If the status update is successful, return true
      return response.status === 200;
    } catch (error) {
      console.error("Error updating verification status:", error);
      return false; // Return false if there's an error
    }
  };

  return (
    <div className="box-container">
      <h1>Please upload documents to complete KYC</h1>
      <div className="box">
        <h1>Document Verification</h1>
        <div className="form-group">
          <label className="label-left">
            Document Type:
            <select value={documentType} onChange={handleDocumentTypeChange}>
              <option value="">Select</option>
              <option value="aadhar">Aadhar</option>
              <option value="passport">Passport</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="label-left">
            Upload File:
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </label>
        </div>
        <p className="acceptance-criteria">
          Please upload a file with the following specifications:
          <br />
          <strong>File Type:</strong> PDF
          <br />
          <strong>File Size:</strong> Maximum 500KB
        </p>
        <button
          onClick={handleUpload}
          className="upload-button"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
