import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const CreateZoneDialog = ({ open, onClose, onCreate }) => {
  const [zoneName, setZoneName] = useState('');

  const handleCreate = () => {
    onCreate(zoneName);
    setZoneName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Zone</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Zone Name"
          fullWidth
          variant="outlined"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#888',
              },
              '&:hover fieldset': {
                borderColor: '#555',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'primary.main',
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button 
          onClick={handleCreate} 
          color="primary" 
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: '#FFEB3B',
            color: '#36393f',
            '&:hover': {
              backgroundColor: '#FFD700',
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateZoneDialog;