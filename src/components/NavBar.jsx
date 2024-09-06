import React, { useState, useEffect } from 'react';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';
import search from '../assets/search.png';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Stack } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';

const CustomButton = ({ label, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: isActive ? '#1E2A5A' : '#FFFFFF',
        color: isActive ? '#FFFFFF' : '#000000',
        borderRadius: '25px',
        textTransform: 'none',
        fontWeight: 'bold',
        padding: '6px 16px',
        border: isActive ? 'none' : '1px solid #1E2A5A',
        '&:hover': {
          backgroundColor: isActive ? '#1E2A5A' : '#F0F0F0',
        },
      }}
      size='large'
    >
      {label}
    </Button>
  );
};

const ButtonGroup = () => {
  const [activeButton, setActiveButton] = useState('Home');

  return (
    <Stack direction="row" spacing={2}>
      <CustomButton
        label="Home"
        isActive={activeButton === 'Home'}
        onClick={() => setActiveButton('Home')}
      />
      <CustomButton
        label="Services"
        isActive={activeButton === 'Services'}
        onClick={() => setActiveButton('Services')}
      />
      <CustomButton
        label="Recharge"
        isActive={activeButton === 'About Us'}
        onClick={() => setActiveButton('About Us')}
      />
      <CustomButton
        label="Support"
        isActive={activeButton === 'FAQs'}
        onClick={() => setActiveButton('FAQs')}
      />
    </Stack>
  );
};

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='navbar-container'>
      <div className={`navbar-upper ${isScrolled ? 'navbar-upper-hidden' : ''}`}>
        <img src={logo} alt="Logo" className='logo' />
        <div className='search-login'>
          <div className='search-box'>
            <input type='text' placeholder='Search' />
            <img src={search} alt="Search" className='search' />
          </div>
          <Link to="/login">
            <PersonIcon fontSize="large" className="loginicon" style={{ color: "#1E2A5A" }} />
          </Link>
        </div>
      </div>
      <div className={`navbar-lower ${isScrolled ? 'navbar-lower-sticky' : ''}`}>
        <ButtonGroup />
      </div>
    </div>
  );
};

export default NavBar;
