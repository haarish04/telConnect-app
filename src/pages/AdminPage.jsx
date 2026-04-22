import React, { useState, useContext } from "react";
import "../styles/AdminPage.css"; // Updated CSS file for styling
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NavBar from "../components/NavBar";
import Overview from "../components/Overview";
import CreateServicePlan from "../components/CreateServicePlan";
import EditServicePlans from "../components/EditServicePlans";
import DocumentVerificationStatusLogs from "../components/DocumentVerificationStatusLogs";
import CustomerAccounts from "../components/CustomerAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "react-bootstrap";
import { CustomerContext } from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";
import ActivateServicePlan from "../components/ActivateServicePlan";
import Incidents from "../components/Incidents"
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { logout } = useContext(CustomerContext);
  const navigate = useNavigate();

  // Function to handle tab change
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "ActivateServicePlan":
        return <ActivateServicePlan />;
      case "CustomerAccounts":
        return <CustomerAccounts />;
      case "CreateServicePlan":
        return <CreateServicePlan />;
      case "EditServicePlans":
        return <EditServicePlans />;
      case "DocumentVerificationStatusLogs":
        return <DocumentVerificationStatusLogs />;
      case "Incidents":
        return <Incidents />;
      default:
        return (
          <div className="admin-tab-content">Select a tab to view content.</div>
        );
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('tokenExpiration');
    navigate("/home");
  };

  return (
    <div className="admin-page-container">

      {/* Header */}
      <div className="admin-header">
        <AdminPanelSettingsIcon
          fontSize="large"
          className="admin-login-icon"
          style={{ color: "#fff" }}
        />
        <div className="admin-header-left">Welcome Admin!</div>
        <Button className="logout-button-admin" onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </Button>
      </div>

      {/* Main container */}
      <div className="admin-main-container">

        {/* Sidebar */}
        <div className="admin-sidebar">

          <div
            className={`admin-tab ${activeTab === "Overview" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("Overview")}
          >
            Overview
          </div>

          <div
            className={`admin-tab ${activeTab === "ActivateServicePlan" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("ActivateServicePlan")}
          >
            Activate Service Plan
          </div>

          <div
            className={`admin-tab ${activeTab === "CustomerAccounts" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("CustomerAccounts")}
          >
            Customer Accounts
          </div>

          <div
            className={`admin-tab ${activeTab === "CreateServicePlan" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("CreateServicePlan")}
          >
            Create Service Plan
          </div>

          <div
            className={`admin-tab ${activeTab === "EditServicePlans" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("EditServicePlans")}
          >
            Edit Service Plans
          </div>

          <div
            className={`admin-tab ${activeTab === "DocumentVerificationStatusLogs" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("DocumentVerificationStatusLogs")}
          >
            Document Verification Status Logs
          </div>

          <div
            className={`admin-tab ${activeTab === "Incidents" ? "admin-active-tab" : ""}`}
            onClick={() => handleTabClick("Incidents")}
          >
            Incidents
          </div>

        </div>

        {/* Content */}
        <div className="admin-content">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
