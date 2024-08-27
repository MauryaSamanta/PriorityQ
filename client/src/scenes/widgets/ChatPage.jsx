import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Avatar,useMediaQuery } from '@mui/material';
import ChatItem from './ChatItem'; // Assuming ChatItem component is already defined
import MessageWidget from './MessageWidget'; // Assuming MessageWidget component is already defined
import  io  from 'socket.io-client';
import { useSelector } from 'react-redux';
const socket = io('https://surf-jtn5.onrender.com');
const ChatPage = ({ chat,friendId, friendName, friendAvatar }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const {_id}=useSelector((state)=>state.user);
  const joinChat=async()=>{
    socket.emit('joinZone',chat);
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/message/${chat}`,{
        method:"GET"
      });
      const data=await response.json();
      setMessages(data);
    } catch (error) {
      
    }

  }
  // Fetch messages for this DM
  useEffect(() => {
    

    joinChat();
    socket.on('receiveMessage', (message) => {
      console.log("ok");
      if (!messages.some(m => m._id === message._id)) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      
    });
    return () => {
      socket.off('receiveMessage');
      socket.emit('exitZone',chat);
    };

    return()=>{
      
    }
  },[chat]);

  //Scroll to the bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  return (
    
    <Box
      width="100%"
      bgcolor="primary"
      display="flex"
      flexDirection="column"
      height={isNonMobileScreens?"630px":"100vh"}
      borderRadius="10px"
      padding='6px'
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <Avatar src={friendAvatar} sx={{ marginRight: '1rem' }} />
          <Typography variant="h6">{friendName}</Typography>
        </Box>
      </Box>

      <Box
            flexGrow={1}
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
          <Box p={2} bgcolor="primary" borderRadius="8px" ref={containerRef}>
          <Typography variant="h5">Conversation with {friendName}</Typography>
          </Box>
        {messages?.map((message, index) => (
          <ChatItem key={index} message={message} isOwnMessage={message.sender_id === _id} />
        ))}
        <div ref={bottomRef} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <MessageWidget qube={null} zone={chat} message={message} setMessage={setMessage} />
      </Box>
    </Box>
  );
};

export default ChatPage;
