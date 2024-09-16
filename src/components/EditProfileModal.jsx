import React, { useState, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { CustomerContext } from "../context/CustomerContext"; // Import the context
import "../styles/EditProfileModal.css"; // Make sure to import the CSS file

const EditProfileModal = ({ show, handleClose, updateCustomerData }) => {
  // Access customerData and logout from CustomerContext
  const { customerData } = useContext(CustomerContext);

  // Alert state variables
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'danger'

  const [showPasswordModal, setShowPasswordModal] = useState(false); // Toggle between modals
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    customerName: customerData.customerName,
    customerEmail: customerData.customerEmail,
    customerDOB: customerData.customerDOB,
    customerAddress: customerData.customerAddress,
    password: "", // Start with an empty password
  });

  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle between modals
  const handlePasswordModalOpen = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    if (formData.password) {
      // Validate and handle password
      if (formData.password !== passwordData.newPassword) {
        setAlertVisible(true);
        setAlertMessage("Passwords do not match!");
        setAlertType("danger");
        return;
      }
    }

    // Update customer data successfully
    updateCustomerData(formData); // Assuming this handles password update too
    setAlertVisible(true);
    setAlertMessage("Profile updated successfully!");
    setAlertType("success");
    handleClose();
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSave = () => {
    // Check if current password matches the stored password
    if (passwordData.currentPassword !== customerData.password) {
      setAlertVisible(true);
      setAlertMessage("Current password is incorrect!");
      setAlertType("danger");
      return;
    }

    // Check if new password and confirm password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertVisible(true);
      setAlertMessage("Passwords do not match!");
      setAlertType("danger");
      return;
    }

    // Handle password change logic here (e.g., API call to update password)
    console.log("Password changed successfully", passwordData);

    // Optionally, update formData with the new password
    setFormData({
      ...formData,
      password: passwordData.newPassword,
    });

    handlePasswordModalClose();

    // Show success alert
    setAlertVisible(true);
    setAlertMessage("Password changed successfully!");
    setAlertType("success");
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setPasswordVisible({
      ...passwordVisible,
      [field]: !passwordVisible[field],
    });
  };

  return (
    <>
      {/* Main Edit Profile Modal */}
      <Modal show={show && !showPasswordModal} onHide={handleClose} className="edit-profile-modal">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-white">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Alert Section */}
          {alertVisible && (
            <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
              {alertMessage}
            </Alert>
          )}

          <Form className="form">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="form-control-disabled"
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className="form-control-disabled"
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="customerDOB"
                value={formData.customerDOB}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="change-password-section">
              <Button variant="link" className="btn-link" onClick={handlePasswordModalOpen}>
                Change Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="custom-cancel-button" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" className="custom-save-button" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Change Modal */}
      <Modal show={showPasswordModal} onHide={handlePasswordModalClose} className="password-modal">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-white">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Alert Section */}
          {alertVisible && (
            <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
              {alertMessage}
            </Alert>
          )}

          <Form className="form">
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <div className="password-input-group">
                <Form.Control
                  type={passwordVisible.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => togglePasswordVisibility('currentPassword')}
                >
                  {passwordVisible.currentPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <div className="password-input-group">
                <Form.Control
                  type={passwordVisible.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {passwordVisible.newPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <div className="password-input-group">
                <Form.Control
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {passwordVisible.confirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="custom-cancel-button" onClick={handlePasswordModalClose}>
            Cancel
          </Button>
          <Button variant="primary" className="custom-save-button" onClick={handlePasswordSave}>
            Save Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfileModal;
