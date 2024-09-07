//import React from 'react'
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CustomerProvider } from "./context/CustomerContext";
import SupportPage from "./pages/SupportPage";
import ServicePlansPage from "./pages/ServicePlansPage";

const App = () => {
  return (
    <CustomerProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/TestHomePage" element={<TestHomePage />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/servicePlans" element={<ServicePlansPage />} />
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
