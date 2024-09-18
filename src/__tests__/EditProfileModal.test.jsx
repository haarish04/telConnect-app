import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CustomerContext } from "../context/CustomerContext";
import EditProfileModal from "../components/EditProfileModal";

const mockUpdateCustomerData = jest.fn();

const mockCustomerData = {
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  customerDOB: "1990-01-01",
  customerAddress: "123 Main St",
  password: "password123",
};

const renderComponent = (show, showPasswordModal = false) => {
  render(
    <CustomerContext.Provider value={{ customerData: mockCustomerData }}>
      <EditProfileModal
        show={show}
        handleClose={() => {}}
        updateCustomerData={mockUpdateCustomerData}
      />
    </CustomerContext.Provider>
  );
};

test("renders EditProfileModal and Change Password modal based on state", () => {
  renderComponent(true);
  // Check if Edit Profile modal is visible
  expect(screen.getByText("Edit Profile")).toBeInTheDocument();

  // Open Change Password modal
  fireEvent.click(screen.getAllByText("Change Password")[0]);
  expect(screen.getAllByText("Change Password")[0]).toBeInTheDocument();
});

test("handles input changes correctly", () => {
  renderComponent(true);

  // Simulate input changes
  fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
    target: { value: "1995-05-05" },
  });
  expect(screen.getByLabelText(/Date of Birth/i).value).toBe("1995-05-05");
});

test("shows success alert after saving changes", async () => {
  renderComponent(true);

  // Simulate input change and save
  fireEvent.change(screen.getByLabelText(/Address/i), {
    target: { value: "456 Elm St" },
  });
  fireEvent.click(screen.getByText("Save Changes"));

  await waitFor(() => {
    expect(screen.getByText("Profile updated successfully!")).toBeInTheDocument();
  });
});

