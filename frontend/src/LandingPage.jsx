import React from 'react';
import { Box, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'; // Import Navigation component

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
});

const HeroSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#2d2d2d',
  color: '#fff',
  padding: theme.spacing(4),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.9rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(5), // Increased margin bottom to 24px
  textAlign: 'center',
}));

const HeroText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(5), // Increased margin bottom to 32px
  textAlign: 'center',
}));

const CtaButtons = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole === 'admin') {
      navigate('/dashboard');
    } else if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <Root>
      <Navigation /> {/* Include the Navigation component */}
      <HeroSection>
        <Container maxWidth="sm">
          <HeroTitle variant="h2">
            Master Coding Challenges, Unleash Your Potential
          </HeroTitle>
          <HeroText variant="body1">
            Join our premier platform to enhance your problem-solving skills and deepen your coding knowledge. Explore a rich array of challenges, engage with a vibrant community, and elevate your abilities to become a top-tier developer.
          </HeroText>
          <CtaButtons>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Begin Your Journey
            </Button>
          </CtaButtons>
        </Container>
      </HeroSection>
    </Root>
  );
};

export default LandingPage;
