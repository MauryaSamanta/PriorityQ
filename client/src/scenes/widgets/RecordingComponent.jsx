import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// Keyframes for the wave animation
const waveAnimation = keyframes`
  0% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
  100% { transform: scaleY(1); }
`;

// Wave component with wave animation
const AnimatedWaves = () => (
  <Typography variant="body1" color="white" mr={2} display="flex" alignItems="center">
    <span style={{ 
      display: 'inline-block', 
      width: '4px', 
      height: '20px', 
      backgroundColor: 'white', 
      borderRadius: '2px', 
      marginRight: '4px', 
      animation: `${waveAnimation} 1.2s infinite ease-in-out` 
    }} />
    <span style={{ 
      display: 'inline-block', 
      width: '4px', 
      height: '20px', 
      backgroundColor: 'white', 
      borderRadius: '2px', 
      marginRight: '4px', 
      animation: `${waveAnimation} 1.2s infinite ease-in-out 0.1s` 
    }} />
    <span style={{ 
      display: 'inline-block', 
      width: '4px', 
      height: '20px', 
      backgroundColor: 'white', 
      borderRadius: '2px', 
      marginRight: '4px', 
      animation: `${waveAnimation} 1.2s infinite ease-in-out 0.2s` 
    }} />
    <span style={{ 
      display: 'inline-block', 
      width: '4px', 
      height: '20px', 
      backgroundColor: 'white', 
      borderRadius: '2px', 
      marginRight: '4px', 
      animation: `${waveAnimation} 1.2s infinite ease-in-out 0.3s` 
    }} />
    <span style={{ 
      display: 'inline-block', 
      width: '4px', 
      height: '20px', 
      backgroundColor: 'white', 
      borderRadius: '2px', 
      marginRight: '4px', 
      animation: `${waveAnimation} 1.2s infinite ease-in-out 0.4s` 
    }} />
  </Typography>
);

const RecordingComponent = ({ stopRecording }) => (
  <Box display="flex" alignItems="center" ml={2} mr={2}>
    <AnimatedWaves />
    <Button variant="contained" color="secondary" onClick={stopRecording}>
      Stop
    </Button>
  </Box>
);

export default RecordingComponent;
