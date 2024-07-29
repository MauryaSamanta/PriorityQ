import React from 'react';
import { Box, Typography, List, ListItem, Avatar, Divider, Tabs, Tab,Button } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddMemberDialog from 'scenes/Dialog/AddMemberDialog';

const HubOverview = ({members}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [code,setCode]=useState(null);
  const { hubId } = useParams();
  const token = useSelector((state) => state.token);
  const handleOpenDialog = async() => {
    const inviteBody={hub_id:hubId};
    try {
      const response=await fetch(`http://localhost:3001/invite/${hubId}`,{
        method:"POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data=await response.json();
      setCode(data.code);
      console.log(code);
    } catch (error) {
      
    }

    setIsDialogOpen(true);

  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
      const tasks = [
        { id: 1, title: 'Complete project documentation', description: 'Finish writing the documentation for the project.' },
        { id: 2, title: 'Update website design', description: 'Revamp the design of the website based on the latest feedback.' },
        { id: 3, title: 'Prepare for team meeting', description: 'Gather all necessary materials and agenda for the upcoming meeting.' },
        { id: 4, title: 'Fix bugs in the application', description: 'Address the reported bugs and push the fixes to the repository.' },
      ];
      
      const files = [
        {
          id: 1,
          name: 'Design_Document.pdf',
          description: 'This is the design document for the project.'
        },
        {
          id: 2,
          name: 'Project_Plan.xlsx',
          description: 'This is the project plan with timelines and milestones.'
        },
        {
          id: 3,
          name: 'Meeting_Notes.txt',
          description: 'Notes from the last project meeting.'
        },
        {
          id: 4,
          name: 'User_Manual.docx',
          description: 'User manual for the application.'
        }
      ];
      
      const [tabValue, setTabValue] = useState(0);

      const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };  
  return (
    <Box display="flex" width="100%" height="100%" p={2} bgcolor="#36393f">
      {/* Members List */}
      
      <Divider orientation="vertical" flexItem />
      {/* Tasks Overview */}
      <Box width="75%" bgcolor="#40444b" color="white" p={2} display="flex" flexDirection="column" borderRadius="8px">
  <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
    <Tab label="My Tasks" />
    <Tab label="My Files" />
  </Tabs>
  {tabValue === 0 ? (
    <>
      <Typography variant="h6" mb={2} align="center">Assigned Tasks</Typography>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Box key={task.id} p={2} mb={2} bgcolor="#2f3136" borderRadius="8px">
            <Typography variant="body1" fontWeight="bold">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" align="center">No tasks assigned.</Typography>
      )}
    </>
  ) : (
    <>
      <Typography variant="h6" mb={2} align="center">Files</Typography>
      {files.length > 0 ? (
        files.map((file) => (
          <Box key={file.id} p={2} mb={2} bgcolor="#2f3136" borderRadius="8px">
            <Typography variant="body1" fontWeight="bold">{file.name}</Typography>
            <Typography variant="body2">{file.description}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" align="center">No files available.</Typography>
      )}
    </>
  )}
</Box>
<Box width="25%" bgcolor="#2f3136" color="white" p={2} display="flex" flexDirection="column" borderRadius="8px">
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h6" align="center">Members</Typography>
    <Button
      variant="contained"
      color="primary"
      size="small"
      sx={{
        backgroundColor: '#FFEB3B',
        color: '#2f3136',
        '&:hover': {
          backgroundColor: '#FFD700',
        }
      }}
      onClick={handleOpenDialog}
    >
      Add Member
    </Button>
  </Box>
  {members? (<List component="nav">
    {members.map((member) => (
      <ListItem key={member._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar src={member.avatar_url} sx={{ mr: 2 }} />
        <Typography variant="body1">{member.username}</Typography>
      </ListItem>
    ))}
  </List>):(null)}
  <AddMemberDialog open={isDialogOpen} onClose={handleCloseDialog} code={code}/>
</Box>
    </Box>
  );
};

export default HubOverview;
