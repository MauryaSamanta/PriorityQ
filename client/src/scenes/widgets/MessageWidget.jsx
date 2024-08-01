import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Menu, MenuItem } from '@mui/material';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import ListIcon from '@mui/icons-material/FormatListBulleted';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pause } from '@mui/icons-material';
import { VolumeUp } from '@mui/icons-material';
import { VolumeDown } from '@mui/icons-material';
import { Replay } from '@mui/icons-material';
import { PlayArrow } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import  io  from 'socket.io-client';
const socket = io('https://surf-jtn5.onrender.com');

const MessageWidget = ({message, setMessage}) => {
  //message='';
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const {username, avatar_url}=useSelector((state)=>state.user);
  //const [message,setMessage]=useState('');
  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    console.log(files);
  };
  const sendMessage = () => {
    const text=message;
    message={text:message, senderName:username, senderAvatar:avatar_url, file:null, reactions:null};
    if(message!='')
    socket.emit('sendMessage', message);
    setMessage('');
  };
  const handleVoiceRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        
        recorder.start();
        setIsRecording(true);

        const chunks = [];
        recorder.addEventListener("dataavailable", event => {
          chunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          setAudioUrl(URL.createObjectURL(audioBlob));
        });
      } catch (error) {
        console.error("Error accessing the microphone:", error);
      }
    } else {
      if (isRecording) {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    }
  };

  const handleDeleteAudio = () => {
    setAudioBlob(null);
    setAudioUrl(null);
  };

  return (
    <Box alignItems="center" p={2} bgcolor="primary" borderRadius="8px" borderColor="primary.main" border={1} sx={{borderColor:"primary"}}>
      <IconButton>
        <BoldIcon />
      </IconButton>
      <IconButton>
        <ItalicIcon />
      </IconButton>
      <IconButton>
        <ListIcon />
      </IconButton>
      <IconButton onClick={handleEmojiClick}>
        <EmojiIcon />
      </IconButton>
      <input
        accept="image/*,video/*"
        style={{ display: 'none' }}
        id="file-upload"
        multiple
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <IconButton component="span">
          <AttachFileIcon />
        </IconButton>
      </label>
      {/* <IconButton onClick={handleVoiceRecord}>
        <MicIcon color={isRecording ? 'secondary' : 'inherit'} />
      </IconButton> */}
      <Box display="flex">
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          fullWidth
          sx={{ ml: 2, mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage} disabled={!message.trim()}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            transition: 'opacity 0.5s',
            opacity: 0,
          },
          '&:hover::before': {
            opacity: 0.2,
          }
          
        }}>Send</Button>
      </Box>
      {audioUrl && (
  <Box display="flex" alignItems="center" mt={2} p={1} borderRadius="8px" bgcolor="background.paper" boxShadow={3}>
    <audio controls src={audioUrl} style={{ display: 'none' }} id="custom-audio-player" />
<Box display="flex" alignItems="center">
  <IconButton onClick={() => document.getElementById('custom-audio-player').play()} color="primary">
    <PlayArrow />
  </IconButton>
  <IconButton onClick={() => document.getElementById('custom-audio-player').pause()} color="primary">
    <Pause />
  </IconButton>
  <IconButton onClick={() => document.getElementById('custom-audio-player').volume = Math.min(1, document.getElementById('custom-audio-player').volume + 0.1)} color="primary">
    <VolumeUp />
  </IconButton>
  <IconButton onClick={() => document.getElementById('custom-audio-player').volume = Math.max(0, document.getElementById('custom-audio-player').volume - 0.1)} color="primary">
    <VolumeDown />
  </IconButton>
  {/* <IconButton onClick={() => document.getElementById('custom-audio-player').currentTime = 0} color="primary">
    <Replay />
  </IconButton> */}
  {/* <Box flex={1} ml={2} bgcolor="background.paper" borderRadius="4px" height="5px" width="100%">
    <Box
      sx={{
        height: '100%',
        width: `${(document.getElementById('custom-audio-player').currentTime / document.getElementById('custom-audio-player').duration) * 100}%`,
        bgcolor: 'primary.main',
        borderRadius: '4px',
        transition: 'width 0.1s'
      }}
    />
  </Box> */}
</Box>
    <IconButton onClick={handleDeleteAudio} color="secondary" sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
      <DeleteIcon sx={{ color: 'error.main' }} />
    </IconButton>
  </Box>
)}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleEmojiClose}
      >
        <MenuItem onClick={handleEmojiClose}>😊</MenuItem>
        <MenuItem onClick={handleEmojiClose}>😂</MenuItem>
        <MenuItem onClick={handleEmojiClose}>😍</MenuItem>
        {/* Add more emojis here */}
      </Menu>
    </Box>
  );
};

export default MessageWidget;