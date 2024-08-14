import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserProfileDialog = ({ open, onClose, user }) => {
    if (!user) return null;

  return (
    <Dialog 
  open={open} 
  onClose={onClose} 
  maxWidth="xs" 
  fullWidth 
  PaperProps={{
    sx: {
      width: 300, // Make the card narrower
      bgcolor: '#635acc', // Set the background color to resemble a Pokémon card
      border: '3px solid gold', // Add a golden border
      borderRadius: '16px',
      boxShadow: '0 0 20px 5px rgba(255, 215, 0, 0.8)', // Glowing effect
    },
  }}
>
  <DialogTitle sx={{ color: 'primary.contrastText', textAlign: 'center' }}>
    EloKo Identity
  </DialogTitle>
  <DialogContent sx={{ px: 3, py: 2 }}>
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        mb: 2 
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          bgcolor: 'secondary.main',
          boxShadow: 3,
          p: 0, // Remove padding
        }}
      >
        <Avatar
          src={user.avatar_url}
          alt={user.username}
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Box>
    <Typography 
      variant="h5" 
      align="center" 
      sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1 }}
    >
      {user.username}
    </Typography>
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        mb: 2 
      }}
    >
    </Box>
    {user.bio && (
      <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', mb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ color: 'text.secondary', mb: 1, fontSize: '1rem' }}
        >
          About Me
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: 'text.primary' }}
        >
          {user.bio}
        </Typography>
      </Box>
    )}
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <CalendarMonthIcon sx={{ color: '#ffeb3b', mr: 1 }} />
      <Typography 
        variant="body2" 
        sx={{ color: 'text.primary' }}
      >
        Member Since: {formatDate(user.created_at)}
      </Typography>
    </Box>
  </DialogContent>
</Dialog>

  );
};

export default UserProfileDialog;
