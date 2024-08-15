import React, { useState } from 'react';
import { Box, Typography, Button, ButtonBase, Avatar, List, ListItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddMemberDialog from 'scenes/Dialog/AddMemberDialog';
import UserProfileDialog from 'scenes/Dialog/UserProfileDialog';
import { useSelector } from 'react-redux';

const MembersDialog = ({ open, onClose, members, owner, hubId, token }) => {
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isUserProfileDialogOpen, setIsUserProfileDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [code, setCode] = useState(null);
  const {_id}=useSelector((state)=>state.user);
  const handleOpenAddMemberDialog = async () => {
    try {
      const response = await fetch(`https://surf-jtn5.onrender.com/invite/${hubId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCode(data.code);
    } catch (error) {
      console.error(error);
    }

    setIsAddMemberDialogOpen(true);
  };

  const handleCloseAddMemberDialog = () => {
    setIsAddMemberDialogOpen(false);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsUserProfileDialogOpen(true);
  };

  const handleUserProfileDialogClose = () => {
    setIsUserProfileDialogOpen(false);
    setSelectedMember(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box position="relative">
        <DialogTitle
          sx={{
            backgroundColor: '#1f1f1f', // Dark background for the title
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            borderBottom: '1px solid #333',
            //paddingRight: '120px', // Ensure there's space for the button
          }}
        >
          Members
            
           {_id===owner?( <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                //position: 'absolute',
                //right: 16,
                //top: '50%',
                //transform: 'translateY(-50%)',
                marginLeft:'320px',
                backgroundColor: '#635acc',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#4a4b9b',
                },
                borderRadius: 20,
                paddingX: 3,
                paddingY: 1,
              }}
              onClick={handleOpenAddMemberDialog}
            >
              Add Member
            </Button>):(<></>)}
         
        </DialogTitle>
        <DialogContent
          sx={{
            background: 'linear-gradient(180deg, #1f1f1f 0%, #2a2a2a 100%)', // Gradient background
            padding: 3,
            borderRadius: 2,
          }}
        >
          {members ? (
            <List component="nav" sx={{ padding: 0 }}>
              {members.map((member) => (
                <ButtonBase 
                  key={member._id}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    borderRadius: 1,
                    backgroundColor: '#333', // Dark background for list items
                    boxShadow: 1,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#444', // Lighter gray on hover
                    },
                  }}
                  onClick={() => handleMemberClick(member)}
                >
                  <ListItem sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Avatar 
                      src={member.avatar_url} 
                      sx={{ 
                        mr: 2, 
                        width: 48, 
                        height: 48,
                        border: '2px solid #635acc',
                      }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>{member.username}</Typography>
                      {owner === member._id && (
                        <Typography variant="body2" sx={{ color: 'gray', ml: 2 }}>Owner</Typography>
                      )}
                    </Box>
                  </ListItem>
                </ButtonBase>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              No members available
            </Typography>
          )}
          <AddMemberDialog open={isAddMemberDialogOpen} onClose={handleCloseAddMemberDialog} code={code} />
          {selectedMember && (
            <UserProfileDialog open={isUserProfileDialogOpen} onClose={handleUserProfileDialogClose} user={selectedMember} />
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default MembersDialog;
