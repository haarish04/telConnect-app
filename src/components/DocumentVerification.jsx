import React, { useState } from "react";
import "../styles/DocumentVerification.css";

const DocumentVerification = () => {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleUpload = () => {
    if (!documentType || !file) {
      alert("Please select document type and upload a file.");
      return;
    }
    // Simulate file upload process
    setTimeout(() => {
      setSuccessMessage("Document submitted successfully.");
    }, 1000);
  };

  return (
    <div className="box-container">
      <div className="box">
        <h1>Document Verifications</h1>
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
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default DocumentVerification;
