import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Avatar,useMediaQuery, Slide } from '@mui/material';
import ChatItem from './ChatItem'; // Assuming ChatItem component is already defined
import MessageWidget from './MessageWidget'; // Assuming MessageWidget component is already defined
import File from './File';
import MobileFile from './MobileFile';
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
  const [showFiles,setshowfiles]=useState(false);
  const [wallpaper, setmainwall]=useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

const toggleButtonVisibility = () => {
  setIsButtonVisible(!isButtonVisible);
  if (!showFiles) {
    setTimeout(() => {
      setIsButtonVisible(false);
    }, 3000); 
  }
};
  const handletogglefiles=()=>{
    if(showFiles)
      setIsButtonVisible(false);
    setshowfiles(!showFiles);

  }
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
      height={isNonMobileScreens?"630px":"90vh"}
      borderRadius="10px"
      padding='6px'
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <Avatar src={friendAvatar} sx={{ marginRight: '1rem' }} />
          <Typography variant="h6">{friendName}</Typography>
        </Box>
        <Button
        onClick={() => {
          if(!isButtonVisible)
          toggleButtonVisibility();
          else
          handletogglefiles();
          
        }}
        sx={{
          position: 'fixed',
          right: isButtonVisible ? 16 : -30,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: '#635acc',
          color: 'white',
          borderRadius: 2,
          padding: 1,
          minWidth: 0,
          width: 40,
          height: 80,
          transition: 'right 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#4a4b9b',
          },
        }}
      >
        <Typography variant="body2" sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {showFiles ? 'Out Of Library' : 'Go To Library'}
        </Typography>
      </Button>
      <Slide direction="left" in={showFiles} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            height: isNonMobileScreens?'100%':'100vh',
            left: showFiles ? 0 : '-100%',
            width: '100%',
            backgroundColor: 'primary',
            boxShadow: 4,
            padding: 2,
           // overflowY: 'auto',
            zIndex: 5,
            transition: 'left 1.0s ease',
          }}
        >
          {isNonMobileScreens?(<File wallpaper={wallpaper} setWallpaperMain={setmainwall} chat={chat} />
          ):(
            <MobileFile wallpaper={wallpaper} setWallpaperMain={setmainwall} chat={chat}/>
          )}
        </Box>
      </Slide>
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
          <ChatItem key={index} message={message} isOwnMessage={message.sender_id === _id} chat={chat}/>
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
