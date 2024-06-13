import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';
import Header from '../Headers/Headers'; // Adjust path based on your file structure
import './Registercss.css'; // Import your custom styles

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/user/register', { username, email, password, birthYear, country });
      console.log(data);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header /> {/* Include the Header component */}
      <Container className="container" maxWidth="xs">
        <Box className="card">
          <Typography variant="h5" className="header-title mb-1" style={{ color: '#000' }}>
            Register
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
              label="Country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              Register
            </Button>
          </form>
          <Typography className="login-links mt-1" style={{ color: '#000' }}>
            Already have an account? <Link href="/" style={{ color: '#2196f3' }}>Login</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Register;
