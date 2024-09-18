import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("bearerToken");

  if (!token) {
    // If there's no token, redirect to an error page
    return <Navigate to="/NotFound" replace />;
  }

  // If the token exists, render the children (AdminPage)
  return children;
};

export default ProtectedRoute;
