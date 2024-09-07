//import React from 'react'
import NavBar from "./components/NavBar";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CustomerProvider } from "./context/CustomerContext";
const App = () => {
  return (
    <CustomerProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
      <div className="">
        {/* <NavBar></NavBar> */}
        {/* <HomePage></HomePage> */}
        {/* <ProfilePage></ProfilePage> */}
      </div>
    </CustomerProvider>
  );
};

export default App;
