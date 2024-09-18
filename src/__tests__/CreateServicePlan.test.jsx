import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateServicePlan from '../components/CreateServicePlan'; // Adjust the path if needed
import axios from 'axios';

// Mocking axios for API requests
jest.mock('axios');

describe('CreateServicePlan Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should render the form with all inputs and buttons', () => {
    render(<CreateServicePlan />);

    // Check for form elements
    expect(screen.getByLabelText(/Plan type :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan ID :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan name :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan price :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan duration :/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan description :/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
  });

  it('should handle form input and call API on Add button click', async () => {
    // Define the formData object with the same structure as in CreateServicePlan
    const formData = {
      planType: 'Prepaid',
      planId: 'PREP-TC-1234',
      planName: 'Basic Plan',
      planPrice: '100',
      planDescription: 'A basic plan for everyone.',
      planDuration: '30 days'
    };

    // Mock API response
    axios.post.mockResolvedValueOnce({ data: formData });

    render(<CreateServicePlan />);

    // Simulate user input for form fields
    fireEvent.change(screen.getByLabelText(/Plan type :/i), { target: { value: formData.planType } });
    fireEvent.change(screen.getAllByLabelText(/Plan ID :/i)[0], { target: { value: formData.planId } });
    fireEvent.change(screen.getAllByLabelText(/Plan name :/i)[0], { target: { value: formData.planName } });
    fireEvent.change(screen.getAllByLabelText(/Plan price :/i)[0], { target: { value: formData.planPrice } });
    fireEvent.change(screen.getAllByLabelText(/Plan duration :/i)[0], { target: { value: formData.planDuration } });
    fireEvent.change(screen.getAllByLabelText(/Plan description :/i)[0], { target: { value: formData.planDescription } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Add/i));

    // Wait for axios calls to be made
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8082/api/plans?adminId=1',
        expect.objectContaining(formData)
      );
    });

    // Check that submittedData is displayed
    expect(screen.getByText(/Submitted Information:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Plan ID :/i)[0]).toBeInTheDocument();
    expect(screen.getByText(formData.planId)).toBeInTheDocument();
  });

  it('should handle form cancellation and reset form data', () => {
    render(<CreateServicePlan />);

    // Simulate user input for form fields
    fireEvent.change(screen.getByLabelText(/Plan type :/i), { target: { value: 'Postpaid' } });
    fireEvent.change(screen.getByLabelText(/Plan ID :/i), { target: { value: 'POST-TC-5678' } });
    fireEvent.change(screen.getByLabelText(/Plan name :/i), { target: { value: 'Premium Plan' } });
    fireEvent.change(screen.getByLabelText(/Plan price :/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/Plan duration :/i), { target: { value: '60 days' } });
    fireEvent.change(screen.getByLabelText(/Plan description :/i), { target: { value: 'A premium plan with extra benefits.' } });

    // Simulate form cancellation
    fireEvent.click(screen.getByText(/Cancel/i));

    // Check that form fields are reset
    expect(screen.getByLabelText(/Plan type :/i).value).toBe('');
    expect(screen.getByLabelText(/Plan ID :/i).value).toBe('');
    expect(screen.getByLabelText(/Plan name :/i).value).toBe('');
    expect(screen.getByLabelText(/Plan price :/i).value).toBe('');
    expect(screen.getByLabelText(/Plan duration :/i).value).toBe('');
    expect(screen.getByLabelText(/Plan description :/i).value).toBe('');
  });

  it('should handle API error and display error message', async () => {
    // Mock console.error to check for error logging
    console.error = jest.fn();

    // Mock axios post to fail
    axios.post.mockRejectedValueOnce(new Error('Error submitting form data.'));

    render(<CreateServicePlan />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Plan type :/i), { target: { value: 'Prepaid' } });
    fireEvent.change(screen.getByLabelText(/Plan ID :/i), { target: { value: 'PREP-TC-1234' } });
    fireEvent.change(screen.getByLabelText(/Plan name :/i), { target: { value: 'Basic Plan' } });
    fireEvent.change(screen.getByLabelText(/Plan price :/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Plan duration :/i), { target: { value: '30 days' } });
    fireEvent.change(screen.getByLabelText(/Plan description :/i), { target: { value: 'A basic plan for everyone.' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Add/i));

    // Wait for the error handling to be triggered
    await waitFor(() => {
      // Check that axios.post was called
      expect(axios.post).toHaveBeenCalledTimes(1);
      
      // Check that the error message is displayed
      expect(screen.getByText(/Error submitting form data./i)).toBeInTheDocument();

      // Check that console.error was called with the expected message
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
