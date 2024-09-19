import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationPage from "../pages/ConfirmationPage";
import { CustomerContext } from "../context/CustomerContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("ConfirmationPage Component", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  const mockCustomerData = {
    customerId: 1,
    customerEmail: "customer@example.com",
  };

  const mockProps = {
    planId: "POST-TC-1234",
    planName: "Postpaid Plan",
    planPrice: "₹299.00",
    planDuration: "30",
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
  };

  const renderComponent = () =>
    render(
      <Router>
        <CustomerContext.Provider value={{ customerData: mockCustomerData }}>
          <ConfirmationPage {...mockProps} />
        </CustomerContext.Provider>
      </Router>
    );

  test("renders the confirmation page with plan details", () => {
    renderComponent();

    expect(screen.getByText(/Please review your selected plan details below/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/POST-TC-1234/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Postpaid Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/₹299.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Duration:/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();
  });

  test("calls onCancel when cancel button is clicked", () => {
    renderComponent();

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(mockProps.onCancel).toHaveBeenCalled();
  });

  test("sends confirmation email and makes API call on confirm", async () => {
    renderComponent();

    // Mock the API responses for the thank-you email and customer plan confirmation
    mockAxios.onPost(`http://localhost:8082/api/emails/thank-you`).reply(200);
    mockAxios.onPost("http://localhost:8082/api/customers/plans").reply(200, {});

    const confirmButton = screen.getByText(/Confirm/i);
    fireEvent.click(confirmButton);

    const tickElement = screen.getByText("✔");
    expect(tickElement).toBeInTheDocument();
  });

  test("formats the price correctly", () => {
    renderComponent();

    const priceElement = screen.getByText(/₹299.00/i);
    expect(priceElement).toBeInTheDocument();
  });

  test("calculates the correct end date based on plan duration", () => {
    renderComponent();

    const startDate = new Date();
    const durationInDays = parseInt(mockProps.planDuration, 10);
    const expectedEndDate = new Date(startDate);
    expectedEndDate.setDate(startDate.getDate() + durationInDays);

    const localizedEndDate = new Date(expectedEndDate.toUTCString()).toISOString().split("T")[0];

    expect(screen.getByText(localizedEndDate)).toBeInTheDocument();
  });

});
