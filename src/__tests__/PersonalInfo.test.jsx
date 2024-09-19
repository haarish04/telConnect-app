import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PersonalInfo from '../components/PersonalInfo';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// Mocking axios for API requests
jest.mock('axios');

// Mocking useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('PersonalInfo Component', () => {
  // Mock navigate function
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock sessionStorage values
    sessionStorage.setItem('email', 'testuser@test.com');
    sessionStorage.setItem('password', 'testpassword');
    
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should render the form with all inputs and submit button', () => {
    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    // Check for form elements
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address Line 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('should allow form input and call APIs on form submit', async () => {
    // Mock API responses
    axios.post.mockResolvedValueOnce({ data: { customerId: 1 } }); // Mock customer registration response
    axios.get.mockResolvedValueOnce({ data: { customerId: 1 } }); // Mock get customer details
    axios.post.mockResolvedValueOnce({}); // Mock document entry creation
    axios.get.mockResolvedValueOnce({ data: [{ documentId: 123 }] }); // Mock get documentId
    axios.post.mockResolvedValueOnce({}); // Mock verification creation

    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    // Simulate user input for form fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Address Line 1/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for axios calls to be made
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(3); // One for customer registration, one for document, and one for verification
      expect(axios.get).toHaveBeenCalledTimes(2); // One for customer details and one for document details
    });

    // Check that the axios calls are made with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8082/api/customers/register',
      expect.objectContaining({
        customerName: 'John Doe',
        customerPhno: '9876543210',
        customerDOB: '1990-01-01',
      })
    );
  });

  it('should handle API error during registration', async () => {
    // Mock console.error to check for error logging
    console.error = jest.fn();

    // Mock axios post to fail
    axios.post.mockRejectedValueOnce(new Error('Registration failed'));

    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Address Line 1/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the error handling to be triggered
    await waitFor(() => {
      // Check that axios.post was called
      expect(axios.post).toHaveBeenCalledTimes(1); // It should fail after the first API call
      
      // Check that console.error was called with the expected message and error
      expect(console.error).toHaveBeenCalledWith(
        'Error during registration:',
        expect.any(Error)
      );
    });
  });
});
