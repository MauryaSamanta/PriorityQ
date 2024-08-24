import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TopicIcon from '@mui/icons-material/Topic';
import FilterIcon from '@mui/icons-material/Filter';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FilePreviewOverlay from './FilePreviewOverlay';
import FolderDialog from '../Dialog/FolderDialog'; // Import FolderDialog
import CreateFolderDialog from 'scenes/Dialog/CreateFolderDialog';
import Draggable from 'react-draggable';
import EditWallpaperDialog from 'scenes/Dialog/EditWallpaperDialog';

const File = ({ members, owner, wallpaper,setWallpaperMain }) => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState(null);
  const { hubId } = useParams();
  const {_id}=useSelector((state)=>state.user);
  const token = useSelector((state) => state.token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false); // State to manage dialog open/close
  const [selectedFolder, setSelectedFolder] = useState(null); // State to hold the selected folder
  const [walldiag,setwalldiag]=useState(false);
  const [createfolder, setcreatefolder]=useState(false);
  const handleFileClick = (file) => {
    setFolderDialogOpen(false)
    setSelectedFile(file);
  };

  const handleCloseFilePreview = () => {
    setSelectedFile(null);
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setFolderDialogOpen(true); // Open the dialog when a folder is clicked
  };

  const handleCloseFolderDialog = () => {
    setFolderDialogOpen(false); // Close the dialog
    setSelectedFolder(null); // Reset the selected folder
  };
  const handleopenwalldiag=()=>{
    setwalldiag(true);
  }

  const handleclosewalldiag=()=>{
    setwalldiag(false);
  }

  const handlecreatefolder=()=>{
    setcreatefolder(true);
  }
  const handlecreatefolderclose=()=>{
    setcreatefolder(false);
  }
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
    //console.log(`File ${file.file_name || file.name_folder} moved to X: ${x}, Y: ${y}`);
  };

  // Retrieve saved positions and apply them
  const getSavedPosition = (file) => {
    const fileKey = `${hubId}-${file._id}`;
    const savedPosition = localStorage.getItem(fileKey);
    return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0 };
  };

  const handleDeleteFile = async (fileId) => {
     try {
       const response=await fetch(`https://surf-jtn5.onrender.com/file/${fileId}`,{
        method:"DELETE"
       });
       console.log('SUCCESS');
       if (response.ok) {
        setFiles(files.filter(file => file._id !== fileId));
      } 
     } catch (error) {
      
     }
  };
  const handleAddFile=async(fileId,folder)=>{
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/file/${fileId}/${folder._id}`,{
        method:"PATCH"
      });
      const file=await response.json();
      if (response.ok) {
        setFiles(files.filter(file => file._id !== fileId));
        folder.folder.push({file_name:file.file_name, file_url:file.file_url})
      } 
    } catch (error) {
      
    }
  }
  const createFolder=async(foldername)=>{
    //console.log(foldername);
    const folderdata={id:_id, name_folder:foldername};
    //console.log(folderdata);
    //console.log(foldername);
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/file/${hubId}/${foldername}/${_id}`,{
        method:"POST",
        header:{"Content-Type": "application/json"},
        body:JSON.stringify(folderdata)
      });
      const savedFolder=await response.json();
      console.log(savedFolder);
      setFiles((prevFiles)=>[...prevFiles, savedFolder]);
    } catch (error) {
      
    }
  }
   const handleDrop=(e,folder)=>{
    e.preventDefault();
    e.stopPropagation();
    const fileId = e.dataTransfer.getData('fileId');
    if (fileId) {
      handleAddFile(fileId,folder);
    }
   }
  const handleDropDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fileId = e.dataTransfer.getData('fileId');
    if (fileId) {
      handleDeleteFile(fileId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Box 
      display="flex" 
      width="100%" 
      height="100%" 
      p={2} 
      sx={{
        backgroundImage: wallpaper?`url(${wallpaper})`:'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: !wallpaper?'rgba(44, 44, 44, 0.8)':null,
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
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('fileId', file._id)} // Set fileId for drag
                      onDoubleClick={() => file.name_folder ? handleFolderClick(file) : handleFileClick(file)} // Open dialog on folder click
                      onDragOver={handleDragOver}
                      onDrop={(e)=>file.name_folder?handleDrop(e,file):null}
                      sx={{
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {file.name_folder ? (
                        <img src='/assets/folder.png' width={50} sx={{ color: '#de9210', fontSize: '48px' }} />
                      ) : file.file_url.split('.').pop().toLowerCase() === 'pdf' ? (
                        <img src='/assets/file.png' width={50} sx={{ color: '#de1016', fontSize: '48px' }} />
                      ) : (
                        <img src='/assets/photo.png' width={50} sx={{ color: '#1084de', fontSize: '48px' }} />
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

        {/* Delete Icon */}
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
          onDragOver={handleDragOver}
          onDrop={handleDropDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            left: 0,
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
            },
          }}
          onClick={handlecreatefolder}
          //onDragOver={handleDragOver}
          //onDrop={handleDropDelete}
        >
          <AddIcon />
        </IconButton>
        <CreateFolderDialog open={createfolder} onClose={handlecreatefolderclose} createFolder={createFolder}/>
        <Tooltip title="Change Library Wallpaper" arrow>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              backgroundColor: '#635acc',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4a47a3',
              },
            }}
            onClick={ handleopenwalldiag}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <EditWallpaperDialog open={walldiag} onClose={handleclosewalldiag} setWallpaperMain={setWallpaperMain}/>
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

export default File;
