import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Avatar,
  Typography
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

const EditProfileDialog = ({ open, onClose, onSave, setAvatarMain }) => {
  const user=useSelector((state)=>state.user);
  const [username,setUsername]=useState(user.username);
  const [bio,setBio]=useState(user.bio);
  const [avatar,setAvatar]=useState(user.avatar_url);
  const [avatar_show, setAvatar_Show]=useState('');
  const handleDrop = (acceptedFiles) => {
    setAvatar_Show(URL.createObjectURL(acceptedFiles[0]));
    setAvatar(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleChange = (e) => {
    
  };

  const handleSubmit = async() => {
    const formData = new FormData();
  
    // Append data to the FormData object
    formData.append('username', username);
    formData.append('bio', bio);
    
    // Append avatar if it exists
    if (avatar) {
      formData.append("avatar", avatar);
    }
  
    const savedUser = await fetch(
      `https://surf-jtn5.onrender.com/users/${user._id}/avatar`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const savedUserRes = await savedUser.json();
    console.log(savedUserRes);
    if(savedUserRes)
      {setAvatarMain(savedUserRes.avatar_url); console.log(savedUserRes.avatar_url); onClose();}
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          name="bio"
          label="Bio"
          type="text"
          fullWidth
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        
          <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                padding: "1rem",
                textAlign: "center",
                marginTop: "1rem",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                {avatar_show ? (
                  <img
                    src={avatar_show}
                    alt="Avatar"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : (
                  "Drag & drop an image here, or click to select one"
                )}
              </Typography>
            </Box>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
