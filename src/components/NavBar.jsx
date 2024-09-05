import  { useState } from 'react';
import '../styles/NavBar.css'
import logo from '../assets/telstra-logo.png'
import search from '../assets/search.png';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Stack } from '@mui/material';

const CustomButton = ({ label, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: isActive ? '#1E2A5A' : '#FFFFFF',  // Active is blue, others white
        color: isActive ? '#FFFFFF' : '#000000',            // Active is white text, others black
        borderRadius: '25px',                               // Rounded edges
        textTransform: 'none',                              // No text transformation
        fontWeight: 'bold',                                 // Bold text
        padding: '6px 16px',                                // Custom padding
        border: isActive ? 'none' : '1px solid #1E2A5A',    // Border for inactive buttons
        '&:hover': {
          backgroundColor: isActive ? '#1E2A5A' : '#F0F0F0', // Keep hover state
        },
      }}
      size='large'
    >
      {label}
    </Button>
  );
};

const ButtonGroup = () => {
  const [activeButton, setActiveButton] = useState('Home');  // Default active button

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
        label="About Us"
        isActive={activeButton === 'About Us'}
        onClick={() => setActiveButton('About Us')}
      />
      <CustomButton
        label="FAQs"
        isActive={activeButton === 'FAQs'}
        onClick={() => setActiveButton('FAQs')}
      />
    </Stack>
  );
};

const NavBar = () => {
  return (
    <div className='navbar'>
        <div className='navbar-upper'>
            <img src={logo} alt="" className='logo'/ >
            <div className='search-login'>
              <div className='search-box'>
                <input type='text' placeholder='Search'/>
                <img src={search} alt="" className='search'/>
              </div>
              <PersonIcon fontSize='large'/>
            </div>            
      </div>
      <div className='navbar-lower'>
      <ButtonGroup/>
      </div>      
    </div>
  )
}

export default NavBar
