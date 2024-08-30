import React, { useState } from 'react';
import { Box, Typography, Dialog, IconButton, TextField } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import RemoveIcon from '@mui/icons-material/Remove'; // Import the Remove icon
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const FolderDialog = ({ open, folder, onClose, handleFileClick, files, setFiles }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {hubId}=useParams();
  const {_id}=useSelector((state)=>state.user);
  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter files in the current folder based on search query
  const filteredFolderFiles = searchQuery
    ? folder.folder.filter(file =>
        file?.file_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : folder.folder;

  // Filter files from the entire library based on search query, excluding those already in the folder
  const filteredLibraryFiles = searchQuery && filteredFolderFiles.length === 0
    ? files.filter(file =>
        file.file_name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !folder.folder.some(folderFile => folderFile._id === file._id) // Exclude files already in the folder
      )
    : [];

  const addFileToFolder = async (file) => {
    const data = { fileid: file._id, folderid:folder._id };
    try {
      const response = await fetch(`http://localhost:3001/file/${file._id}/${folder._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const savedFile = await response.json();
      folder.folder.push({ file_name: file.file_name, file_url: file.file_url });
      setFiles(prevFiles => prevFiles.filter(f => f.file_url !== file.file_url));
      setSearchVisible(false);
      setSearchQuery('');
    } catch (error) {
      console.error('Error adding file to folder:', error);
    }
  };
  const removefile=async(file)=>{
    const data={userid:_id, hubid:hubId, file_name:file.file_name, file_url:file.file_url, folderid:folder._id};
    const fileIndex = folder.folder.findIndex(pfile => pfile.file_url === file.file_url);
    folder.folder.splice(fileIndex, 1);

    try {
      const response=await fetch(`http://localhost:3001/file/remove`,{
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const savedFile=await response.json();
      setFiles((prevFiles)=>[...prevFiles,savedFile]);

    } catch (error) {
      
    }
  }
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs"  // Narrower width for a card-like appearance
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(44, 44, 44, 0.8)', // Semi-transparent dark background
          borderRadius: '12px', // Rounded corners
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Card-like shadow
          padding: '6px', // Reduced padding for narrower card
          zIndex: 1200, // Ensure it's above other content
        }
      }}
    >
      <Box 
        color="white" 
        textAlign="center"
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            {folder.name_folder}
          </Typography>
          
          {/* Search button and input */}
          <IconButton onClick={() => setSearchVisible(!searchVisible)} color="inherit">
            <SearchIcon />
          </IconButton>
          {searchVisible && (
            <TextField
              variant="outlined"
              placeholder="Search files..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ ml: 2, width: '100%' }}
            />
          )}
        </Box>
        
        {/* Display files based on search query */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" // Responsive grid
          gap={1}
        >
           {(filteredFolderFiles.length > 0 ? filteredFolderFiles : filteredLibraryFiles).map((file) => (
            <Box
              key={file._id}
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              onClick={() => !filteredLibraryFiles.includes(file) && handleFileClick(file)}
            >
              {file.file_url?.split('.').pop().toLowerCase() === 'pdf' ? (
                <img src='/assets/file.png' width={30} sx={{ color: '#de1016', fontSize: '36px' }} /> // Smaller icon size
              ) : (
                <img src='/assets/photo.png' width={30} sx={{ color: '#1084de', fontSize: '36px' }} /> // Smaller icon size
              )}
              <Typography variant="body2" sx={{ color: 'white', mt: 1, flexGrow: 1 }} noWrap>
                {file.file_name}
              </Typography>

              {/* Conditionally render the Add icon for library files */}
              {filteredLibraryFiles.includes(file) ? (
                <IconButton onClick={() => addFileToFolder(file)} color="inherit">
                  <AddIcon sx={{ color: '#1084de' }} />
                </IconButton>
              ) : (
                <IconButton onClick={(e)=>{e.stopPropagation(); removefile(file)}} color="inherit">
                  <RemoveIcon sx={{ color: '#de1016' }} />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

export default FolderDialog;
