import { Box, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";
import Form from "./Form";
import WaveAnimation from "../animations/Wave";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        //backgroundColor={theme.palette.background.alt}
        p="1rem"
        
      >
        <Typography fontWeight="bold" fontSize="30px" color="primary">
          Surf
        </Typography>
      </Box>
      
      <Box
        width={isNonMobileScreens ? "30%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        
        <Form />
        
      </Box>
      
    </Box>
  );
};

export default LoginPage;
