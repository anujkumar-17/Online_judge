import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { styled } from '@mui/system';
import Navigation from '../../Navigation'; // Import Navigation component

// Styled component for the background
const Background = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#000', // Black background color
});

// Styled component for the card
const Card = styled(Box)({
  background: '#333',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  color: '#fff',
});

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/admin/register', { username, email, password, birthYear, country });
      console.log(data);
      alert('Registration successful!');
      navigate('/'); // Redirect to login page
    } catch (error) {
      setError('Registration failed. Please check your inputs and try again.');
      console.error(error);
    }
  };

  return (
    <>
      <Navigation /> {/* Include the Navigation component */}
      <Background>
        <Container maxWidth="xs">
          <Card>
            {error && <Alert severity="error" className="login-alert">{error}</Alert>}
            <Typography variant="h5" className="header-title mb-1" style={{ color: '#fff' }}>
              Admin Register
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Birth Year"
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
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
                label="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
                className="register-button mt-2"
                style={{ marginTop: '1rem' }}
              >
                Register
              </Button>
            </form>
            <Typography className="login-links mt-1" style={{ color: '#fff', marginTop: '1rem' }}>
              Already have an account? <Link href="/" style={{ color: '#2196f3' }}>Login</Link>
            </Typography>
          </Card>
        </Container>
      </Background>
    </>
  );
};

export default AdminRegister;
