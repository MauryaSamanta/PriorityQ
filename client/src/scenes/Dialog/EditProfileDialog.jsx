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

const EditProfileDialog = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio,
    avatar_url: user.avatar_url,
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          avatar_url: reader.result,
        });
      };
      reader.readAsDataURL(file);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
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
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="bio"
          label="Bio"
          type="text"
          fullWidth
          value={formData.bio}
          onChange={handleChange}
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
          <Typography>Drag 'n' drop an avatar image, or click to select one</Typography>
          {formData.avatar_url && (
            <Avatar
              src={formData.avatar_url}
              alt="avatar"
              sx={{ width: 100, height: 100, margin: "1rem auto" }}
            />
          )}
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
