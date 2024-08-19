import React, { useState } from 'react';
import { Box, Typography, Dialog, IconButton, TextField, Button } from '@mui/material';

const CreateFolderDialog = ({ open, onClose, createFolder }) => {
  const [folderName, setFolderName] = useState('');

  // Function to handle folder creation
  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createFolder(folderName);
      console.log(folderName);
      setFolderName(''); // Clear input field after creating folder
      onClose(); // Close the dialog
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(44, 44, 44, 0.8)', // Semi-transparent dark background
          borderRadius: '12px', // Rounded corners
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Card-like shadow
          padding: '16px', // Adjusted padding
          zIndex: 1200, // Ensure it's above other content
        }
      }}
    >
      <Box color="white" textAlign="center">
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Create New Folder
        </Typography>
        
        {/* Input field for folder name */}
        <TextField
          variant="outlined"
          placeholder="Enter folder name..."
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          fullWidth
          sx={{
            input: {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly transparent background
              borderRadius: '8px', // Rounded corners
            },
            mb: 2,
          }}
        />
        
        {/* Create Folder button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateFolder}
          sx={{
            backgroundColor: 'primary', // Primary color for the button
            
            borderRadius: '8px',
            padding: '10px 0', // Padding for a sleeker button
          }}
        >
          Create Folder
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateFolderDialog;
