import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/EditProfileModal.css"; // Make sure to import the CSS file

const EditProfileModal = ({ show, handleClose, customerData, updateCustomerData }) => {
  const [formData, setFormData] = useState({
    customerName: customerData.customerName,
    customerEmail: customerData.customerEmail,
    customerDOB: customerData.customerDOB,
    customerAddress: customerData.customerAddress,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false); // Toggle between modals
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    updateCustomerData(formData);
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
    // Add validation logic here for password change
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle password change logic here (e.g., API call)
    console.log("Password changed successfully", passwordData);

    handlePasswordModalClose();
  };

  return (
    <>
      {/* Main Edit Profile Modal */}
      <Modal show={show && !showPasswordModal} onHide={handleClose} className="edit-profile-modal">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-white">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form">
            <Form.Group >
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
          <Form className="form">
            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
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
