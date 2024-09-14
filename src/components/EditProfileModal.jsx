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

  return (
    <Modal show={show} onHide={handleClose} className="edit-profile-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title-white">Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
            <Button variant="link" className="btn-link">
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
  );
};

export default EditProfileModal;
