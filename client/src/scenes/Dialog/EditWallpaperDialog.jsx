import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, Input } from '@mui/material';
import { useDropzone } from "react-dropzone";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditWallpaperDialog = ({ open, onClose, onSubmit, setWallpaperMain }) => {
  const [wallpaper, setWallpaper] = useState(null);
  const [wallpaperDB,setWallpaperDB]=useState(null);
  const {hubId}=useParams();
  const {_id}=useSelector((state)=>state.user);
    const handleDrop = (acceptedFiles) => {
    setWallpaper(URL.createObjectURL(acceptedFiles[0]));
    setWallpaperDB(acceptedFiles[0]);
  };
  const handleSubmit = async() => {
      const formData=new FormData();
      formData.append("id",_id);
      formData.append("avatar", wallpaperDB);
      try {
        const savedwall=await fetch(`http://localhost:3001/wall/${hubId}`,{
          method:"PATCH",
          body:formData
        });
        const savedWallpaper=await savedwall.json();
        
        setWallpaperMain(savedWallpaper.wall_url);
        
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
      <DialogTitle>Change Library Wallpaper</DialogTitle>
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
                {wallpaper ? (
                  <img
                    src={wallpaper}
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
        <Button onClick={()=>{setWallpaper(null); setWallpaperDB(null); onClose();}} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!wallpaper}
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

export default EditWallpaperDialog;
