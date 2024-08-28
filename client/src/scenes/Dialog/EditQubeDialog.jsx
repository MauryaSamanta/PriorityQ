import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditQubeDialog = ({ qube, open, onClose, onEdit, onDel }) => {
  const [qubeName, setQubeName] = useState('');
  const [nickName,setNickName]=useState('');
  //console.log(qubeName);
  const handleCreate = () => {
    console.log(qubeName);
    onEdit(qubeName,nickName);
    setQubeName('');
    setNickName('');
    onClose();
  };
  
  const handleDelete=()=>{
      onDel();
      onClose();
      setNickName('');
      setQubeName('');
      
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="primary.main">{qube?.name} Qube</DialogTitle>
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
      <Button onClick={handleDelete} sx={{color:"#c92626"}}>
          Delete Qube
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQubeDialog;
