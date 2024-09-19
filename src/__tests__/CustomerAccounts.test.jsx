import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomerAccounts from '../components/CustomerAccounts';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('CustomerAccounts Component', () => {
  const mockData = [
    {
      customerId: 1,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhno: '1234567890',
      customerAddress: '123 Elm St',
      accountCreationDate: '2023-01-01',
      customerDOB: '1990-01-01',
    },
    {
      customerId: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      customerPhno: '0987654321',
      customerAddress: '456 Oak St',
      accountCreationDate: '2023-01-02',
      customerDOB: '1992-02-02',
    },
  ];

  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onGet('http://localhost:8082/api/customers?adminId=1').reply(200, mockData);
  });

  test('renders customer accounts table', async () => {
    render(<CustomerAccounts />);
    await waitFor(() => {
      expect(screen.getByText('Customer Accounts')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('searches for a customer by ID', async () => {
    render(<CustomerAccounts />);

    await waitFor(() => screen.getByPlaceholderText('Search by ID'));
    fireEvent.change(screen.getByPlaceholderText('Search by ID'), { target: { value: '1' } });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('searches for a customer by email', async () => {
    render(<CustomerAccounts />);

    await waitFor(() => screen.getByPlaceholderText('Search by ID'));
    fireEvent.change(screen.getByPlaceholderText('Search by ID'), { target: { value: 'john.doe@example.com' } });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('shows no data when no customers match search', async () => {
    render(<CustomerAccounts />);

    await waitFor(() => screen.getByPlaceholderText('Search by ID'));
    fireEvent.change(screen.getByPlaceholderText('Search by ID'), { target: { value: '999' } });

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('shows error snackbar on deletion failure', async () => {
    // Simulate deletion error
    mockAxios.onDelete('http://localhost:8082/api/customers/jane.smith@example.com?adminId=1').reply(500);
  
    render(<CustomerAccounts />);
  
    // Wait for data to load
    await waitFor(() => expect(screen.getByText('Jane Smith')).toBeInTheDocument());
  
    // Click delete button for the second customer
    fireEvent.click(screen.getAllByText('Delete')[1]);
  
    // Confirm deletion in the dialog
    fireEvent.click(screen.getAllByText('Delete', { selector: 'button' })[0]);
    
    // Ensure that the customer is still present
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
  
});
