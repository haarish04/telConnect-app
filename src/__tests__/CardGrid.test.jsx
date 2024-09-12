import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardGrid from '../components/CardGrid';
import { CustomerContext } from '../context/CustomerContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { onPlanClickHandler } from '../utils/authUtils';

// Mock the onPlanClickHandler function
jest.mock('../utils/authUtils', () => ({
  onPlanClickHandler: jest.fn(),
}));

describe('CardGrid Component', () => {
  const mockCustomerData = {
    customerId: '123',
    customerName: 'John Doe',
  };

  const mockPlanCard = {
    planId: 'PREP-TC-0001',
    price: '299',
    validity: '30',
    data: '10',
    description: 'Sample Plan Description',
    plan_name: 'Basic Plan',
  };

  const renderComponent = (props) => {
    return render(
      <Router>
        <CustomerContext.Provider value={{ customerData: mockCustomerData }}>
          <CardGrid {...props} />
        </CustomerContext.Provider>
      </Router>
    );
  };

  test('renders plan cards correctly', () => {
    renderComponent({ plan_card1: mockPlanCard, plan_card2: mockPlanCard, plan_card3: mockPlanCard });

    expect(screen.getByText(/₹ 299/i)).toBeInTheDocument();
    expect(screen.getByText(/10 GB/i)).toBeInTheDocument();
    expect(screen.getByText(/30 days/i)).toBeInTheDocument();
    expect(screen.getByText(/View details/i)).toBeInTheDocument();
    expect(screen.getByText(/Select/i)).toBeInTheDocument();
  });

  test('opens modal and displays plan details when "View details" is clicked', async () => {
    renderComponent({ plan_card1: mockPlanCard, plan_card2: mockPlanCard, plan_card3: mockPlanCard });

    fireEvent.click(screen.getByText(/View details/i));

    await waitFor(() => {
      expect(screen.getByText(/Basic Plan/i)).toBeInTheDocument();
      expect(screen.getByText(/Price:/i)).toBeInTheDocument();
      expect(screen.getByText(/₹ 299/i)).toBeInTheDocument();
      expect(screen.getByText(/Description:/i)).toBeInTheDocument();
      expect(screen.getByText(/Sample Plan Description/i)).toBeInTheDocument();
      expect(screen.getByText(/Validity:/i)).toBeInTheDocument();
      expect(screen.getByText(/30 days/i)).toBeInTheDocument();
    });
  });

  test('calls onPlanClickHandler when "Select" button is clicked', async () => {
    renderComponent({ plan_card1: mockPlanCard, plan_card2: mockPlanCard, plan_card3: mockPlanCard });

    fireEvent.click(screen.getByText(/Select/i));

    await waitFor(() => {
      expect(onPlanClickHandler).toHaveBeenCalledWith(expect.any(Function), mockCustomerData, 'PREP-TC-0001');
    });
  });

  // Additional debug if needed
  test('should debug', () => {
    console.log(screen.debug());
  });
});
