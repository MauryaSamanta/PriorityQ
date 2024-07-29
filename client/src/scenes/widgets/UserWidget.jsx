import React, { useState } from "react";
import { Box, Typography, Avatar, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import EditProfileDialog from "../Dialog//EditProfileDialog";

const UserWidget = ({ _id, avatar_url }) => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const { username, bio } = user;
  const[avatar,setAvatar]=useState(avatar_url);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    //console.log(avatar_url);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSave = (updatedUser) => {
    // Update user information here (e.g., make an API call to save the data)
    console.log("Updated user information:", updatedUser);
  };

  const defaultAvatar = "https://via.placeholder.com/150/FF0000/FFFFFF?text=User"; // Placeholder image URL

  return (
    <Box
      p="1rem"
      sx={{
        backgroundColor: theme.palette.background.alt,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        src={avatar || defaultAvatar}
        alt={username}
        sx={{ width: 200, height: 200, mb: 2 }}
      />
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        {username}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {bio || "This user has not provided a bio yet."}
      </Typography>
      <Button
        variant="contained"
        sx={{
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
