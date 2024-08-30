import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, Input } from '@mui/material';
import { useDropzone } from "react-dropzone";
import { useParams } from 'react-router-dom';

const EditHubBannerDialog = ({ open, onClose, onSubmit, banner, setBanner }) => {
  const [hubBanner, setHubBanner] = useState(null);
  const [hubBannerDB,setHubBannerDB]=useState(null);
  const {hubId}=useParams();
    const handleDrop = (acceptedFiles) => {
    setHubBanner(URL.createObjectURL(acceptedFiles[0]));
    setHubBannerDB(acceptedFiles[0]);
  };
  const handleSubmit = async() => {
      const formData=new FormData();
      formData.append("avatar", hubBannerDB);
      //setBanner(hubBanner);
      try {
        const savedHubResponse=await fetch(`http://localhost:3001/hub/${hubId}`,{
          method:"PATCH",
          body:formData
        });
        const savedHub=await savedHubResponse.json();
        //console.log(savedHub);
        
        setBanner(savedHub.banner_url);
        //console.log(banner);
        onClose();
      } catch (error) {
        
      }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Hub Banner</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            border: '2px dashed #635acc',
            borderRadius: 2,
            //backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Box
              {...getRootProps()}
              sx={{
                // /border: "2px dashed",
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
                {hubBanner ? (
                  <img
                    src={hubBanner}
                    alt="Hub Banner"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : (
                  "Drag & drop an image here, or click to select one"
                )}
              </Typography>
            </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{setHubBanner(null); setHubBannerDB(null); onClose();}} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!hubBanner}
          sx={{
            backgroundColor: '#635acc',
            '&:hover': {
              backgroundColor: '#4a4b9b',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHubBannerDialog;
