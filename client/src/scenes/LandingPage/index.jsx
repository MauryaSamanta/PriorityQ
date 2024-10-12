import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Grid,
  IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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
    <Box sx={{background: ' #1e1e2f ',cursor:'default'}} >
      
      <Box
    
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'rgba(30, 30, 47, 0.4)',
        //backgroundImage:'linear-gradient(rgba(30, 30, 47, 0.8), rgba(30, 30, 47, 0.8)),url(/assets/monkey.png)',
        backgroundSize:'contain',
        backgroundRepeat: 'no-repeat', 
        color: '#fff',
        position: 'relative',
        paddingRight:!isSmallScreen && 30,
        paddingLeft:!isSmallScreen && 30,
        paddingTop:!isSmallScreen && 3,
        
      }}
    >
      
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none', borderRadius:!isSmallScreen && 5 }}>
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
        <Button
                variant="contained"
                sx={{ border: '2px solid', borderColor: 'primary.main', borderRadius:10 }}
                color="primary"
                //onClick={() => navigate("/support")}
              >
               Get Early Access
          </Button>
        </Toolbar>
      </AppBar>

      
      <Typography
  variant="h3"
  sx={{
    fontWeight: 600,
    fontSize: isSmallScreen ? 20 : 36, // Increase size for more impact
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: !isSmallScreen && 1.5, // Add letter spacing
    color: '#635acc', // Adjust color for more contrast
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)', // Add shadow for depth
  }}
>
  Chat, Stash, Organize — All in One Place!
</Typography>
      <MainContent sx={{flex:1}}>
        <Container sx={{ cursor: 'default' }}>
         <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor pulvinar mauris, vestibulum suscipit metus maximus rhoncus. Mauris nec molestie tortor. Aliquam dignissim felis et molestie placerat. Mauris nisi augue, dictum in aliquet non, sollicitudin sit amet turpis. Nunc id laoreet tellus, vel tempor dolor. Aenean odio magna, porta a sem ac, malesuada auctor arcu. Proin eu facilisis lorem.

Sed sit amet risus quis nisl rhoncus consectetur eget non diam. Mauris eu accumsan elit. Curabitur ullamcorper congue tincidunt. Cras sit amet bibendum sem. Fusce condimentum, diam ut eleifend consequat, felis lorem hendrerit eros, id luctus est erat et est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam molestie lectus ac sapien pharetra gravida. Sed et neque pretium, dictum tortor at, sollicitudin felis. Nam accumsan pellentesque magna vel malesuada. Vivamus non gravida sem. Vivamus accumsan scelerisque nisl egestas fringilla. Aenean pellentesque, est eu sagittis laoreet, orci metus egestas ex, a elementum odio erat et arcu.

In nibh mauris, rhoncus et ipsum non, molestie faucibus justo. Quisque eu mollis nisi, vel laoreet orci. Morbi pellentesque pharetra nisi, aliquet commodo quam maximus non. Ut elementum pellentesque quam, non tincidunt velit fringilla in. Maecenas eros augue, placerat eget lectus sed, euismod elementum ligula. Duis at accumsan neque. Fusce faucibus, dui ut bibendum elementum, sapien nulla mollis ex, vitae dapibus nulla nibh nec sapien. Integer est tellus, tempus vitae egestas vel, auctor sit amet urna. Suspendisse justo urna, vehicula maximus maximus non, fermentum vel magna. Morbi lacinia, dolor eu pretium commodo, diam urna rutrum mauris, a ullamcorper ipsum turpis at nisl. Integer tempor vulputate justo, nec rhoncus nisl tincidunt id. Donec ipsum tellus, fringilla ut ex vel, placerat posuere enim. Nam sit amet ultrices elit, vitae facilisis elit. Nam diam lorem, iaculis quis fermentum et, accumsan id ante. Mauris hendrerit augue a ipsum aliquet, ac ornare nibh auctor. Suspendisse at risus vitae augue hendrerit luctus.

Vestibulum quis felis a mi faucibus vestibulum. Aliquam ut augue sit amet mauris consectetur tincidunt non nec sapien. Morbi quis eros vitae mi pretium pulvinar id ut magna. Aliquam erat volutpat. Etiam nec magna et ipsum dignissim porttitor. Phasellus lacinia posuere commodo. Ut ipsum justo, ullamcorper ut leo blandit, dapibus dapibus nisi. Quisque ultricies mauris metus, sed fringilla felis interdum id. Pellentesque id tristique nisl. Pellentesque ante dui, commodo aliquet iaculis sit amet, dapibus a dui.

Suspendisse eleifend est quis ligula tristique, quis rhoncus dui dapibus. Vivamus commodo a velit nec mattis. Proin viverra dolor a nulla fringilla vestibulum. Fusce posuere, lacus ac tristique volutpat, mauris eros euismod tellus, sed egestas orci ligula id eros. Aliquam quis interdum purus. Praesent vulputate augue at nisl lobortis sodales. Vestibulum porta accumsan sapien vitae mattis. Maecenas ullamcorper metus id lacus blandit rhoncus. In lobortis porttitor lacus, non feugiat risus laoreet id. Suspendisse dignissim diam at varius tempor. Integer eu dolor elementum, dapibus velit non, rhoncus neque. In non nulla mollis, tincidunt nibh non, tempus orci. Suspendisse fringilla lorem et lectus aliquet, quis condimentum nisi dictum. Cras mattis, nunc vel malesuada aliquet, sapien mauris gravida nisl, vitae tempus</Typography>
        </Container>
      </MainContent>
    </Box>
    <Box
  position="relative"
  //bottom={0}
  left={0}
  width="100%"
  height="250px"
  //overflow="hidden"
  //lineHeight={0}
  zIndex={1} // Wave is below the form
>
  <svg
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
    style={{ width: "100%", height: "100%", position: 'absolute', bottom: 0 }} // Keep the SVG at the bottom
  >
     <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style={{ stopColor: "#1e1e2f", stopOpacity: 1 }} />
      <stop offset="50%" style={{ stopColor: "#635acc", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#1e1e2f", stopOpacity: 1 }} />
    </linearGradient>
  </defs>
    <path
       d="M0.00,49.98 C150.00,-50.00 349.50,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
      style={{ fill: 'url(#gradient)' }}
    />
  </svg>
  
  <Typography 
    variant="caption" 
    sx={{
      position: 'absolute', // Make Typography position absolute
      bottom: '10px', // Position it above the SVG wave
      left: '15%',
      // /transform: 'translateX(-50%)', // Center it horizontally
      color: '#B5B5B5', // Change color to ensure it's visible above the wave
      zIndex: 2, // Ensure it appears above the SVG
      fontSize: 12,
    }}
  >
    &copy; 2024 EloKo. All rights reserved.
  </Typography>

  {/* New Text Components */}
  <Typography 
    variant="body2" 
    sx={{
      position: 'absolute',
      left: '15%', // Adjust to position it on the left side
      bottom: '130px', // Position above the wave
      //color: '#fff', // Ensure it's visible
      zIndex: 2, // Ensure it appears above the SVG
      fontSize: 14,
      maxWidth: '300px', // Limit the width if necessary
      color:'#B5B5B5'
    }}
  >
    EloKo is the place where messages, files, folders and fun flow as freely as ever...
  </Typography>
  
  <Typography 
    variant="body2" 
    sx={{
      position: 'absolute',
      left: '15%', // Keep it aligned with the first text
      bottom: '30px', // Position just below the first text
      color: '#B5B5B5', // Ensure it's visible
      zIndex: 2, // Ensure it appears above the SVG
      fontSize: 14,
      maxWidth: '300px', // Limit the width if necessary
    }}
  >
    We are a lean team of builders from Kolkata, India working towards the mission of a safe and super powered space for talking and sharing resources.
  </Typography>
  <Typography 
  
  sx={{
    position: 'absolute',
    right: '31%', // Position on the right side
    bottom: '90px', // Align vertically with other text
    color: '#B5B5B5', // Match the color of other text
    zIndex: 2,
    fontSize: 14,
    fontWeight: 500,
    marginBottom:'2px'
  }}
>
  Socials
</Typography>

<Box 
  sx={{
    position: 'absolute',
    right: '30%', // Align with Socials heading
    bottom: '30px', // Align with text
    zIndex: 2,
    color: '#B5B5B5',
    fontSize: 14,
  }}
>
  <Typography component="a" href="https://www.instagram.com" target="_blank" sx={{ display: 'block', textDecoration: 'none', color: '#B5B5B5', marginBottom:'1px' }}>
    Instagram
  </Typography>
  <Typography component="a" href="https://www.linkedin.com" target="_blank" sx={{ display: 'block', textDecoration: 'none', color: '#B5B5B5', marginBottom:'1px' }}>
    LinkedIn
  </Typography>
  <Typography component="a" href="https://www.twitter.com" target="_blank" sx={{ display: 'block', textDecoration: 'none', color: '#B5B5B5', marginBottom:'1px' }}>
    X (Twitter)
  </Typography>
</Box>
</Box>
    </Box>
  );
};

export default LandingPage;
