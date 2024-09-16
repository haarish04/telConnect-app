import React, { useState } from 'react';
import '../styles/AdminPage.css'; // Updated CSS file for styling
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NavBar from '../components/NavBar';
import Overview from '../components/Overview';
import CreateServicePlan from '../components/CreateServicePlan';

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
        return <Overview />
      case 'ActivateServicePlan':
        return <div className="admin-tab-content">Activate Service Plan Content</div>;
      case 'CustomerAccounts':
        return <div className="admin-tab-content">Customer Accounts Content</div>;
      case 'CreateServicePlan':
        return <CreateServicePlan />
      case 'EditServicePlans':
        return <div className="admin-tab-content">Edit Service Plans Content</div>;
      default:
        return <div className="admin-tab-content">Select a tab to view content.</div>;
    }
  };

  return (
    <div className="admin-page-container">
      {/* <NavBar /> */}
      {/* Horizontal Navbar */}
      <div className="admin-header">
        <AdminPanelSettingsIcon
          fontSize="large"
          className="admin-login-icon"
          style={{ color: "#fff" }}
        />
        <div className="admin-header-left">Welcome Admin!</div>
        <div className="admin-header-right">Login/Logout</div>
      </div>

      {/* Main container */}
      <div className="admin-main-container">
        {/* Vertical Sidebar */}
        <div className="admin-sidebar">
          <div
            className={`admin-tab ${activeTab === 'Overview' ? 'admin-active-tab' : ''}`}
            onClick={() => handleTabClick('Overview')}
          >
            Overview
          </div>
          <div
            className={`admin-tab ${activeTab === 'ActivateServicePlan' ? 'admin-active-tab' : ''}`}
            onClick={() => handleTabClick('ActivateServicePlan')}
          >
            Activate Service Plan
          </div>
          <div
            className={`admin-tab ${activeTab === 'CustomerAccounts' ? 'admin-active-tab' : ''}`}
            onClick={() => handleTabClick('CustomerAccounts')}
          >
            Customer Accounts
          </div>
          <div
            className={`admin-tab ${activeTab === 'CreateServicePlan' ? 'admin-active-tab' : ''}`}
            onClick={() => handleTabClick('CreateServicePlan')}
          >
            Create Service Plan
          </div>
          <div
            className={`admin-tab ${activeTab === 'EditServicePlans' ? 'admin-active-tab' : ''}`}
            onClick={() => handleTabClick('EditServicePlans')}
          >
            Edit Service Plans
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
