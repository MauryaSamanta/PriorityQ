import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Grid,
  IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const WaveSection = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.primary.main,
  height: '150px',
  overflow: 'hidden',
  zIndex: -1,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-75px',
    left: 0,
    width: '200%',
    height: '150%',
    background: 'radial-gradient(circle, rgba(99,90,204,1) 0%, rgba(44,44,84,1) 70%)',
    animation: 'waveAnimation 6s linear infinite',
  },
  '@keyframes waveAnimation': {
    '0%': { transform: 'translateX(0)' },
    '50%': { transform: 'translateX(-50%)' },
    '100%': { transform: 'translateX(0)' },
  },
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 250,
  height: '100%',
  background: 'linear-gradient(135deg, #1e1e2f 30%, #635acc 100%)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Footer = styled('footer')(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f 30%, #635acc 100%)',
  color: '#fff',
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const LandingPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [boxStyle, setBoxStyle] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    const xRotation = (y / window.innerHeight - 0.5) * 30;
    const yRotation = (x / window.innerWidth - 0.5) * -30;

    setBoxStyle({
      transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
    });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1e2f 30%, #635acc 100%)',
        color: '#fff',
        position: 'relative',
      }}
    >
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
        variant="h1" 
        sx={{ 
        fontWeight: 'bold', 
        color: '#635acc', 
        cursor: 'pointer',
        textShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        //boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        EloKo
        </Typography>

          {isSmallScreen ? (
            <>
              <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                <DrawerContainer>
                  <List>
                    <ListItem button onClick={() => { navigate('/'); setDrawerOpen(false); }}>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/about-us'); setDrawerOpen(false); }}>
                      <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/contact-us'); setDrawerOpen(false); }}>
                      <ListItemText primary="Contact Us" />
                    </ListItem>
                    <ListItem button onClick={() => { navigate('/home'); setDrawerOpen(false); }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#854be3',
                          color: 'white',
                          width: '100%',
                          '&:hover': {
                            backgroundColor: '#6f3cc4',
                          },
                        }}
                      >
                        Launch EloKo
                      </Button>
                    </ListItem>
                  </List>
                </DrawerContainer>
              </Drawer>
            </>
          ) : (
            <Box>
              <Button sx={{ color: '#ffffff', mr: 2 }} onClick={() => navigate(`/`)}>Home</Button>
              <Button sx={{ color: '#ffffff', mr: 2 }} onClick={() => navigate(`/about-us`)}>About</Button>
              <Button sx={{ color: '#ffffff', mr: 2 }} onClick={() => navigate(`/contact-us`)}>Contact Us</Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#854be3',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#6f3cc4',
                  },
                }}
                onClick={() => navigate(`/home`)}
              >
                Launch EloKo
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <WaveSection />

      <MainContent>
        <Container sx={{ cursor: 'default' }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: isSmallScreen ? '2rem' : '3rem',
                  }}
                >
                  A space for communication and superpowered resource sharing.
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, fontSize: isSmallScreen ? '1.2rem' : '1.5rem' }}>
                  Join us and revolutionize the way you chat and share resources in your community.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  perspective: '1000px',
                  display: 'flex',
                  justifyContent: isSmallScreen ? 'center' : 'flex-end',
                }}
              >
                <Box
  sx={{
    width: !isSmallScreen?'100%':'90%',
    height: !isSmallScreen?'300px':'140px',
    backgroundColor: '#635acc',
    borderRadius: '15px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s ease-out',
    transform: boxStyle.transform,
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <img
    src='/assets/preview.png' // Replace with your image source
    alt="Description"
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: !isSmallScreen?'cover':'contain',
      objectPosition: 'center', // Adjusts which part of the image is centered
      zIndex: 1,
      borderRadius: 'inherit', // Ensures the image follows the parent's border radius
    }}
  />
</Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MainContent>

      <Footer>
        
        <Typography variant="caption">
          &copy; 2024 EloKo. All rights reserved.
        </Typography>
      </Footer>
    </Box>
  );
};

export default LandingPage;
