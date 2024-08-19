import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const CreateHubDialog = ({ open, onClose, userId, setHubs }) => {
  const [step, setStep] = useState(1);
  const [hubName, setHubName] = useState("");
  const [hubDescription, setHubDescription] = useState("");
  const [hubAvatar, setHubAvatar] = useState(null);
  const [hubAvatarDB, setHubAvatarDB]=useState(null);
  const token = useSelector((state) => state.token);
  const handleDrop = (acceptedFiles) => {
    setHubAvatar(URL.createObjectURL(acceptedFiles[0]));
    setHubAvatarDB(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleNext = () => {
    if (step === 1 && hubName) {
      setStep(2);
    } else if (step === 2 && hubDescription) {
      setStep(3);
    } else if(step==3 && hubAvatar){
        setStep(4);
    }

  };

  const handleSkip = () => {
    setHubAvatar(null);
    setStep(4);
  };

  const handleStart = async() => {
    // Create a new FormData instance
    const formData = new FormData();
  
    // Append data to the FormData object
    formData.append('name', hubName);
    formData.append('description', hubDescription);
    
    // Append avatar if it exists
    if (hubAvatar) {
      formData.append("avatar", hubAvatarDB);
    }
  
    formData.append('owner_id', userId);
    //console.log(formData);
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    const savedHubRes = await fetch(
        "https://surf-jtn5.onrender.com/hub",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const savedHub = await savedHubRes.json();
      
      if(savedHub)
      {  window.location.reload();
         onClose();
        }
  
    // Handle the form submission logic here, e.g., send the FormData to an API
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{color:'primary.main'
      }}>
        Starting Hub
        <IconButton
          edge="end"
          color="inherit"
          onClick={()=>{setHubName(''); setHubAvatar('');
            setHubAvatarDB(''); setHubDescription(''); onClose();
          }}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {step === 1 && (
          <Box>
            <Typography variant="h6">Step 1: Hub Name</Typography>
            <TextField
              fullWidth
              label="Hub Name"
              variant="outlined"
              margin="normal"
              helperText="This is the name by which people will know the hub."
              value={hubName}
              onChange={(e) => setHubName(e.target.value)}
            />
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Typography variant="h6">Step 2: Hub Description</Typography>
            <TextField
              fullWidth
              label="Hub Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              helperText="Provide a brief description of the hub."
              value={hubDescription}
              onChange={(e) => setHubDescription(e.target.value)}
            />
          </Box>
        )}
        {step === 3 && (
          <Box>
            <Typography variant="h6">Step 3: Hub Avatar</Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed",
                borderColor: "primary.main",
                borderRadius: "4px",
                padding: "1rem",
                textAlign: "center",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                {hubAvatar ? (
                  <img
                    src={hubAvatar}
                    alt="Hub Avatar"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : (
                  "Drag & drop an image here, or click to select one"
                )}
              </Typography>
            </Box>
            <Button onClick={handleSkip} variant="text">
              Skip this step
            </Button>
          </Box>
        )}
        {step === 4 && (
         <Box
         sx={{
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           justifyContent: "center",
           textAlign: "center"
         }}
       >
         <Typography>
            {hubAvatar ? (
             <Avatar
               src={hubAvatar}
               alt="Hub Avatar"
               sx={{ width: 100, height: 100, mb: 2 }}
             />
           ) : ""}
         </Typography>
         <Typography variant="h4"> {hubName}</Typography>
         <Typography>{hubDescription}</Typography>
       </Box>
       
        )}
      </DialogContent>
      <DialogActions>
        {step >1 && (
          <Button onClick={() => setStep(step - 1)} variant="outlined">
          Back
        </Button>
          
        )}
        {step === 4 && (
          <Button onClick={handleStart} variant="contained" color="primary">
            Start
          </Button>
        )}
        {step < 4 && (
          <Button onClick={handleNext} variant="contained" color="primary">
          Next
        </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateHubDialog;
