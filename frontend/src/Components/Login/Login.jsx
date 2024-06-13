import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import Header from '../Headers/Headers'; // Adjust path based on your file structure
import './Logincss.css'; // Ensure this file exists for any custom styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/user/login', { email, password });
      const { token, role } = data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userRole', role);
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };
  
  return (
    <>
      <Header /> {/* Include the Header component */}
      <Container className="container" maxWidth="xs">
        <Box className="card">
          {error && <Alert severity="error" className="login-alert">{error}</Alert>}
          <form onSubmit={handleLogin}>
            <Typography variant="h5" className="header-title mb-1" style={{ color: '#000' }}>
              User Login
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{
                style: { color: '#000' }, // Black text for label
              }}
              InputProps={{
                style: { color: '#000' }, // Black text for input
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputLabelProps={{
                style: { color: '#000' }, // Black text for label
              }}
              InputProps={{
                style: { color: '#000' }, // Black text for input
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className="login-button mt-2"
            >
              Login
            </Button>
          </form>
          <Typography className="login-links mt-1" style={{ color: '#000' }}>
            Don't have an account? <Link href="/register" style={{ color: '#2196f3' }}>Register</Link>
          </Typography>
          <Typography className="login-links" style={{ color: '#000' }}>
            Are you an admin? <Link href="/admin/login" style={{ color: '#2196f3' }}>Admin Login</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Login;
