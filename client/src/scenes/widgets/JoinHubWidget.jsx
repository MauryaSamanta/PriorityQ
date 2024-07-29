import React, { useState } from 'react';
import { Box, Typography, InputBase, Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
const JoinHubWidget = (setHubs) => {
  const [code, setCode] = useState('');
  const { _id} = useSelector((state) => state.user);
  const {token} =useSelector((state)=>state.token);
  const handleJoinHub = async() => {
    const codeData={code:code};
    //console.log(code);
    try {
      const response=await fetch(`http://localhost:3001/invite/${_id}/add`,{
        method:"POST",
        headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },    
        body:JSON.stringify(codeData)
      });
      const data=await response.json();
      const hubid=data.hubData.hub_id;
      const responsehubs = await fetch(`http://localhost:3001/hub`,{
        method:"GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const datahub = await responsehubs.json();
      setHubs(prevHubs => [...prevHubs, datahub]);
    } catch (error) {
      
    }
  };

  return (
    <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  bgcolor="parent"
  minHeight="35vh"
  borderRadius="10px"
  border="2px dotted #FFEB3B" // Dotted border with color
>
      <Typography variant="h3" component="div" color="primary.main" gutterBottom>
        There is absolutely no reason for you to not join your first hub
      </Typography>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 2 }}
      >
        <InputBase
  sx={{
    ml: 1,
    flex: 1,
    bgcolor: '#40444b', // Background color to make it distinct
    borderRadius: '8px', // Rounded corners
    border: '1px solid #FFEB3B', // Border color
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow
    px: 2, // Padding on the left and right
    py: 1, // Padding on the top and bottom
    '&:focus': {
      borderColor: '#FFD700', // Focus border color
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', // Enhanced shadow on focus
      outline: 'none', // Remove default focus outline
    },
  }}
  placeholder="Enter your hub code"
  value={code}
  onChange={(e) => setCode(e.target.value)}
/>
      </Paper>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleJoinHub}
        sx={{
          backgroundColor: '#FFEB3B',
          color: '#36393f',
          '&:hover': {
            backgroundColor: '#FFD700',
          }
        }}
      >
        Join Hub
      </Button>
    </Box>
  );
};

export default JoinHubWidget;
