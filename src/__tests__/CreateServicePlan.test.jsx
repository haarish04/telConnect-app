// src/__tests__/CreateServicePlan.test.jsx
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateServicePlan from '../components/CreateServicePlan';

jest.mock('axios');

describe('CreateServicePlan Component', () => {
  const setup = () => {
    const utils = render(<CreateServicePlan />);
    const planType = utils.getByRole('combobox', { name: /plan type/i }); // Select element
    const planId = utils.getByPlaceholderText(/Plan ID/i); // Using placeholder for inputs
    const planName = utils.getByPlaceholderText(/Plan name/i);
    const planPrice = utils.getByPlaceholderText(/Plan price/i);
    const planDuration = utils.getByPlaceholderText(/Plan duration/i);
    const planDescription = utils.getByPlaceholderText(/Plan description/i);
    const addButton = utils.getByRole('button', { name: /add/i });
    const cancelButton = utils.getByRole('button', { name: /cancel/i });
    return {
      ...utils,
      planType,
      planId,
      planName,
      planPrice,
      planDuration,
      planDescription,
      addButton,
      cancelButton,
    };
  };

  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders form elements correctly', () => {
    const { planType, planId, planName, planPrice, planDuration, planDescription } = setup();

    expect(planType).toBeInTheDocument();
    expect(planId).toBeInTheDocument();
    expect(planName).toBeInTheDocument();
    expect(planPrice).toBeInTheDocument();
    expect(planDuration).toBeInTheDocument();
    expect(planDescription).toBeInTheDocument();
  });

  test('updates form fields on user input', () => {
    const { planId, planName, planPrice, planDuration, planDescription } = setup();

    fireEvent.change(planId, { target: { value: 'PREP-TC-0001' } });
    fireEvent.change(planName, { target: { value: 'Basic Plan' } });
    fireEvent.change(planPrice, { target: { value: '10' } });
    fireEvent.change(planDuration, { target: { value: '30 days' } });
    fireEvent.change(planDescription, { target: { value: 'A basic prepaid plan' } });

    expect(planId.value).toBe('PREP-TC-0001');
    expect(planName.value).toBe('Basic Plan');
    expect(planPrice.value).toBe('10');
    expect(planDuration.value).toBe('30 days');
    expect(planDescription.value).toBe('A basic prepaid plan');
  });

  test('submits the form and makes API requests successfully', async () => {
    const { planId, planName, planPrice, planDuration, planDescription, addButton } = setup();

    fireEvent.change(planId, { target: { value: 'PREP-TC-0001' } });
    fireEvent.change(planName, { target: { value: 'Basic Plan' } });
    fireEvent.change(planPrice, { target: { value: '10' } });
    fireEvent.change(planDuration, { target: { value: '30 days' } });
    fireEvent.change(planDescription, { target: { value: 'A basic prepaid plan' } });

    axios.post.mockResolvedValueOnce({ data: {} });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8082/api/admin/newPlan',
        {
          planType: '',  // If you're passing planType, you'll need to change this in the test.
          planId: 'PREP-TC-0001',
          planName: 'Basic Plan',
          planPrice: '10',
          planDescription: 'A basic prepaid plan',
          planDuration: '30 days',
        },
        { headers: { Authorization: `Bearer null` } }
      );
    });
  });

  test('handles form submission errors', async () => {
    const { planId, planName, planPrice, planDuration, planDescription, addButton } = setup();

    fireEvent.change(planId, { target: { value: 'PREP-TC-0001' } });
    fireEvent.change(planName, { target: { value: 'Basic Plan' } });
    fireEvent.change(planPrice, { target: { value: '10' } });
    fireEvent.change(planDuration, { target: { value: '30 days' } });
    fireEvent.change(planDescription, { target: { value: 'A basic prepaid plan' } });

    axios.post.mockRejectedValueOnce(new Error('Error submitting form data'));

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Error submitting form data/i)).toBeInTheDocument();
    });
  });

  test('clears the form on cancel', () => {
    const { planId, planName, planPrice, planDuration, planDescription, cancelButton } = setup();

    fireEvent.change(planId, { target: { value: 'PREP-TC-0001' } });
    fireEvent.change(planName, { target: { value: 'Basic Plan' } });
    fireEvent.change(planPrice, { target: { value: '10' } });
    fireEvent.change(planDuration, { target: { value: '30 days' } });
    fireEvent.change(planDescription, { target: { value: 'A basic prepaid plan' } });

    fireEvent.click(cancelButton);

    expect(planId.value).toBe('');
    expect(planName.value).toBe('');
    expect(planPrice.value).toBe('');
    expect(planDuration.value).toBe('');
    expect(planDescription.value).toBe('');
  });

  test('displays submitted data after submission', async () => {
    const { planId, planName, planPrice, planDuration, planDescription, addButton } = setup();

    fireEvent.change(planId, { target: { value: 'PREP-TC-0001' } });
    fireEvent.change(planName, { target: { value: 'Basic Plan' } });
    fireEvent.change(planPrice, { target: { value: '10' } });
    fireEvent.change(planDuration, { target: { value: '30 days' } });
    fireEvent.change(planDescription, { target: { value: 'A basic prepaid plan' } });

    axios.post.mockResolvedValueOnce({ data: {} });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Submitted Information/i)).toBeInTheDocument();
      expect(screen.getByText('PREP-TC-0001')).toBeInTheDocument();
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('30 days')).toBeInTheDocument();
      expect(screen.getByText('A basic prepaid plan')).toBeInTheDocument();
    });
  });
});
