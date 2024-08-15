import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TopicIcon from '@mui/icons-material/Topic';
import FilterIcon from '@mui/icons-material/Filter';
import FilePreviewOverlay from './FilePreviewOverlay';
import Draggable from 'react-draggable';

const File = ({ members, owner }) => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState(null);
  const { hubId } = useParams();
  const token = useSelector((state) => state.token);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleCloseFilePreview = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/file/${hubId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        const files = await response.json();
    
        // Sorting the files array
        const sortedFiles = files.sort((a, b) => {
          if (a.name_folder && !b.name_folder) return -1; // a comes first
          if (!a.name_folder && b.name_folder) return 1;  // b comes first
          return 0; // leave the order unchanged if both have or both don't have name_folder
        });
    
        setFiles(sortedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    
    getFiles();
  }, [hubId, token]);

  // Split files or folder content into columns with a maximum of 5 items per column
  const displayedFiles = folder ? folder.folder : files;
  const columns = [];
  const maxItemsPerColumn = 5;

  for (let i = 0; i < displayedFiles.length; i += maxItemsPerColumn) {
    columns.push(displayedFiles.slice(i, i + maxItemsPerColumn));
  }

  // Function to handle the position after drag
  const handleStop = (file, e, position) => {
    const { x, y } = position;
    const fileKey = `${hubId}-${file._id}`;
    localStorage.setItem(fileKey, JSON.stringify({ x, y }));
    console.log(`File ${file.file_name || file.name_folder} moved to X: ${x}, Y: ${y}`);
  };

  // Retrieve saved positions and apply them
  const getSavedPosition = (file) => {
    const fileKey = `${hubId}-${file._id}`;
    const savedPosition = localStorage.getItem(fileKey);
    return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0 };
  };

  return (
    <Box 
      display="flex" 
      width="100%" 
      height="100%" 
      p={2} 
      sx={{
        backgroundImage: 'url(https://res.cloudinary.com/df9fz5s3o/image/upload/v1723274804/samples/coffee.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      borderRadius={3}
    >
      {/* Files Overview */}
      <Box 
        width="100%" 
        height="100%"
        color="white" 
        p={2} 
        display="flex" 
        flexDirection="column" 
        borderRadius="8px"
        sx={{ 
          overflowY: 'auto',
          position: 'relative',
          padding: '20px',
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
        <Typography variant="h6" mb={2} align="center">
          {folder ? folder.name_folder : 'Library'}
        </Typography>

        {folder && (
          <Button sx={{ color: "gray", marginBottom: '20px' }} onClick={() => setFolder(null)}>
            Back to Library
          </Button>
        )}

        <Box
          display="grid"
          gridTemplateColumns={`repeat(${columns.length}, 100px)`} // Adjust number of columns based on files
          sx={{
            position: 'relative',
            minHeight: '100%',
          }}
        >
          {columns.map((column, colIndex) => (
            <Box key={colIndex} display="flex" flexDirection="column">
              {column.map((file) => {
                const savedPosition = getSavedPosition(file);
                return (
                  <Draggable 
                    key={file._id}
                    defaultPosition={{ x: savedPosition.x, y: savedPosition.y }}
                    onStop={(e, position) => handleStop(file, e, position)} // Capture the position on drag stop
                  >
                    <Box
                      width="80px"
                      textAlign="center"
                      p={1}
                      onDoubleClick={() => file.name_folder ? setFolder(file) : handleFileClick(file)}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      {file.name_folder ? (
                        <TopicIcon sx={{ color: '#de9210', fontSize: '48px' }} />
                      ) : file.file_url.split('.').pop().toLowerCase() === 'pdf' ? (
                        <PictureAsPdfIcon sx={{ color: '#de1016', fontSize: '48px' }} />
                      ) : (
                        <FilterIcon sx={{ color: '#1084de', fontSize: '48px' }} />
                      )}
                      <Typography variant="body2" sx={{ color: 'white', mt: 1 }} noWrap>
                        {file.name_folder || file.file_name}
                      </Typography>
                    </Box>
                  </Draggable>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
      
      {/* File Preview Overlay */}
      {selectedFile && <FilePreviewOverlay file={selectedFile} onClose={handleCloseFilePreview} />}
    </Box>
  );
};

export default File;
