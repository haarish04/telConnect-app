import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Green tick for verified
import ErrorIcon from "@mui/icons-material/Error"; // Red cross or warning for unverified
import "../styles/ProfilePage.css";
import { CustomerContext } from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { isDocumentVerified, handleAuthRedirect } from "../utils/authUtils"; // Import from authUtils
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditProfileModal from './EditProfileModal'; // Import the modal component

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentVerified, setDocumentVerified] = useState(false); // For document verification status
  const { customerData: contextCustomerData, logout } =
    useContext(CustomerContext); // Access customerData and logout from context
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState(contextCustomerData);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/customer/getCustomerDetails",
          {
            params: { customerEmail: contextCustomerData.customerEmail }, // Use email from context
            withCredentials: true,
          }
        );
        setCustomerData(response.data);

        // Check document verification status
        const verified = await isDocumentVerified(response.data.customerId); // Use customerId for verification check
        setDocumentVerified(verified);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (contextCustomerData) {
      fetchCustomerData();
    } else {
      setLoading(false);
    }
  }, [contextCustomerData]);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const redirectToDocumentVerification = () => {
    navigate("/documentVerification", { state: { fromProfile: true } });
  };

  const handleUpdateCustomerData = async (updatedData) => {
    try {
      await axios.put("http://localhost:8082/customer/updateCustomerDetails", updatedData, {
        withCredentials: true,
      });
      setCustomerData(updatedData); // Update state with the new data
    } catch (err) {
      console.error("Error updating customer data:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!customerData) {
    return <div>No customer data found.</div>;
  }

  return (
    <>
      <section className="profile-section vh-100">
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col lg={8}>
              <Card className="profile-card">
                <Card.Header className="profile-card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <AccountCircleIcon
                      style={{ fontSize: "6rem" }}
                      className="profile-icon"
                    />
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0">{customerData.customerName}</h5>
                        <Button
                          variant="link"
                          className="edit-button ms-2"
                          onClick={() => setShowModal(true)} // Show the modal
                        >
                          <EditRoundedIcon />
                        </Button>
                      </div>
                      <p>{customerData.role}</p>
                    </div>
                  </div>
                  <Button className="logout-button" onClick={handleLogout}>
                    <LogoutIcon />
                    Logout
                  </Button>
                </Card.Header>
                <Card.Body className="profile-card-body">
                  <hr />
                  <Row className="pt-1">
                    <Col xs={6} className="mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{customerData.customerEmail}</p>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <h6>Phone</h6>
                      <p className="text-muted">{customerData.customerPhno}</p>
                    </Col>
                  </Row>

                  <h6>Document Verification Status</h6>
                  <hr />
                  <Row className="pt-1">
                    <Col xs={12} className="mb-3">
                      {documentVerified ? (
                        <div className="text-success">
                          <CheckCircleIcon style={{ fontSize: "2rem" }} />
                          Document Verified
                        </div>
                      ) : (
                        <div className="text-danger">
                          <ErrorIcon style={{ fontSize: "2rem" }} />
                          <p>Your documents are not verified.</p>
                          <Button
                            onClick={redirectToDocumentVerification}
                            className="mt-2"
                          >
                            Verify Documents
                          </Button>
                        </div>
                      )}
                    </Col>
                  </Row>

                  <h6>Address</h6>
                  <hr />
                  <Row className="pt-1">
                    <Col xs={12} className="mb-3">
                      <p className="text-muted">{customerData.customerAddress}</p>
                    </Col>
                  </Row>
                  <h6>Date of Birth</h6>
                  <hr />
                  <Row className="pt-1">
                    <Col xs={12} className="mb-3">
                      <p className="text-muted">{customerData.customerDOB}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Include the EditProfileModal component */}
      <EditProfileModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        customerData={customerData}
        updateCustomerData={handleUpdateCustomerData}
      />
    </>
  );
};

export default Profile;
