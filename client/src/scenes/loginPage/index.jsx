import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";
import { ReactTyped } from "react-typed"; // Correctly import Typed as a named import
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      position="relative"
      height="100%"
      bgcolor={theme.palette.background.default}
    >
      {/* Content Container */}
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
        height="100%"
        p="2rem"
        zIndex={2} // Ensure the form is above the wave
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
          {/* <Typography
            fontWeight="bold"
            fontSize={isNonMobileScreens ? "64px" : "48px"}
            color="primary"
            textAlign="center"
          >
            <ReactTyped strings={["EloKo"]} typeSpeed={100} />
          </Typography> */}
          <img src="/assets/EloKoMainLogo.png" width={isNonMobileScreens? "500px":"200px"}/>
          {/* <Typography
            variant="h5"
            color={theme.palette.text.secondary}
            mt={isNonMobileScreens ? "1rem" : "0.5rem"}
            textAlign="center"
          >
            <ReactTyped
              strings={["The ultimate messaging platform."]}
              startDelay={1000} // Start after the title has typed
              typeSpeed={50}
            />
          </Typography> */}
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
          zIndex={2} // Ensure the form is above the wave
        >
          <Form />
        </Box>
      </Box>

      {/* Bottom Left Wave */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        height="150px"
        overflow="hidden"
        lineHeight={0}
        zIndex={1} // Wave is below the form
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.50,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ fill: theme.palette.primary.main }}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default LoginPage;
