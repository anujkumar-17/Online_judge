import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { styled } from '@mui/system';
import Navigation from '../../Navigation'; // Import Navigation component

const Background = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#000', // Changed to black background
});

const Card = styled(Box)({
  background: '#333',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  color: '#fff',
});

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
      <Navigation /> {/* Include the Navigation component */}
      <Background>
        <Container maxWidth="xs">
          <Card>
            {error && <Alert severity="error" className="login-alert">{error}</Alert>}
            <form onSubmit={handleLogin}>
              <Typography variant="h5" className="header-title mb-1" style={{ color: '#fff' }}>
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
                  style: { color: '#fff' }, // White text for label
                }}
                InputProps={{
                  style: { color: '#fff' }, // White text for input
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
                  style: { color: '#fff' }, // White text for label
                }}
                InputProps={{
                  style: { color: '#fff' }, // White text for input
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className="login-button mt-2"
                style={{ marginTop: '1rem' }}
              >
                Login
              </Button>
            </form>
            <Typography className="login-links mt-1" style={{ color: '#fff', marginTop: '1rem' }}>
              Don't have an account? <Link href="/register" style={{ color: '#2196f3' }}>Register</Link>
            </Typography>
            <Typography className="login-links" style={{ color: '#fff' }}>
              Are you an admin? <Link href="/admin/login" style={{ color: '#2196f3' }}>Admin Login</Link>
            </Typography>
          </Card>
        </Container>
      </Background>
    </>
  );
};

export default Login;
