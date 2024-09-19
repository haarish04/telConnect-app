import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import { CustomerContext } from '../context/CustomerContext';
import axios from 'axios';

jest.mock('axios');

const mockSetCustomerData = jest.fn();

const renderLogin = (locationState) => {
    render(
        <CustomerContext.Provider value={{ setCustomerData: mockSetCustomerData }}>
            <Router>
                <Login location={{ state: locationState }} />
            </Router>
        </CustomerContext.Provider>
    );
};

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login component', () => {
        renderLogin();
        expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('displays success message when coming from registration', () => {
        renderLogin({ fromRegistration: true });

        // Use waitFor to ensure the component has time to update
        waitFor(() => {
            expect(screen.getByText(/Login with your new credentials!/i)).toBeInTheDocument();
        });
    });

    test('handles successful login', async () => {
        axios.post.mockResolvedValueOnce({});
        axios.get.mockResolvedValueOnce({ data: { customerId: 2 } });

        renderLogin();

        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check for loading state
        expect(screen.getByRole('button', { name: /Please wait....*/ })).toBeInTheDocument();

        await waitFor(() => {
            expect(mockSetCustomerData).toHaveBeenCalledWith({ customerId: 2 });
        });

        // Verify that loading state is no longer visible
        expect(screen.queryByRole('button', { name: /Please wait....*/ })).not.toBeInTheDocument();
    });

    test('handles login failure', async () => {
        // Mock the axios post to simulate a login failure
        axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } });

        renderLogin();

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Assert the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
        });
    });
});
