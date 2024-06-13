import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import Header from '../Headers/Headers'; // Adjust path based on your file structure
import './AdminLogincss.css'; // Import your custom styles

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:3001/api/admin/login', { email, password });
      const { token, role } = data;
      if (role !== 'admin') {
        setError('You are not authorized to access the admin dashboard.');
        return;
      }
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userRole', role);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Header /> {/* Include the Header component */}
      <Container className="container" maxWidth="xs">
        <Box className="card">
          {error && <Typography variant="body1" className="login-alert" style={{ color: 'red' }}>{error}</Typography>}
          <form onSubmit={handleLogin}>
            <Typography variant="h5" className="header-title mb-1" style={{ color: '#000' }}>
              Admin Login
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
              disabled={loading}
              className="login-button mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Typography className="login-links mt-1" style={{ color: '#000' }}>
            Not an admin? <Link href="/" style={{ color: '#2196f3' }}>User Login</Link>
          </Typography>
          <Typography className="login-links mt-1" style={{ color: '#000' }}>
            Admin register? <Link href="/admin/register" style={{ color: '#2196f3' }}>Register</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AdminLogin;
