import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import PersonalInfo from "../components/PersonalInfo";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("PersonalInfo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem("email", "testuser@example.com");
    sessionStorage.setItem("password", "password123");
  });

  test("renders form elements correctly", () => {
    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    expect(screen.getByLabelText(/Name:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address Line 1:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number:/)).toBeInTheDocument();
  });

  test("updates form fields on user input", () => {
    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    const nameInput = screen.getByLabelText(/Name:/);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    const phoneInput = screen.getByLabelText(/Phone Number:/);
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(phoneInput.value).toBe("1234567890");
  });

  test("submits the form and makes API requests successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    axios.get.mockResolvedValueOnce({ data: { customerId: 1 } });

    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    const submitButton = screen.getByText(/Submit/);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Assert that the axios.post call was made correctly
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    // Assert that the axios.get call was made after form submission
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test("handles form submission errors", async () => {
    axios.post.mockRejectedValueOnce(new Error("API error"));

    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    const submitButton = screen.getByText(/Submit/);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check if the error is handled properly
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  test("opens date picker on date field click (mocked)", () => {
    // Mock the ref to bypass JSDOM limitation
    const mockShowPicker = jest.fn();
    jest.spyOn(HTMLInputElement.prototype, 'showPicker').mockImplementation(mockShowPicker);

    render(
      <Router>
        <PersonalInfo />
      </Router>
    );

    const dateInput = screen.getByLabelText(/Date of Birth:/);
    fireEvent.click(dateInput);

    // Ensure the date picker mock function is called
    expect(mockShowPicker).toHaveBeenCalled();
  });
});
