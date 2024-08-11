import React, { useState } from 'react';
import { Box, Typography, InputBase, Button, Paper, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

const JoinHubWidget = ({ setHubs }) => {
  const [code, setCode] = useState('');
  const { _id } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleJoinHub = async () => {
    const codeData = { code: code };
    try {
      const response = await fetch(`http://localhost:3001/invite/${_id}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(codeData)
      });
      const data = await response.json();
      const hubid = data.hubData.hub_id;
      const responseHubs = await fetch(`http://localhost:3001/hub`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataHub = await responseHubs.json();
      setHubs(prevHubs => [...prevHubs, dataHub]);
      window.location.reload();
    } catch (error) {
      console.error('Error joining hub:', error);
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
      border="primary"
      p={isSmallScreen ? 2 : 4}
    >
      <Typography
        variant={isSmallScreen ? 'h5' : 'h3'}
        component="div"
        color="primary.main"
        gutterBottom
      >
        Join your first hub
      </Typography>
      <Box
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          color:'parent',
          width: isSmallScreen ? '100%' : 400,
          mb: 2,
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            bgcolor: '#40444b',
            borderRadius: '8px',
            border: '1px solid #FFEB3B',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            px: 2,
            py: 1,
            '&:focus': {
              borderColor: '#FFD700',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              outline: 'none',
            },
          }}
          placeholder="Enter your hub code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinHub}
        
      >
        Join Hub
      </Button>
    </Box>
  );
};

export default JoinHubWidget;