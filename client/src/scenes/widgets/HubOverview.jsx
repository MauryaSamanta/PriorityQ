import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Divider, Button, ButtonBase, Avatar, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddMemberDialog from 'scenes/Dialog/AddMemberDialog';
import UserProfileDialog from 'scenes/Dialog/UserProfileDialog';
import FilePreviewOverlay from './FilePreviewOverlay';
import FilterIcon from '@mui/icons-material/Filter';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TopicIcon from '@mui/icons-material/Topic';
const HubOverview = ({ members, owner }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUserProfileDialogOpen, setIsUserProfileDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState(null);
  const [folder,setFolder]=useState(null);
  const { hubId, hubname } = useParams();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenDialog = async () => {
    const inviteBody = { hub_id: hubId };
    try {
      const response = await fetch(`https://surf-jtn5.onrender.com/invite/${hubId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCode(data.code);
      console.log(code);
    } catch (error) {
      console.error(error);
    }

    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsUserProfileDialogOpen(true);
  };

  const handleUserProfileDialogClose = () => {
    setIsUserProfileDialogOpen(false);
    setSelectedMember(null);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleCloseFilePreview = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/file/${hubId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        const files = await response.json();
    
        // Sorting the files array
        const sortedFiles = files.sort((a, b) => {
          if (a.name_folder && !b.name_folder) return -1; // a comes first
          if (!a.name_folder && b.name_folder) return 1;  // b comes first
          return 0; // leave the order unchanged if both have or both don't have name_folder
        });
    
        setFiles(sortedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    
    getFiles();
  }, [hubId, token]);

  return (
    <Box display="flex" width="100%" height="100%" p={2} bgcolor="#36393f">
      {/* Members List */}
      <Divider orientation="vertical" flexItem />
      {/* Files Overview */}
      
      <Box width="75%" bgcolor="#40444b" color="white" p={2} display="flex" flexDirection="column" borderRadius="8px"
       sx={{ 
        overflowY: 'auto', 
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '10px',
          border: '3px solid transparent',
          backgroundClip: 'padding-box',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
      }}
      >
        {/* <Typography variant="h6"  mb={2}>{hubname}</Typography> */}
        {folder?(<Typography variant="h6" mb={2} align="center">{folder.name_folder}</Typography>)
        :(<Typography variant="h6" mb={2} align="center">My Files</Typography>)}
        {folder?(<Button sx={{color:"gray"}} onClick={()=>setFolder(null)}>Back to My Files</Button>):(<></>)}
        {!folder?(<Box
          sx={{ 
            overflowY: 'auto', 
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
              border: '3px solid transparent',
              backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
          }}
        >
        {files.length > 0 ? (
        files.map((file) => (
    file.name_folder ? (
      <Box
        key={file._id}
        p={2}
        mb={2}
        bgcolor="#2f3136"
        borderRadius="8px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setFolder(file)}
      >
        <Box display="flex" alignItems="center">
         <TopicIcon/>
          <Typography variant="body1" fontWeight="bold">
            {file.name_folder}
          </Typography>
        </Box>
        <IconButton color="primary" edge="end">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    ) : (
      <Box
        key={file._id}
        p={2}
        mb={2}
        bgcolor="#2f3136"
        borderRadius="8px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => handleFileClick(file)}
      >
        <Box display="flex">
          {file.file_url.split('.').pop().toLowerCase()==='jpg'||file.file_url.split('.').pop().toLowerCase()
          ==='jpeg'||file.file_url.split('.').pop().toLowerCase()==='png'?(<FilterIcon/>)
          :(<PictureAsPdfIcon/>)}
          <Typography variant="body1" fontWeight="bold">
            {file.file_name}
          </Typography>
        </Box>
        <IconButton color="primary" edge="end">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    )
  ))
) : (
  <Typography variant="body2" align="center">
    No files available.
  </Typography>
)}

        </Box>):(
          <Box
          sx={{ 
            overflowY: 'auto', 
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
              border: '3px solid transparent',
              backgroundClip: 'padding-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
          }}
        >
        {folder.folder.length > 0 ? (
        folder.folder.map((file) => (
          <Box
          key={file._id}
          p={2}
          mb={2}
          bgcolor="#2f3136"
          borderRadius="8px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => handleFileClick(file)}
        >
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {file.file_name}
            </Typography>
          </Box>
          <IconButton color="primary" edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      
    
  ))
) : (
  <Typography variant="body2" align="center">
    No files available.
  </Typography>
)}

        </Box>

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
              backgroundColor: 'primary',
              color: '#2f3136',
              
            }}
            onClick={handleOpenDialog}
          >
            Add Member
          </Button>
        </Box>
        {members ? (
          <List component="nav">
            {members.map((member) => (
              <ButtonBase key={member._id} sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 1 }} onClick={() => handleMemberClick(member)}>
                <ListItem sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Avatar src={member.avatar_url} sx={{ mr: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>{member.username}</Typography>
                    {owner === member._id && (
                      <Typography variant="body2" sx={{ color: 'gray', ml: 2 }}>Owner</Typography>
                    )}
                  </Box>
                </ListItem>
              </ButtonBase>
            ))}
          </List>
        ) : null}
        <AddMemberDialog open={isDialogOpen} onClose={handleCloseDialog} code={code} />
        <UserProfileDialog open={isUserProfileDialogOpen} onClose={handleUserProfileDialogClose} user={selectedMember} />
      </Box>

      {/* File Preview Overlay */}
      {selectedFile && <FilePreviewOverlay file={selectedFile} onClose={handleCloseFilePreview} />}
    </Box>
  );
};

export default HubOverview;
