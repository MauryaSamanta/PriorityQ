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
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useLocation, useParams } from "react-router-dom";
const EditHubDialog = ({ open, onClose, onSave, hub, sethubName, setavatar,setdes }) => {
    const location = useLocation();
    const {hubId}=useParams();
    let { des, avatar, banner } = location.state || {};
  const user=useSelector((state)=>state.user);
  const [hubname,setHubname]=useState(hub);
  const [desc,setDesc]=useState(des);
  const [hubavatar,setAvatar]=useState(user.avatar_url);
   const [avatar_show, setAvatar_Show]=useState('');
  const dispatch=useDispatch();
  const token=useSelector((state)=>state.token);
  
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
    formData.append('hubname', hubname);
    formData.append('desc', desc);
    
    // Append avatar if it exists
    if (hubavatar) {
      formData.append("avatar", hubavatar);
    }
   
    const savedHub = await fetch(
      `https://surf-jtn5.onrender.com/hub/${hubId}/settings`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const savedHubRes = await savedHub.json();
    //console.log(savedUserRes);
    if(savedHubRes)
      { 
        setdes(savedHubRes.description);
        setavatar(savedHubRes.avatar_url);
        onClose();}

    
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Hub Settings</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="hubname"
          label="Hub Name"
          type="text"
          fullWidth
          value={hubname}
          onChange={(e) => setHubname(e.target.value)}
        />
        <TextField
          margin="dense"
          name="desc"
          label="Description"
          type="text"
          fullWidth
          multiline
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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
        <Button onClick={()=>{onClose();setAvatar_Show('');}} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHubDialog;
