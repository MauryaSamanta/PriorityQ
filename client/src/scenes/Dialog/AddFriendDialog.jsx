import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const AddFriendDialog = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [success,setsuccess]=useState(false);
  const {_id}=useSelector((state)=>state.user);
  const theme = useTheme();

  const handleSendRequest = async() => {
    const data={senderid:_id, recname:username};
    try {
        const response=await fetch(`http://localhost:3001/request/create`,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(data)
        })
        if(response.ok)
            setsuccess(true);

    } catch (error) {
        
    }
   
    
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" 
    sx={{
      borderRadius: '16px', // Adjust the borderRadius as needed
      '& .MuiPaper-root': {
        borderRadius: '16px', // Ensures the dialog content is also rounded
      },
    }} 
    >
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h4">Add a Friend</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: '2rem', backgroundColor: theme.palette.background.paper }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography variant="body1" sx={{ color: theme.palette.text.primary }} mt={3}>
            Add Friends using EloKo Username
          </Typography>
          <TextField
            label="EloKo Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{
              borderRadius: '8px',
              backgroundColor: theme.palette.background.default,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
          {success && <Typography>Friend Request Sent</Typography>}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem', backgroundColor: theme.palette.background.paper }}>
        <Button onClick={onClose} sx={{ color: 'white' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSendRequest}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Send Friend Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendDialog;
