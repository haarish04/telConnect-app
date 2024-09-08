import React from 'react';
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="/servicePlans">Services</a>
        <a href="/support">Contact</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <p>&copy; 2024 TelConnect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
