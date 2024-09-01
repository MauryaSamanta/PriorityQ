import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// Keyframes for the jumping and bouncing dot animation
const dotJumping = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0); 
  }
  40% { 
    transform: translateY(-10px); 
  }
`;

// Dot component with jumping animation
const AnimatedDots = () => (
  <Typography variant="body1" color="white" mr={2} display="flex" alignItems="center">
    <span style={{ 
      display: 'inline-block', 
      width: '8px', 
      height: '8px', 
      backgroundColor: 'white', 
      borderRadius: '50%', 
      marginRight: '4px', 
      animation: `${dotJumping} 1.2s infinite ease-in-out` 
    }} />
    <span style={{ 
      display: 'inline-block', 
      width: '8px', 
      height: '8px', 
      backgroundColor: 'white', 
      borderRadius: '50%', 
      marginRight: '4px', 
      animation: `${dotJumping} 1.2s infinite ease-in-out 0.2s` 
    }} />
    <span style={{ 
      display: 'inline-block', 
      width: '8px', 
      height: '8px', 
      backgroundColor: 'white', 
      borderRadius: '50%', 
      marginRight: '4px', 
      animation: `${dotJumping} 1.2s infinite ease-in-out 0.4s` 
    }} />
  </Typography>
);

const RecordingComponent = ({ stopRecording }) => (
  <Box display="flex" alignItems="center" ml={2} mr={2}>
    <AnimatedDots />
    <Button variant="contained" color="secondary" onClick={stopRecording}>
      Stop
    </Button>
  </Box>
);

export default RecordingComponent;
