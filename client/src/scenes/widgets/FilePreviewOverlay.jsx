import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FilePreviewOverlay = ({ file, onClose }) => {
  if (!file) return null;
 
  const renderFilePreview = () => {
    const fileType = file.file_url.split('.').pop().toLowerCase();
    let file_url=file.file_url;
    file_url.replace(".pdf",".jpg");
    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img src={file.file_url} alt={file.file_name} style={{ maxWidth: '100%', maxHeight: '100%' }} />;

      case 'mp4':
      case 'webm':
      case 'ogg':
        return (
          <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <source src={file.file_url} type={`video/${fileType}`} />
            Your browser does not support the video tag.
          </video>
        );

        case 'pdf':
            return (
              <iframe
                src={file.file_url}
                title={file.file_name}
                style={{ width: '100%', height: '100%' }}
              />
            );

      // Add other cases for different file types as needed
      default:
        return <Typography variant="body2" color="black">Preview not available for this file type.</Typography>;
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: '80%',
          height: '80%',
         // backgroundColor: '#fff',
          borderRadius: '8px',
          overflow: 'auto',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {file.file_name}
        </Typography>
        {renderFilePreview()}
      </Box>
    </Box>
  );
};

export default FilePreviewOverlay;
