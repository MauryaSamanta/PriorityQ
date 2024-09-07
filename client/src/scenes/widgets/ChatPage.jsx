import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Avatar,useMediaQuery, SwipeableDrawer } from '@mui/material';
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
  const {_id,username}=useSelector((state)=>state.user);
  const [showFiles,setshowfiles]=useState(false);
  const [wallpaper, setmainwall]=useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [lib,setlib]=useState(false);
  const [userTyping, setuserTyping]=useState('');
  const [type,settype]=useState(false);
  const openlib=(open)=>{
    setlib(open);
  }
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
    socket.on('UserTyping', (data) => {
      const { user, typing } = data;
      console.log(user);
      if (typing ) {
        // Show "user is typing" indicator
        setuserTyping(user);
        settype(true);
      } else {
        // Hide "user is typing" indicator
        setuserTyping('');
        settype(false);
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
        
          <Avatar src={friendAvatar} sx={{ marginRight: '1rem' }} />
          <Typography variant="h6">{friendName}</Typography>
          
          
          <Button varient="contained" sx={{
          zIndex: 10,
          backgroundColor: '#635acc',
          color: 'white',
          borderRadius: 2,
          padding: 1,
      
          '&:hover': {
            backgroundColor: '#4a4b9b',
          },
        }} onClick={openlib}>{!lib? "Open Library":"Close Library"}</Button>
       
        </Box>
        
      
      </Box>
      {lib && (
  
  <SwipeableDrawer
    anchor="right"
    open={lib}
    onClose={() => setlib(false)}
    onOpen={() => setlib(true)}
    disableSwipeToOpen={isNonMobileScreens}
    sx={{
      '& .MuiDrawer-paper': {
        position: 'absolute',
        top: 0,
        height: isNonMobileScreens ? '100%' : '100vh',
        width: '100%',
        backgroundColor: 'primary',
        boxShadow: 4,
        //padding: 2,
        zIndex: 5,
      },
    }}
  >
    <Button
    variant="contained"
    sx={{
      position: 'absolute',
      top: '50%',
      left: -55, // Adjust this value as needed to move the text further left
      transform: 'translateY(-50%) rotate(-90deg)',
      color: 'white',
      fontSize: '14px',
      cursor: 'pointer',
      userSelect: 'none',
    }}
    onClick={() => setlib(false)} // Optional: allow clicking the text to close the drawer
  >
    SWipe to Close 
  </Button>

    {isNonMobileScreens ? (
      <File wallpaper={wallpaper} setWallpaperMain={setmainwall} chat={chat}/>
    ) : (
      <MobileFile wallpaper={wallpaper} setWallpaperMain={setmainwall} chat={chat}/>
    )}
  </SwipeableDrawer>
)}
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
        {userTyping !== username && userTyping !== '' && (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Typography sx={{ fontWeight: 'bold', color: '#635acc' }}>
      {userTyping} is typing
    </Typography>
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#635acc',
          borderRadius: '50%',
          animation: 'typing 1.5s infinite',
        }}
      />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#635acc',
          borderRadius: '50%',
          animation: 'typing 1.5s infinite 0.2s',
        }}
      />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#635acc',
          borderRadius: '50%',
          animation: 'typing 1.5s infinite 0.4s',
        }}
      />
    </Box>
  </Box>
)}

<style>
  {`
    @keyframes typing {
      0% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0); }
    }
  `}
</style>
      </Box>
      <Box sx={{ mt: 2 }}>
        <MessageWidget qube={null} zone={chat} message={message} setMessage={setMessage} />
      </Box>
    </Box>
  );
};

export default ChatPage;
