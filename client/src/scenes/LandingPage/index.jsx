import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, useMediaQuery, Link, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from 'components/Button';
const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 250,
  height: '100%',
  background: 'linear-gradient(135deg, #1e1e2f 30%, #635acc 100%)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'scroll',
  padding: theme.spacing(4, 0),
  gap: theme.spacing(2),
  //justifyContent: 'center',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  
  // Hide scrollbar for IE and Edge
  '-ms-overflow-style': 'none', // for Internet Explorer and Edge
  scrollbarWidth: 'none', // for Firefox
}
));

const GlowingCard = styled(Box)(({ theme, cardcolor }) => ({
  background: `linear-gradient(135deg, ${cardcolor}, #1e1e2f)`,
  color: '#fff',
  borderRadius: '20px',
  padding: theme.spacing(3),
  minWidth: '20vw',
  [theme.breakpoints.down('md')]: {
    minWidth: '75vw',
    //justifyContent: 'space-between',
  },
  height: '350px',
  //boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  cursor: 'pointer',
  justifyContent:'center',
  alignItems:'center',
  textAlign:'justify',
  transition: 'transform 0.5s ease, box-shadow 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.8)',
  },
}));

const PhoneMockup = styled(Box)(({ theme }) => ({
  borderRadius: '30px',
  //background: '#000',
  padding: theme.spacing(1),
  width: '90%',
  height: '250px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  //boxShadow: 'inset 0px 0px 10px rgba(255, 255, 255, 0.1)',
}));

const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1e1e2f',
  padding: theme.spacing(4),
  color: '#999999',
  borderTop: '1px solid #635acc',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const FooterText = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const LandingPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [boxStyle, setBoxStyle] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const cards = [
    
      { title: 'Power to Build', description: 'Build and customize your community home which we like to call Hubs', color: '#ff7043',illustration:'assets/community.svg' }, // Vibrant orange for creativity and construction
      { title: 'Power to Access', description: 'Access photos, files and videos on-the-go without downloading', color: '#42a5f5', illustration:'assets/functions.svg' }, // Bright blue for accessibility and ease
      { title: 'Power to Manage', description: 'Manage your resources like never-before using our intuitive file and folder system', color: '#fbc02d', illustration:'assets/manage.svg' }, // Gold/yellow for precision and management
      { title: 'Power to Organize', description: 'Organise and create numerous Qubes to chat in within Hubs so that topics and ideas dont get lost amidst thousands of texts', color: '#66bb6a',illustration:'assets/qube.svg' }, // Green for order and balance
      { title: 'Power to Express', description: 'Express yourself using your EloKo Card-your all-in-one card for everything in EloKo', color: '#ab47bc',illustration:'assets/card.png' }, // Purple for creativity and self-expression
    ];

  return (
    <Box sx={{ background: ' #1e1e2f ', cursor: 'default' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          color: '#fff',
          position: 'relative',
          paddingRight: !isSmallScreen ? 30 : 2,
          paddingLeft: !isSmallScreen ? 30 : 2,
          paddingTop: !isSmallScreen ? 3 : 3,
        }}
      >
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none', borderRadius: 5 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 'bold',
                color: '#635acc',
                cursor: 'pointer',
                textShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              }}
            >
              EloKo
            </Typography>
            {/* <Button
              variant="contained"
              sx={{ border: '2px solid', borderColor: 'primary.main', borderRadius: 10 }}
              color="primary"
            >
              Get Early Access
            </Button> */}
            <Button/>
          </Toolbar>
        </AppBar>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: isSmallScreen ? 20 : 36,
            marginTop: 6,
            textAlign: 'center',
            letterSpacing: !isSmallScreen && 1.5,
            color: '#635acc',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          Chat, Stash, Organize — All in One Place!
        </Typography>

        {/* Horizontal Scroll for Glowing Cards */}
        <CardContainer>
          {cards.map((card, index) => (
            <GlowingCard key={index} cardcolor={card.color} sx={{boxShadow:  '0px 15px 30px rgba(0, 0, 0, 0.5)',}}>
              
              <PhoneMockup>
              <img src={card.illustration} alt="Community Illustration" style={{ maxWidth: index!=4?'100%':'250px', height: index!=4?'auto':'250px' }} />

              </PhoneMockup>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {card.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {card.description}
              </Typography>
            </GlowingCard>
          ))}
        </CardContainer>

        {/* Footer Section */}
        <Footer>
          <FooterText>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 16 }}>
              EloKo is the place where messages, files, folders, and fun flow as freely as ever.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              We are a lean team of builders from Kolkata, India working towards the mission of a safe and superpowered space for talking and sharing resources.
            </Typography>
          </FooterText>

          <Box sx={{ textAlign: isSmallScreen ? 'center' : 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Get In Touch
            </Typography>
            <Box>
              <IconButton color="inherit" component={Link} href="https://www.instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://www.linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://www.twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Box>
        </Footer>

        {/* Copyright Section */}
        <Box sx={{ textAlign: 'center', marginTop: 2, paddingBottom: 2 }}>
          <Typography variant="caption" color="textSecondary">
            &copy; 2024 EloKo. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
