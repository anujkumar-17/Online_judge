// src/Components/Header/Header.jsx
import React from 'react';
import { Typography } from '@mui/material';
import './Headers.css'; // Ensure you create this file for any custom styles

const Header = () => {
  return (
    <div className="header">
      <Typography variant="h3" component="h1" className="header-title">
        Welcome to Anuj's Online Judge
      </Typography>
    </div>
  );
};

export default Header;
