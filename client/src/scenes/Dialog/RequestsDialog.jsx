import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const RequestsDialog = ({ open, onClose, userid }) => {
  const theme = useTheme();
  const [requests, setRequests] = useState([]);

  const handleAccept = async(requestid, senderid) => {
    const data={reqid:requestid,userid:userid, senderid:senderid};
    try {
        const response=await fetch(`http://localhost:3001/chat/new`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        });
        const chat=await response.json();
        if (response.ok) {
          // Update state to remove the accepted request
          setRequests((prevRequests) =>
              prevRequests.filter((request) => request._id !== requestid)
          );
      }
        //console.log(chat);
    } catch (error) {
        
    }
  };

  const handleDecline = (requestId) => {
    // Logic for declining a friend request goes here
    console.log(`Declined request ${requestId}`);
    // Optionally update the request list or perform other actions
  };

  useEffect(() => {
    const getReqs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/request/${userid}`, {
          method: "GET",
        });
        const reqs = await response.json();
        console.log(response);
        setRequests(reqs);

      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    getReqs();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"
    sx={{
      borderRadius: '16px', // Adjust the borderRadius as needed
      '& .MuiPaper-root': {
        borderRadius: '16px', // Ensures the dialog content is also rounded
      },
    }} 
    >
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h6">Friend Requests</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: '2rem', backgroundColor: theme.palette.background.paper }}>
        <List
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.default,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {requests.length > 0 ? (
            requests.map((request) => (
              <ListItem
                key={request._id}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  padding: '1rem',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  primary={request.sender_id.username}
                  secondary={<Typography variant="body2" color="textSecondary">wants to be friends</Typography>}
                  sx={{ flex: 1 }}
                />
                <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    onClick={() => handleDecline(request._id)}
                    sx={{
                      color: theme.palette.error.main,
                      '&:hover': {
                        color: theme.palette.error.dark,
                        backgroundColor: 'transparent',
                      },
                      minWidth: '40px',
                      minHeight: '40px',
                      borderRadius: '50%',
                      padding: '0.5rem',
                    }}
                  >
                    <CancelIcon />
                  </Button>
                  <Button
                    onClick={() => handleAccept(request._id,request.sender_id._id)}
                    sx={{
                      color: theme.palette.success.main,
                      '&:hover': {
                        color: theme.palette.success.dark,
                        backgroundColor: 'transparent',
                      },
                      minWidth: '40px',
                      minHeight: '40px',
                      borderRadius: '50%',
                      padding: '0.5rem',
                    }}
                  >
                    <CheckCircleIcon />
                  </Button>
                </Box>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, padding: '1rem' }}>
              No new requests
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem', backgroundColor: theme.palette.background.paper }}>
        <Button onClick={onClose} sx={{ color: 'white' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestsDialog;
