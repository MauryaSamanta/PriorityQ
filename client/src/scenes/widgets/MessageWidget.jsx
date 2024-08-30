import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, 
  List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FolderIcon from '@mui/icons-material/Folder'; // Import Folder Icon
import DeleteIcon from '@mui/icons-material/Delete';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import FileDialog from 'scenes/Dialog/FileDialog';

const socket = io('http://localhost:3001');

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
    if (!file && folderFiles.length === 0) {
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
        const result = await fetch(`http://localhost:3001/message/folder`, {
          method: "POST",
          body: formData,
        });
        const data = await result.json();
        setprogress(true);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      handleDialogClose();
    } else {
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
        const result = await fetch(`http://localhost:3001/message/file`, {
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
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          fullWidth
          sx={{ ml: 2, mr: 2 }}
          
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={!message.trim() && !file && folderFiles.length === 0 && !filetoshare}
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
