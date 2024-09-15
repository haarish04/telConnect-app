import React, { useState } from 'react';
import '../styles/AdminPage.css'; // Updated CSS file for styling
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NavBar from '../components/NavBar';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  // Function to handle tab change
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <div className="tab-content">Overview Content</div>;
      case 'ActivateServicePlan':
        return <div className="tab-content">Activate Service Plan Content</div>;
      case 'CustomerAccounts':
        return <div className="tab-content">Customer Accounts Content</div>;
      case 'AddServicePlan':
        return <div className="tab-content">Add Service Plan Content</div>;
      case 'EditServicePlans':
        return <div className="tab-content">Edit Service Plans Content</div>;
      default:
        return <div className="tab-content">Select a tab to view content.</div>;
    }
  };

  return (
    <div className="admin-page">
        {/* <NavBar /> */}
      {/* Horizontal Navbar */}
      <div className="header">
        <AdminPanelSettingsIcon
        fontSize="large"
        className="loginicon"
        style={{ color: "#ffff" }} />
        <div className="header-left">Welcome Admin!</div>
        <div className="header-right">Login/Logout</div>
      </div>

      {/* Main container */}
      <div className="main-container">
        {/* Vertical Sidebar */}
        <div className="sidebar">
          <div
            className={`tab ${activeTab === 'Overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('Overview')}
          >
            Overview
          </div>
          <div
            className={`tab ${activeTab === 'ActivateServicePlan' ? 'active' : ''}`}
            onClick={() => handleTabClick('ActivateServicePlan')}
          >
            Activate Service Plan
          </div>
          <div
            className={`tab ${activeTab === 'CustomerAccounts' ? 'active' : ''}`}
            onClick={() => handleTabClick('CustomerAccounts')}
          >
            Customer Accounts
          </div>
          <div
            className={`tab ${activeTab === 'AddServicePlan' ? 'active' : ''}`}
            onClick={() => handleTabClick('AddServicePlan')}
          >
            Add Service Plan
          </div>
          <div
            className={`tab ${activeTab === 'EditServicePlans' ? 'active' : ''}`}
            onClick={() => handleTabClick('EditServicePlans')}
          >
            Edit Service Plans
          </div>
        </div>

        {/* Content Area */}
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
