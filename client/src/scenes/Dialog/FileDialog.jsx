import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button, InputBase, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import FolderIcon from '@mui/icons-material/Folder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useSelector } from 'react-redux';

const FileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  
}));

const FileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FileIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(2),
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.primary,
}));

const DarkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const FileDialog = ({ open, onClose, handlefileshare }) => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const {_id}=useSelector((state)=>state.user);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/file/${_id}`, {
          method: 'POST'
        });
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (open) {
      fetchFiles();
    }
  }, [open]);

  const filteredFiles = files?.filter(file => 
    (file?.file_name||file?.name_folder).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileClick = (file) => {
    // Handle file click logic here
    console.log(file);
    handlefileshare(file);
    onClose();
    // For example, you could open the file, or show more details
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'image':
        return <ImageIcon />;
      case 'folder':
        return <FolderIcon />;
      default:
        return <AttachFileIcon />;
    }
  };

  return (
    <DarkDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
        Your Files and Folders
      </DialogTitle>
      <DialogContent>
        <SearchContainer>
          <SearchInput
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </SearchContainer>
        <Box sx={{
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
    }}>
        <FileContainer >
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <FileItem key={file._id} onClick={() => handleFileClick(file)}>
                <FileIcon>{renderIcon(file.type)}</FileIcon>
                <Typography variant="body1" fontWeight="bold">
                  {file.file_name? file.file_name:file.name_folder}
                </Typography>
              </FileItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No files or folders found.
            </Typography>
          )}
        </FileContainer>
        </Box>
      </DialogContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </DarkDialog>
  );
};

export default FileDialog;
