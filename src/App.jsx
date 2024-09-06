//import React from 'react'
import NavBar from "./components/NavBar";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import { TestHomePage } from "./components/TestHomePage";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/TestHomePage" element={<TestHomePage />} />
        </Routes>
      </Router>
      <div className="">
        {/* <NavBar></NavBar> */}
        {/* <HomePage></HomePage> */}
        {/* <ProfilePage></ProfilePage> */}
      </div>
    </div>
  );
};

export default App;
