// src/Components/DocumentVerificationStatusLogs.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DocumentVerificationStatusLogs from '../components/DocumentVerificationStatusLogs'; 
import axios from 'axios';

jest.mock('axios');

describe('DocumentVerificationStatusLogs Component', () => {
  const mockData = [
    {
      verificationId: '123',
      customerId: 'C001',
      documentId: 'D001',
      requestDate: '2023-09-10',
      requestStatus: 'SUCCESS',
    },
    {
      verificationId: '456',
      customerId: 'C002',
      documentId: 'D002',
      requestDate: '2023-09-11',
      requestStatus: 'FAILED',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Document Verification Logs title', () => {
    render(<DocumentVerificationStatusLogs />);
    const titleElement = screen.getByText(/Document Verification Logs/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('fetches and displays data from API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<DocumentVerificationStatusLogs />);

    const row = await waitFor(() => screen.getByText('C001'));
    expect(row).toBeInTheDocument();
  });

  test('displays the correct status color', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<DocumentVerificationStatusLogs />);

    const successStatus = await waitFor(() => screen.getByText('SUCCESS'));
    const failedStatus = await waitFor(() => screen.getByText('FAILED'));

    expect(successStatus).toHaveStyle('color: green');
    expect(failedStatus).toHaveStyle('color: red');
  });

  test('filters rows based on search input', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
  
    render(<DocumentVerificationStatusLogs />);
  
    // Ensure data is fetched and rendered
    await waitFor(() => screen.getByText('C001'));
  
    // Get the search input element
    const searchInput = screen.getByPlaceholderText('Search by ID');
  
    // Simulate entering search term 'C002'
    fireEvent.change(searchInput, { target: { value: 'C002' } });
  
    // Verify that only 'C002' row is visible
    expect(screen.queryByText('C001')).not.toBeInTheDocument();
    expect(screen.getByText('C002')).toBeInTheDocument();
  });
  
});
