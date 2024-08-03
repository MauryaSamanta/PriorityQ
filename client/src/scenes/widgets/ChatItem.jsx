import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ChatItem = ({ message, isOwnMessage }) => {
  const { text, senderAvatar, file, senderName, reactions } = message;

  const getSentimentColor = (text) => {
    // Simple sentiment analysis example: positive if text includes "good", negative if "bad"
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
        //ml={isOwnMessage ? 0 : 1}
        //mr={isOwnMessage ? 1 : 0}
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
        {file && (
          <Box mt={1} maxWidth="200px" maxHeight="200px" overflow="hidden" borderRadius="4px">
            <img src={file} alt="attachment" style={{ width: '100%', height: 'auto' }} />
          </Box>
        )}
        {text && <Typography variant="body1" sx={{ color: getSentimentColor(text) }}>{text}</Typography>}
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