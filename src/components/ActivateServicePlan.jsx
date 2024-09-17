import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ActivateServicePlan.css'; // Import the CSS file for styling
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';

const ActivateServicePlan = () => {
  const [plans, setPlans] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [selectedPlanId, setSelectedPlanId] = useState(null); // State for selected plan ID
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  // Fetch plans from API when the component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/customers/plans?adminId=1');
        setPlans(response.data); // Set plans to the API response
        console.log(response.data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching plans:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchPlans();
  }, []); // Empty dependency array means this runs only once on mount

  // Function to handle opening the dialog
  const handleOpenDialog = (customerPlanId) => {
    setSelectedPlanId(customerPlanId);
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlanId(null);
  };

  // Function to handle confirming the activation
  const handleConfirmActivate = () => {
    const updatedPlans = plans.map(plan =>
      plan.customerPlanId === selectedPlanId ? { ...plan, status: 'Active' } : plan
    );
    setPlans(updatedPlans);
    setSnackbarMessage('Plan activated successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  // Filter plans where status is 'Pending'
  const pendingPlans = plans.filter(plan => plan.status === 'Pending');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Activate Service Plans</h1>

      {/* Show loading message while fetching data */}
      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <table className="plans-table">
          <thead>
            <tr>
              <th>Customer Plan ID</th>
              <th>Customer ID</th>
              <th>Plan ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th> {/* New column for action */}
            </tr>
          </thead>
          <tbody>
            {pendingPlans.length > 0 ? (
              pendingPlans.map((item) => (
                <tr key={item.customerPlanId}>
                  <td>{item.customerPlanId}</td>
                  <td>{item.customerId}</td>
                  <td>{item.planId}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className='activate-button'
                      onClick={() => handleOpenDialog(item.customerPlanId)}
                    >
                      Activate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No pending plans available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Activation</DialogTitle>
        <DialogContent>
          Are you sure you want to activate this service plan?
        </DialogContent>
        <DialogActions>
        <button onClick={handleCloseDialog} className='activate-button'>
            Cancel
          </button>
          <button
            onClick={handleConfirmActivate}
            className='activate-button'
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ActivateServicePlan;
