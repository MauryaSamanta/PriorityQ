import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Button, List, ListItem, Avatar, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const QubeOverview = ({ qubeid }) => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [hubMembers, setHubMembers] = useState([]);
  const token=useSelector((state)=>state.token);
  const {hubId}=useParams();
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/qube/${qubeid}`, { method: "GET" });
        const data = await response.json();
        console.log(data.userDetails);
        setMembers(data.userDetails);
      } catch (error) { }
    };

    const fetchHubMembers = async () => {
      try {
        const response=await fetch(`http://localhost:3001/hub/${hubId}/members`,{
            method:"GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data=await response.json();
          console.log(data.userDetails);
        setHubMembers(data.userDetails);
      } catch (error) { }
    };

    fetchMembers();
    fetchHubMembers();
  }, [qubeid]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMembers = members.filter(member =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHubMembers = hubMembers.filter(hubMember =>
    hubMember.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !members.some(member => member._id === hubMember._id)
  );
  const handleQubeAdd=async(userid)=>{
      const addBody={memberId:userid};
      console.log(addBody);
      try {
        const reponse=await fetch(`http://localhost:3001/qube/${qubeid}`,{
            method:"POST",
            headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
            body:JSON.stringify(addBody)
        });
        
      } catch (error) {
        
      }
  };
  const tasks = [
    { id: 1, title: 'Complete project documentation', description: 'Finish writing the documentation for the project.', supportingDocs: 'Design_Document.pdf', assignedTo: 'John Doe', urgency: 'High' },
    { id: 2, title: 'Update website design', description: 'Revamp the design of the website based on the latest feedback.', supportingDocs: 'UI_Mockups.png', assignedTo: 'Jane Smith', urgency: 'Medium' },
    { id: 3, title: 'Prepare for team meeting', description: 'Gather all necessary materials and agenda for the upcoming meeting.', supportingDocs: 'Meeting_Agenda.docx', assignedTo: 'Alice Johnson', urgency: 'Low' },
    { id: 4, title: 'Fix bugs in the application', description: 'Address the reported bugs and push the fixes to the repository.', supportingDocs: 'Bug_Report.xlsx', assignedTo: 'Bob Brown', urgency: 'High' },
  ];

  return (
    <Box display="flex" width="100%" height="100%" p={2} bgcolor="#36393f">
      <Box width="75%" bgcolor="#40444b" color="white" p={2} display="flex" flexDirection="column" borderRadius="8px">
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Tasks" />
          <Tab label="Members" />
        </Tabs>
        {tabValue === 0 ? (
          <Box sx={{ overflowY: 'auto', '&::-webkit-scrollbar': { width: '10px' }, '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px', border: '3px solid transparent', backgroundClip: 'padding-box' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555' }, '&::-webkit-scrollbar-track': { background: 'transparent' } }}>
            <Typography variant="h6" mb={2} align="center">Assigned Tasks</Typography>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Box key={task.id} p={2} mb={2} bgcolor="#2f3136" borderRadius="8px" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `4px solid ${task.urgency === 'High' ? '#f44336' : task.urgency === 'Medium' ? '#ff9800' : '#4caf50'}`, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
                  <Box flex={1} mr={2}>
                    <Typography variant="body1" fontWeight="bold" color="#FFEB3B">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <Typography variant="body2" fontWeight="bold">Supporting Docs:</Typography>
                    <Typography variant="body2" mb={1}>{task.supportingDocs}</Typography>
                    <Typography variant="body2" fontWeight="bold">Assigned to:</Typography>
                    <Typography variant="body2" mb={1}>{task.assignedTo}</Typography>
                    <Typography variant="body2" fontWeight="bold">Urgency:</Typography>
                    <Typography variant="body2" mb={1}>{task.urgency}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" align="center">No tasks assigned.</Typography>
            )}
          </Box>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ overflowY: 'auto', 
                '&::-webkit-scrollbar': { width: '10px' }, 
                '&::-webkit-scrollbar-thumb': 
                { background: '#888', 
                borderRadius: '10px', 
                border: '3px solid transparent', 
                backgroundClip: 'padding-box' }, 
                '&::-webkit-scrollbar-thumb:hover': { background: '#555' }, 
                '&::-webkit-scrollbar-track': { background: 'transparent' } }}>
              <Typography variant="h6">Members</Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Add Members to Qube..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                sx={{ backgroundColor: 'primary', borderRadius: '4px' }}
              />
            </Box>
            {filteredMembers.length > 0 ? (
              <List component="nav">
                {filteredMembers.map((member) => (
                  <ListItem key={member._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar src={member.avatar_url} sx={{ mr: 2 }} />
                    <Typography variant="body1">{member.username}</Typography>
                  </ListItem>
                ))}
              </List>
            ) : (
              <>
                <Typography variant="body2" align="center" mb={2}>No members available in this Qube.</Typography>
                <Typography variant="h6" mb={2}>Add Results from Hub</Typography>
                {filteredHubMembers.length > 0 ? (
                  <List component="nav">
                    {filteredHubMembers.map((hubMember) => (
                      <ListItem key={hubMember._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar src={hubMember.avatar_url} sx={{ mr: 2 }} />
                        <Typography variant="body1">{hubMember.username}</Typography>
                        <IconButton color="primary" sx={{ ml: 2 }} onClick={() => handleQubeAdd(hubMember._id)}>
                          <AddIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" align="center">No members found in the hub.</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default QubeOverview;
