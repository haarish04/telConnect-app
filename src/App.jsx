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
import DocumentVerificationPage from "./pages/DocumentVerificationPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import ConfirmationContainer from "./components/ConfirmationContainer";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

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
          <Route
            path="/documentVerification"
            element={<DocumentVerificationPage />}
          />
          <Route path="/personalInfo" element={<PersonalInfoPage />} />
          <Route path="/planConfirmation" element={<ConfirmationContainer />} />
          {/* <Route path="/planConfirmation" element={<ConfirmationPage />} /> */}
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
          <Route path="/termsOfService" element={<TermsOfServicePage />} />
        </Routes>
      </Router>
      <div className=""></div>
    </CustomerProvider>
  );
};

export default App;
