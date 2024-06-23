import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navigation from '../../Navigation';

const Background = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#000',
  color: '#fff',
  position: 'relative', // Position relative to place the username at the top left
});

const Card = styled(Box)({
  background: '#333',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  color: '#fff',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const Username = styled(Typography)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  fontSize: '45px',
});

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Fetch user data
        const userResponse = await axios.get('http://localhost:3001/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if the response contains data
        if (userResponse.data) {
          setUserData(userResponse.data);
        }
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <Background>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        <Username>Welcome, {userData.username}!</Username>
        <Card>
          <Box mt={4}>
            <Typography variant="h4">
                Welcome to your profile! Here you can track your progress, view your problem-solving stats, and see your recent activities. Keep practicing to enhance your coding abilities and climb the leaderboard.
              </Typography>
            <Box mt={11}> {/* Added Box with margin-top to increase space */}
            <Typography variant="h4" gutterBottom>
              Practice Problems to Improve Your Coding Skills
            </Typography>
            </Box>
          </Box>
          <Box mt={4} mb={2}> {/* Added Box with margin-top to increase space */}
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/problems"
          >
            Go to Problems
          </Button>
        </Box>
        </Card>
      </Background>
    </>
  );
};

export default Profile;
