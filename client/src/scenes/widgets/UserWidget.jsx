import React, { useState } from "react";
import { Box, Typography, Avatar, Button, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import EditProfileDialog from "../Dialog/EditProfileDialog";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserWidget = ({ _id, avatar_url }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const { username, bio, created_at } = user;
  const [avatar, setAvatar] = useState(avatar_url);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSave = (updatedUser) => {
    console.log("Updated user information:", updatedUser);
  };

  const defaultAvatar = "https://via.placeholder.com/150/FF0000/FFFFFF?text=User"; // Placeholder image URL

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box
        p={2}
        sx={{
          width: 300, // Match the width of the UserProfileDialog
          bgcolor: '#635acc', // Set the same background color
          border: '3px solid gold', // Add the golden border
          borderRadius: '16px',
          boxShadow: '0 0 20px 5px rgba(255, 215, 0, 0.8)',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: 'primary.contrastText', textAlign: 'center', mb: 2 }}>
          EloKo Identity
        </Typography>

        <Box
          sx={{
            width: 80,
            height: 80,
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            bgcolor: 'secondary.main',
            boxShadow: 3,
            mb: 2,
          }}
        >
          <Avatar
            src={avatar || defaultAvatar}
            alt={username}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1 }}>
          {username}
        </Typography>

        {bio && (
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px', 
              mb: 2, 
              textAlign: 'left', // Align text to the left
              width: '100%', // Make the box full width
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ color: 'text.secondary', mb: 1, fontSize: '1rem' }}
            >
              About Me
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{ color: 'text.primary', whiteSpace: 'pre-line' }}
            >
              {bio}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <CalendarMonthIcon sx={{ color: '#ffeb3b', mr: 1 }} />
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            Member Since: {formatDate(created_at)}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: theme.palette.grey[500],
          color: "white",
          borderRadius: "1rem",
          '&:hover': {
            backgroundColor: theme.palette.grey[700],
          },
        }}
        onClick={handleOpenDialog}
      >
        Edit Profile
      </Button>

      <EditProfileDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        user={user}
        onSave={handleSave}
        setAvatarMain={setAvatar}
      />
    </Box>
  );
};

export default UserWidget;
