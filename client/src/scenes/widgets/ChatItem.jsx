import React, { useState } from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
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
import ChatAudioPlayer from './ChatAudioPlayer';
import RecordingComponent from './RecordingComponent';
import CustomAudioPlayer from './CustomAudioPlayer';

const ChatItem = ({ message, isOwnMessage, chat, setMessage }) => {
  const { sender_id,text,voice, senderAvatar, file, senderName, reactions, name_file, folder, name_folder } = message;
  // if(voice)
  //   console.log(voice);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatanchor, setchatanchor]=useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTick, setShowTick] = useState(false);  // New state for tick mark visibility
  const [userprof, setUserprof]=useState(false);
  const [user,setUser]=useState(null);
  const [userdialog,setUserdialog]=useState(false);
  const hubId = useParams();
  const token = useSelector((state) => state.token);
  const [isClicked,setclicked]=useState(false);
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
    setMessage(hashtag);
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

  const formatMessageTime = (createdAt) => {
    console.log(createdAt);
    const messageDate = parseISO(createdAt);
    const now = new Date();
  
    if (isToday(messageDate)) {
      return format(messageDate, 'hh:mm a'); // Format for today: 01:30 pm
    } else if (isYesterday(messageDate)) {
      return `Yesterday ${format(messageDate, 'hh:mm a')}`; // If message was sent yesterday
    } else {
      return format(messageDate, 'MMM dd hh:mm a'); // Format for other dates: Aug 07 01:30 pm
    }
  };

  return (
    
    <Box
      display="flex"
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      mb={2}
      sx={{
        cursor:'default'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       
      {senderName!=='EloKo'&&(<Avatar src={senderAvatar || '/path/to/random/avatar.jpg'} onClick={()=>{
        if(!isOwnMessage && senderName!=='EloKo')
        handleopenuser()}}
        
        />)}
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
        {isOwnMessage?(<Box display="flex" alignItems="center">
        
        <Typography variant="caption" mr={1}>
            {formatMessageTime(message.createdAt)}
          </Typography>
          <Typography variant="body1" fontWeight="bold">{senderName}</Typography>
          
        </Box>):(<Box display="flex" alignItems="center">
          <Typography variant="body1" fontWeight="bold">{senderName}</Typography>
          <Typography variant="caption" ml={1}>
            {formatMessageTime(message.createdAt)}
          </Typography>
        </Box>)}
        <UserProfileDialog open={userdialog} onClose={handlecloseuser} user={user}/>
        
        {name_folder && (
  <Tooltip
    title="Save to My Library to view it"
    arrow
    open={isClicked}
    onClick={()=>setclicked(true)}
    onClose={()=>setclicked(false)}
    onClickOutside={() => setclicked(false)}
    sx={{
      fontSize: '12px',
      bgcolor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      
    }}
  >
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
        outline: 'none',
        cursor: 'pointer', // Add pointer cursor to indicate it's clickable
        '&:focus': {
      outline: 'none', // Ensure the focus outline is removed
       },
       '&:focus-visible': {
      outline: 'none', // For cases where focus-visible applies
    },
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
        <MenuItem onClick={saveToMyFiles}>Save to My Library</MenuItem>
        {isOwnMessage && (
          <MenuItem onClick={deletemsg} sx={{ color: '#ed0e0e' }}>Delete Message</MenuItem>
        )}
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
  </Tooltip>
)}

        {file && (
          <Tooltip
          title="Save to My Library to view it"
          arrow
          open={isClicked}
          onClick={()=>setclicked(true)}
          onClose={()=>setclicked(false)}
          onClickOutside={() => setclicked(false)}
          sx={{
            fontSize: '12px',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            
          }}
        >
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
              
              <MenuItem onClick={saveToMyFiles}>Save to My Library</MenuItem>
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
          </Tooltip>
        )}

        {( text || voice )&& (
          <Box position="relative">
            {text && <Typography variant="body1" paragraph fontSize="15px" sx={{ whiteSpace: 'pre-line' }}>
              {renderHighlightedMessage(text)} 
            </Typography>}
            {voice && (<CustomAudioPlayer audioURL={voice}/>)}
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
                  zIndex: 10,
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
