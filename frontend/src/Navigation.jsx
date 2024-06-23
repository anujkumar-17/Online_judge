import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#333',
  boxShadow: 'none',
});

const CustomToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const NavLinks = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const NavLink = styled('a')(({ theme }) => ({
  color: '#fff',
  marginLeft: theme.spacing(2),
  textDecoration: 'none',
}));

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === 'admin');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <CustomAppBar position="static">
      <CustomToolbar>
        <Typography variant="h6">Online Judge</Typography>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/problems">Problems</NavLink>
          {isAdmin ? (
            <Button color="inherit" href="/dashboard">Dashboard</Button>
          ) : isLoggedIn ? (
            <Button color="inherit" href="/profile">Profile</Button>
          ) : (
            <>
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/register">Register</Button>
            </>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </NavLinks>
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default Navigation;
