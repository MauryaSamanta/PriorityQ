import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FolderIcon from '@mui/icons-material/Folder';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChatItem = ({ message, isOwnMessage }) => {
  const { text, senderAvatar, file, senderName, reactions, name_file, folder, name_folder } = message;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTick, setShowTick] = useState(false);  // New state for tick mark visibility
  const hubId = useParams();
  const token = useSelector((state) => state.token);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const saveToMyFiles = async () => {
    const fileData = {
      hub_id: hubId.hubId,
      file_url: file,
      file_name: name_file,
      name_folder:name_folder,
      folder:folder
    };
    try {
      const response = await fetch(`http://localhost:3001/file/new`, {
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

  const getSentimentColor = (text) => {
    if (text.includes("good")) return '#4caf50'; // Green for positive
    if (text.includes("bad")) return '#f44336'; // Red for negative
    return '#9e9e9e'; // Grey for neutral
  };

  return (
    <Box
      display="flex"
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      mb={2}
    >
      <Avatar src={senderAvatar || '/path/to/random/avatar.jpg'} />
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

        {name_folder && (
          <Box
            mt={1}
            maxWidth="200px"
            maxHeight="200px"
            overflow="hidden"
            borderRadius="4px"
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'parent',
              //p: 2,
              //border: '1px solid #ccc',
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {name_file?.endsWith('.pdf') ? (
              <Box display="flex" alignItems="center">
                <PictureAsPdfIcon sx={{ fontSize: 40, color: '#d32f2f', mr: 1 }} />
                <Typography variant="body2" noWrap>
                  {name_file}
                </Typography>
              </Box>
            ) : (
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

        {text && (
          <Typography variant="body1" sx={{ color: getSentimentColor(text) }}>
            {text}
          </Typography>
        )}

        <Box
          display="flex"
          alignItems="center"
          position="absolute"
          right={isOwnMessage ? 'auto' : 0}
          left={isOwnMessage ? 0 : 'auto'}
          top={0}
          height="100%"
          sx={{ transform: isOwnMessage ? 'translateX(-100%)' : 'translateX(100%)' }}
        >
          {reactions && reactions.map((reaction, index) => (
            <IconButton key={index} size="small" color="inherit">
              {reaction.type === 'like' ? <ThumbUpIcon /> : <ThumbDownIcon />}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatItem;
