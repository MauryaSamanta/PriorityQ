import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const CreateQubeDialog = ({ open, onClose, onCreate }) => {
  const [qubeName, setQubeName] = useState('');
  const [nickName,setNickName]=useState('');
  const handleCreate = () => {
    console.log(qubeName);
    onCreate(qubeName,nickName);
    setQubeName('');
    setNickName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="primary.main">Create Qube</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="qubeName"
          label="Qube Name"
          type="text"
          fullWidth
          value={qubeName}
          onChange={(e) => setQubeName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="nickName"
          label="Qube Nick Name"
          type="text"
          fullWidth
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQubeDialog;
