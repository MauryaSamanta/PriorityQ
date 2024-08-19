import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TopicIcon from '@mui/icons-material/Topic';
import FilterIcon from '@mui/icons-material/Filter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilePreviewOverlay from './FilePreviewOverlay';
import FolderDialog from '../Dialog/FolderDialog';
import EditWallpaperDialog from 'scenes/Dialog/EditWallpaperDialog';
import useMediaQuery from '@mui/material/useMediaQuery';

const MobileFile = ({ members, owner, wallpaper, setWallpaperMain }) => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState(null);
  const { hubId } = useParams();
  const token = useSelector((state) => state.token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [walldiag, setwalldiag] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleCloseFilePreview = () => {
    setSelectedFile(null);
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setFolderDialogOpen(true);
  };

  const handleCloseFolderDialog = () => {
    setFolderDialogOpen(false);
    setSelectedFolder(null);
  };

  const handleopenwalldiag = () => {
    setwalldiag(true);
  };

  const handleclosewalldiag = () => {
    setwalldiag(false);
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/file/${hubId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        const files = await response.json();

        const sortedFiles = files.sort((a, b) => {
          if (a.name_folder && !b.name_folder) return -1;
          if (!a.name_folder && b.name_folder) return 1;
          return 0;
        });

        setFiles(sortedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    getFiles();
  }, [hubId, token]);

  const displayedFiles = folder ? folder.folder : files;

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      p={2}
      sx={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      borderRadius={3}
    >
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
        {folder && (
          <Button sx={{ color: 'gray', marginBottom: '20px' }} onClick={() => setFolder(null)}>
            Back to Library
          </Button>
        )}

        <Box
          display={isMobile ? 'grid' : 'grid'}
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          gridTemplateColumns={'repeat(3,80px)'}
          justifyContent={isMobile ? 'initial' : 'initial'}
          sx={{
            position: 'relative',
            minHeight: '100%',
          }}
        >
          {displayedFiles.map((file) => (
            <Box
              key={file._id}
              width="80px"
              textAlign="center"
              
              onClick={() => (file.name_folder ? handleFolderClick(file) : handleFileClick(file))}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                
              }}
            >
              {file.name_folder ? (
                <img src='/assets/folder.png' width={50} sx={{ color: '#de9210', width: '10px' }} />
              ) : file.file_url.split('.').pop().toLowerCase() === 'pdf' ? (
                <img src='/assets/file.png' width={50} sx={{ color: '#de1016', width: '48px' }} />
              ) : (
                <img src='/assets/photo.png'width={50} sx={{ color: '#1084de', fontSize: '48px' }} />
              )}
              <Typography variant="body2" sx={{ color: 'white', mt: 1 }} noWrap>
                {file.name_folder || file.file_name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Delete Icon */}
        {!isMobile && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'red',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <Tooltip title="Change Library Wallpaper" arrow>
          <IconButton
            sx={{
              position: 'fixed', // Make it fixed so it doesn't scroll
              bottom: 16,
              right: 16,
              zIndex: 1300, // Ensure it stays on top
              backgroundColor: '#635acc',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4a47a3',
              },
            }}
            onClick={handleopenwalldiag}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <EditWallpaperDialog open={walldiag} onClose={handleclosewalldiag} setWallpaperMain={setWallpaperMain} />
      </Box>

      {/* File Preview Overlay */}
      {selectedFile && <FilePreviewOverlay file={selectedFile} onClose={handleCloseFilePreview} />}

      {/* Folder Dialog */}
      {selectedFolder && (
        <FolderDialog
          open={folderDialogOpen}
          folder={selectedFolder}
          onClose={handleCloseFolderDialog}
          handleFileClick={handleFileClick}
          files={files}
          setFiles={setFiles}
        />
      )}
    </Box>
  );
};

export default MobileFile;
