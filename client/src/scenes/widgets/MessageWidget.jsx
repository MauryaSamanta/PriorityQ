import React, { useState,useRef, useEffect } from 'react';
import { Box, TextField, Button, IconButton, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, 
  List, ListItem, ListItemText, CircularProgress, SwipeableDrawer } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FolderIcon from '@mui/icons-material/Folder'; // Import Folder Icon
import DeleteIcon from '@mui/icons-material/Delete';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import FileDialog from 'scenes/Dialog/FileDialog';
import CustomAudioPlayer from './CustomAudioPlayer';
import RecordingComponent from './RecordingComponent';
import ScheduleMessageDialog from 'scenes/Dialog/ScheduleMessageDialog';
const socket = io('https://surf-jtn5.onrender.com');

const MessageWidget = ({ qube, zone, message, setMessage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State for file preview URL or name
  const [file, setFile] = useState(null); // State for the actual file
  const [isImage, setIsImage] = useState(false); // State to track if the file is an image
  const [folderFiles, setFolderFiles] = useState([]); // State for selected folder files
  const [folderName, setFolderName] = useState(''); // State for folder name
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [shareOpen, setshareOpen]=useState(false);
  const [filetoshare,setfiletoshare]=useState(null);
  const { _id, username, avatar_url } = useSelector((state) => state.user);
  const [poll, setpoll]=useState(false);
  const [progress,setprogress]=useState(true);
  const typingTimeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audio,setaudio]=useState(null);
  const [sched,setsched]=useState(false);
  const [tagsuggestions,settagsuggestions]=useState(false);
  const timerRef = useRef(null);
  const allNames = ["John", "Doe", "Alice", "Bob"];
  const handleschedmsg=()=>{
    setsched(true);
  }
  const handleshareOpen=()=>{
    setshareOpen(true);
  }
  const handleshareClose=()=>{
    setshareOpen(false);
  }
  const handlefileshare=(file)=>{

    setfiletoshare(file);
    if(file.file_url && file.file_url.split('.').pop().toLowerCase() === 'pdf')
    {
      setFilePreview(filetoshare.file_name);
      setIsImage(false);
    }
    else if(file.file_url)
    {
      setFilePreview(filetoshare.file_url);
      setIsImage(true);
    }
    else if(file.name_folder){
      setFilePreview(filetoshare.name_folder);
    }
    console.log(filetoshare);
    handleshareClose();
  }
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const fileType = uploadedFile.type;
      if (fileType.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(uploadedFile));
        setIsImage(true);
      } else if (fileType === "application/pdf") {
        setFilePreview(uploadedFile.name);
        setIsImage(false);
      } else {
        setFilePreview(uploadedFile.name);
        setIsImage(false);
      }
      setFile(uploadedFile);
    }
  };

  const handleFolderUpload = (event) => {
    const selectedFiles = Array.from(event.target.files).slice(0, 10); // Limit to 10 files
    setFolderFiles(selectedFiles);
    setOpenDialog(true); // Open the dialog to show selected files and folder name input
  };

  const handleDeleteFile = () => {
    setFilePreview(null);
    setFile(null);
    setIsImage(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFolderFiles([]);
    setFolderName('');
  };

  const sendMessage = async () => {
    if (!file && folderFiles.length === 0 && !audio) {
      const newMessage = {
        text: message,
        senderName: username,
        senderAvatar: avatar_url,
        sender_id: _id,
        name_file:filetoshare?.file_name,
        file: filetoshare?.file_url,
        folder:filetoshare?.folder,
        name_folder:filetoshare?.name_folder,
        reactions: null,
        zone: zone,
        qube:qube
      };
      console.log(qube);
      socket.emit('sendMessage', newMessage);
    } else if (folderFiles.length > 0) {
      const formData = new FormData();
      setprogress(false);
      formData.append("text",message);
      formData.append("name_folder", folderName);
      folderFiles.forEach((folderFile) => {
        formData.append("files", folderFile);  // Append each file individually
      });
      formData.append("senderName", username);
      formData.append("senderAvatar", avatar_url);
      formData.append("sender_id", _id);
      formData.append("zone", zone);
      formData.append("qube",qube);
      try {
        const result = await fetch(`https://surf-jtn5.onrender.com/message/folder`, {
          method: "POST",
          body: formData,
        });
        const data = await result.json();
        setprogress(true);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      handleDialogClose();
    } else if(audio){
      console.log("hello");
       const formData=new FormData();
       formData.append("senderName", username);
      formData.append("senderAvatar", avatar_url);
      formData.append("sender_id", _id);
      formData.append("audio", audio);
      formData.append("zone", zone);
      formData.append("qube",qube);
      setprogress(false);
      try {
        const result=await fetch(`https://surf-jtn5.onrender.com/message/audio`,{
          method:"POST",
          body:formData
        });
        const data=await result.json();
        setprogress(true);
        setAudioURL('');
        setaudio(null);
      } catch (error) {
        
      }
    } 
    else {
      //console.log("hello");
      const formData = new FormData();
      formData.append("text", message);
      formData.append("senderName", username);
      formData.append("senderAvatar", avatar_url);
      formData.append("sender_id", _id);
      formData.append("file", file);
      formData.append("zone", zone);
      formData.append("qube",qube);
      setprogress(false);
      try {
        const result = await fetch(`https://surf-jtn5.onrender.com/message/file`, {
          method: "POST",
          body: formData,
        });
        const data = await result.json();
        setprogress(true);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
    setMessage('');
    handleDeleteFile();
  };

  // Function to render the message with highlighted hashtags
  const renderHighlightedMessage = (text) => {
    const parts = text?.split(/(#\w+)/g); // Split the text into parts using regex to match hashtags
    return parts?.map((part, index) =>
      part.startsWith('#') ? (
        <span key={index} style={{ color: '#1E90FF', fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
        <span key={index} style={{ color: 'white' }}>
          {part}
        </span>
      )
    );
  };
  const handleopenpoll=()=>{
    setpoll(true);
  }
  const handleclosepoll=()=>{
    setpoll(false);
  }

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if(e.target.value==='#')
    {
      settagsuggestions(true);
      console.log(tagsuggestions);
    }
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('StartType', { sender_name: username, qube, zone });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('StopType', { sender_name: username, qube, zone });
    }, 2000); // 3 seconds of inactivity
  };

     
  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
        setRecordingTime(0);

        recorder.ondataavailable = (e) => {
          const audioBlob = new Blob([e.data], { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
          setaudio(audioBlob);
          // /console.log(audio);
          // Handle uploading the audioBlob if needed
        };

        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    } else {
      console.error("getUserMedia not supported on your browser!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);
  useEffect(() => {
    if (audio) {
      console.log(audio); // This will log the audioBlob when it's set
    }
  }, [audio]);
  

  return (
    <Box
      alignItems="center"
      p={2}
      bgcolor="primary"
      borderRadius="8px"
      borderColor="primary.main"
      border={1}
      sx={{ borderColor: 'primary' }}
    >
      {!filePreview && folderFiles.length === 0 ? (
        <Box>
          <input
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <IconButton component="span">
              <AttachFileIcon sx={{
      '&:hover': {
        color: '#f5a442', // Change this to your desired color
      }}} />
            </IconButton>
          </label>
          <input
            multiple
            style={{ display: 'none' }}
            id="folder-upload"
            type="file"
            onChange={handleFolderUpload}
          />
          <label htmlFor="folder-upload">
            <IconButton component="span">
              <FolderIcon sx={{
      '&:hover': {
        color: '#c4ad12', // Change this to your desired color
      }}}/>
            </IconButton>
          </label>
          
          
            <IconButton component="span" onClick={handleshareOpen}>
              <CloudCircleIcon sx={{
      '&:hover': {
        color: '#3486eb', // Change this to your desired color
      }}}/>
            </IconButton>
            <IconButton 
            component="span" 
            onClick={() => {
              if (!isRecording) {
                startRecording();
              } else {
                stopRecording();
              }
            }}
          >
            <GraphicEqIcon sx={{
              '&:hover': {
                color: '#3486eb',
              }
            }}/>
          </IconButton>
          <IconButton 
            component="span" 
            onClick={handleschedmsg}
          >
            <ScheduleIcon sx={{
              '&:hover': {
                color: '#3486eb',
              }
            }}/>
          </IconButton>
          <ScheduleMessageDialog open={sched} handleClose={()=>setsched(false)} qube={qube} zone={zone} message={message} setMessage={setMessage}/>
          <FileDialog open={shareOpen} onClose={handleshareClose} handlefileshare={handlefileshare}/>
          
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Box mt={1} position="relative">
          {!progress && (
      <CircularProgress
        size={45} // Adjust size as needed
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />
    )}
            {isImage ? (
              <img
                src={filePreview}
                alt="file preview"
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', margin: '0 16px' }}
              />
            ) : (
              <Typography variant="body1" sx={{ margin: '0 16px' }}>
                {filePreview}
              </Typography>
            )}
            {!filePreview && folderFiles.length === 0 && (<Typography variant="body1" sx={{ margin: '0 16px' }}>
                Folder
              </Typography>)}
          </Box>
          <IconButton onClick={handleDeleteFile} color="secondary" sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
            <DeleteIcon sx={{ color: 'error.main' }} />
          </IconButton>
        </Box>
      )}
      <Box display="flex">
      {isRecording ? (
        <Box display="flex" alignItems="center" ml={2} mr={2}>
          <RecordingComponent stopRecording={stopRecording}/>
        </Box>
      ) : audioURL ? (
        <Box display="flex" alignItems="center" ml={2} mr={2}>
         <CustomAudioPlayer audioURL={audioURL} recording={true}/>
          <IconButton onClick={()=>{setaudio(null); setAudioURL('');}}><DeleteIcon/></IconButton>
        </Box>
      ) : (
        
        
          <TextField
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            multiline
            fullWidth
            sx={{ ml: 2, mr: 2 }}
          /> 
         
          
          
      )}
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={!message.trim() && !file && folderFiles.length === 0 && !filetoshare && !audio}
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
              },
            }}
          >
            Send
          </Button>
        </Box>
      
      

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Upload Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <List>
            {folderFiles.map((folderFile, index) => (
              <ListItem key={index}>
                <ListItemText primary={folderFile.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendMessage} color="primary" disabled={!folderName.trim()}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MessageWidget;
