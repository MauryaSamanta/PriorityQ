import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import ListIcon from '@mui/icons-material/FormatListBulleted';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FolderIcon from '@mui/icons-material/Folder'; // Import Folder Icon
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const MessageWidget = ({ zone, message, setMessage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State for file preview URL or name
  const [file, setFile] = useState(null); // State for the actual file
  const [isImage, setIsImage] = useState(false); // State to track if the file is an image
  const [folderFiles, setFolderFiles] = useState([]); // State for selected folder files
  const [folderName, setFolderName] = useState(''); // State for folder name
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  const { _id, username, avatar_url } = useSelector((state) => state.user);

  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setAnchorEl(null);
  };

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
        file: null,
        reactions: null,
        zone: zone,
      };
      socket.emit('sendMessage', newMessage);
    } else if (folderFiles.length > 0) {
      const formData = new FormData();
      formData.append("text",message);
      formData.append("name_folder", folderName);
      folderFiles.forEach((folderFile) => {
        formData.append("files", folderFile);  // Append each file individually
      });
      formData.append("senderName", username);
      formData.append("senderAvatar", avatar_url);
      formData.append("sender_id", _id);
      formData.append("zone", zone);
      try {
        const result = await fetch(`http://localhost:3001/message/folder`, {
          method: "POST",
          body: formData,
        });
        const data = await result.json();
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
      try {
        const result = await fetch(`http://localhost:3001/message/file`, {
          method: "POST",
          body: formData,
        });
        const data = await result.json();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
    setMessage('');
    handleDeleteFile();
  };

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
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <IconButton component="span">
              <AttachFileIcon />
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
              <FolderIcon />
            </IconButton>
          </label>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Box mt={1}>
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
          fullWidth
          sx={{ ml: 2, mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={!message.trim() && !file && folderFiles.length === 0}
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleEmojiClose}>
        <MenuItem onClick={handleEmojiClose}>😊</MenuItem>
        <MenuItem onClick={handleEmojiClose}>😂</MenuItem>
        <MenuItem onClick={handleEmojiClose}>😍</MenuItem>
        {/* Add more emojis here */}
      </Menu>

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
            {folderFiles.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={sendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MessageWidget;
