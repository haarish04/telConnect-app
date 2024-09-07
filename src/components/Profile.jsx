import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout'; // Import LogoutIcon
import '../styles/ProfilePage.css'; // Link to CSS file
import { CustomerContext } from '../context/CustomerContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Profile = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(CustomerContext); // Access the logout function from context
  const navigate = useNavigate(); // Initialize navigate function from React Router

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/customer/getCustomerDetails', {
          params: { customerEmail: 'suk@gmail.com' },
          withCredentials: true
        });
        setCustomerData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/home'); // Redirect to the home page
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
    <section className="profile-section vh-100">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={8}>
            <Card className="profile-card">
              <Card.Header className="profile-card-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <AccountCircleIcon style={{ fontSize: '6rem' }} className="profile-icon" />
                  <div className="profile-header-text">
                    <h5>{customerData.customerName}</h5>
                    <p>{customerData.role}</p>
                  </div>
                </div>
                {/* Logout Button */}
                <Button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  Logout
                </Button>
              </Card.Header>
              <Card.Body className="profile-card-body">
                <h6>Information</h6>
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
  );
};

export default Profile;
