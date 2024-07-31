import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ChatItem = ({ message, isOwnMessage }) => {
  const { text,senderAvatar,file,senderName,reactions} = message;
  
  const getSentimentColor = (text) => {
    // Simple sentiment analysis example: positive if text includes "good", negative if "bad"
    if (text.includes("good")) return '#4caf50'; // Green for positive
    if (text.includes("bad")) return '#f44336'; // Red for negative
    return '#9e9e9e'; // Grey for neutral
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Avatar src={senderAvatar || '/path/to/random/avatar.jpg'} />
        <Typography variant="body2" ml={1} fontWeight="bold">{senderName}</Typography>

      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        p={1}
        bgcolor={'primary' }
        color={ 'white'}
        maxWidth="60%"
        position="relative"
      >
        <Box>
          {file && (
            <Box mt={1} maxWidth="200px" maxHeight="200px" overflow="hidden" borderRadius="4px">
              <img src={file} alt="attachment" style={{ width: '100%', height: 'auto' }} />
            </Box>
          )}
          {text && <Typography variant="body2">{text}</Typography>}
          
        </Box>
        <Box
          display="flex"
          alignItems="center"
          position="absolute"
          right={0}
          top={0}
          height="100%"
          sx={{ transform: 'translateX(100%)' }}
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

// Example messages array


export default ChatItem;