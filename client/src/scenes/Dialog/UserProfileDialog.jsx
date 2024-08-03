import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserProfileDialog = ({ open, onClose, user }) => {
    if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', textAlign:'center' }}>
        User Profile
        {/* <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'primary.contrastText' }}
        >
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent >
        <Box sx={{ my: 2,ml:2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
              bgcolor: 'secondary.main',
              mr: 2
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
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            {user.username}
          </Typography>
        </Box>
        {user.bio?(<Box sx={{ mt: 2, p: 2, bgcolor: 'parent', borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            About Me
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            {user.bio}
          </Typography>
        </Box>):(<></>)}
        <Box sx={{  p:2 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            Member Since
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
             {formatDate(user.created_at)}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
