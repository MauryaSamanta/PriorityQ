import React from "react";
import { Box, useTheme, useMediaQuery, Paper } from "@mui/material";
import Form from "./Form";
import './wave.css'; // Import the CSS for the waves


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box position="relative" height="100vh">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={require('./wolf.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Waves */}
      <Box position="absolute" bottom={0} left={0} width="100%" height="300px" overflow="hidden" zIndex={1}>
        <div className="wave1"></div>
        <div className="wave2"></div>
        <div className="wave3"></div>
      </Box>

      {/* Content Container */}
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
        height="100%"
        p="2rem"
        zIndex={2} // Ensure the form is above the waves
      >
        {/* Company Name */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={isNonMobileScreens ? "50%" : "100%"}
          mb="0"
        >
          <img src="/assets/EloKoMainLogo.png" width={isNonMobileScreens ? "500px" : "200px"} />
        </Box>

        {/* Login Form */}
        <Box
          component={Paper}
          elevation={6}
          width={isNonMobileScreens ? "40%" : "100%"}
          p="2rem"
          borderRadius="1.5rem"
          ml={isNonMobileScreens ? "2rem" : "0"}
          mx="auto"
          zIndex={2}
          sx={{
            backdropFilter: 'blur(10px)', // Applies blur effect
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
            border: '2px solid black',
          }}
        >
          <Form />
        </Box>
      </Box>

      {/* Fixed Bottom Wave */}
      <Box className="fixed-wave">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0.00,49.98 C150.00,150.00 349.50,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
        </svg>
      </Box>
    </Box>
  );
};

export default LoginPage;
