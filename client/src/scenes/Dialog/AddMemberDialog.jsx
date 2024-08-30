import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Email, WhatsApp } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const AddMemberDialog = ({ open, onClose, code }) => {
  //const inviteLink = 'https://example.com/invite'; // Replace with actual invite link
  //console.log(code);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <TextField
          label="Invite Code"
          value={code}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          margin="normal"
        />
        <CopyToClipboard text={code}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ContentCopyIcon />}
            sx={{ mr: 2, mb: 2 }}
          >
            Copy Code
          </Button>
        </CopyToClipboard>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Email />}
          href={`mailto:?subject=Join our Hub&body=Please join our hub using this code: ${code}`}
          sx={{ mr: 2, mb: 2 }}
        >
          Send via Email
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<WhatsApp />}
          href={`https://api.whatsapp.com/send?text= ${code}`}
          target="_blank"
          sx={{ mb: 2 }}
        >
          Send via WhatsApp
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
