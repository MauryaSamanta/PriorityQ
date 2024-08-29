import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FolderIcon from '@mui/icons-material/Folder';
import UserProfileDialog from 'scenes/Dialog/UserProfileDialog';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChatItem = ({ message, isOwnMessage, chat }) => {
  const { sender_id,text, senderAvatar, file, senderName, reactions, name_file, folder, name_folder } = message;
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatanchor, setchatanchor]=useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTick, setShowTick] = useState(false);  // New state for tick mark visibility
  const [userprof, setUserprof]=useState(false);
  const [user,setUser]=useState(null);
  const [userdialog,setUserdialog]=useState(false);
  const hubId = useParams();
  const token = useSelector((state) => state.token);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const opentextmenu=(event)=>{
    setchatanchor(event.currentTarget);
  }
  const closetextmenu = () => {
    setchatanchor(null);
  };
  const handleuserprof=()=>{
    setUserprof(true);
  }
  const handleuserprofclose=()=>{
    setUserprof(false);
  }

  const handleopenuser=()=>{
    getuser();
    setUserdialog(true);
  }
  const handlecloseuser=()=>{
    setUser(null);
    setUserdialog(false);
  }
  const saveToMyFiles = async () => {
    const fileData = {
      hub_id: hubId.hubId || chat,
      file_url: file,
      file_name: name_file,
      name_folder: name_folder,
      folder: folder
    };
    try {
      const response = await fetch(`https://surf-jtn5.onrender.com/file/new`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(fileData),
      });
      const data = await response.json();
      console.log(data);
      setShowTick(true); // Show tick mark after saving
      setTimeout(() => setShowTick(false), 2000); // Hide tick mark after 2 seconds
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };
  
  const deletemsg=async()=>{
    let messageid=message._id;
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/message/${message._id}`,{
        method:"DELETE"
      })
        
        
        setchatanchor(false);
        setIsHovered(false);
    } catch (error) {
      
    }
  }
  const getuser=async()=>{
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/users/${sender_id}`,{
        method:"GET"
      })
      const userdata=await response.json();
      setUser(userdata);
       console.log(user);
    } catch (error) {
      
    }
  }
  const handleHashtagClick = (hashtag) => {
    
  };

  const renderHighlightedMessage = (text) => {
    return text.split(/(#\w+)/g).map((part, index) =>
      part.match(/#\w+/) ? (
        <span
          key={index}
          style={{ color: '#854be3', cursor: 'pointer' }}
          onClick={() => handleHashtagClick(part)}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Box
      display="flex"
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      mb={2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar src={senderAvatar || '/path/to/random/avatar.jpg'} onClick={()=>{
        if(!isOwnMessage)
        handleopenuser()}}/>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isOwnMessage ? 'flex-end' : 'flex-start'}
        p={1}
        bgcolor="primary"
        color="white"
        borderRadius="8px"
        maxWidth="60%"
        position="relative"
      >
        <Box display="flex" alignItems="center">
          <Typography variant="body1" fontWeight="bold">{senderName}</Typography>
        </Box>
        <UserProfileDialog open={userdialog} onClose={handlecloseuser} user={user}/>
        {name_folder && (
          <Box
            mt={1}
            maxWidth="200px"
            maxHeight="200px"
            overflow="hidden"
            borderRadius="4px"
            position="relative"
            
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'parent',
              borderRadius: '8px',
            }}
          >
            <Box display="flex" alignItems="center">
              <FolderIcon sx={{ fontSize: 40, color: '#ff9800', mr: 1 }} />
              <Typography variant="body2" noWrap>
                {name_folder}
              </Typography>
            </Box>
            {isHovered && (
              <IconButton
                size="small"
                onClick={openMenu}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={saveToMyFiles}>Save to My Files</MenuItem>
              {isOwnMessage&& <MenuItem onClick={deletemsg} sx={{color:'#ed0e0e'}}>Delete Message</MenuItem>}
            </Menu>
            {showTick && (
              <CheckCircleIcon
                sx={{
                  position: 'absolute',
                  color: '#4caf50',
                  fontSize: 40,
                  opacity: 10,
                  animation: 'fadeInOut 2s ease-in-out',
                }}
              />
            )}
          </Box>
        )}

        {file && (
          <Box
            mt={1}
            maxWidth="200px"
            maxHeight="200px"
            overflow="hidden"
            borderRadius="4px"
            position="relative"
           
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {name_file?.endsWith('.pdf') ? (
              <Box display="flex" alignItems="center">
                <PictureAsPdfIcon sx={{ fontSize: 40, color: '#d32f2f', mr: 1 }} />
                <Typography variant="body2" noWrap>
                  {name_file}
                </Typography>
              </Box>
            ) : name_file?.endsWith('.docx') || name_file?.endsWith('.doc')? (
              <Box display="flex" alignItems="center">
                <PictureAsPdfIcon sx={{ fontSize: 40, color: '#d32f2f', mr: 1 }} />
                <Typography variant="body2" noWrap>
                  {name_file}
                </Typography>
              </Box>
              
            ):(
              <img src={file} alt="attachment" style={{ width: '100%', height: 'auto' }} />
            )}
            {isHovered && (
              <IconButton
                size="small"
                onClick={openMenu}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              
              <MenuItem onClick={saveToMyFiles}>Save to My Files</MenuItem>
              {isOwnMessage&& <MenuItem onClick={deletemsg} sx={{color:'#ed0e0e'}}>Delete Message</MenuItem>}
            </Menu>
            {showTick && (
              <CheckCircleIcon
                sx={{
                  position: 'absolute',
                  color: '#4caf50',
                  fontSize: 40,
                  opacity: 10,
                  animation: 'fadeInOut 2s ease-in-out',
                }}
              />
            )}
          </Box>
        )}

        { text && (
          <Box position="relative">
            <Typography variant="body1" >
              {renderHighlightedMessage(text)}
            </Typography>
            {isHovered && !file && folder.length===0 && isOwnMessage && (
              <IconButton
                size="small"
                onClick={opentextmenu}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              anchorEl={chatanchor}
              open={Boolean(chatanchor)}
              onClose={closetextmenu}
            >
              <MenuItem onClick={deletemsg} sx={{color:'#ed0e0e'}}>Delete Message</MenuItem>
            </Menu>
            
          </Box>
        )}


        
      </Box>
    </Box>
  );
};

export default ChatItem;
