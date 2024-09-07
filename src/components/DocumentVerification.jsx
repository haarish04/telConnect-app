import React, { useState } from "react";
import axios from "axios";
import "../styles/DocumentVerification.css";

export default function DocumentVerification() {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); // Success or failure message
  const [isLoading, setIsLoading] = useState(false); // To show loading state

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

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
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );

      if (response.status === 200) {
        setMessage("Document submitted successfully.");
      } else {
        setMessage("Document could not be verified, please try again ");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessage("Document submission failed. Please try again.");
    } finally {
      setIsLoading(false); // Turn off loading
    }
  };

  return (
    <div className="box-container">
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
