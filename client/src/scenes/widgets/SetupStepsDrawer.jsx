import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SetupStepsDrawer= ({ steps, currentStep, avatar,banner,wallpaper,qubes,members }) => {
  return (
    <Box sx={{ padding: 1 }} textAlign="center">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Finish Setting Up Your Hub
      </Typography>
      <img src='/assets/SetupIcon.png' width="80px"/>
      {steps.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 1,
            borderRadius: 2,
            backgroundColor: (index ===0 && avatar) || (index ===1 && banner) || (index ===2 && wallpaper)
            || (index ===3 && qubes.length>1) || (index ===4 && members.length>1)
            ? 'primary.light' : 'background.paper',
            boxShadow: (index ===0 && avatar) || (index ===1 && banner) || (index ===2 && wallpaper)
            || (index ===3 && qubes.length>1) || (index ===4 && members.length>1) ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
            marginBottom: 2,
            transition: 'background-color 0.3s, box-shadow 0.3s',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: (index ===0 && avatar) || (index ===1 && banner) || (index ===2 && wallpaper)
                || (index ===3 && qubes.length>1) || (index ===4 && members.length>1) ? 'bold' : 'regular',
                color: 'text.secondary',
              }}
            >
              {item.step}
            </Typography>
          </Box>
          {(index ===0 && avatar) || (index ===1 && banner) || (index ===2 && wallpaper)
            || (index ===3 && qubes.length>1) || (index ===4 && members.length>1) ? (
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '24px' }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ color: 'text.secondary', fontSize: '24px' }} />
          )}
          <IconButton sx={{ marginLeft: 1, color: 'primary.main' }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default SetupStepsDrawer;
