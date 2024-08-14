import React, { useState } from 'react';
import { Box, Typography, IconButton, Slide, Avatar, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import File from './File';
import { useLocation } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';

const HubOverview = ({ members, owner }) => {
  const { hubId, hubname } = useParams();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [showFiles, setShowFiles] = useState(false);
  const location = useLocation();
  const { des, avatar } = location.state || {};

  const handleToggleFiles = () => {
    setShowFiles(!showFiles);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Hub Banner */}
      <Box
        sx={{
          height: 200,
          width: '100%',
          backgroundImage: 'url(https://res.cloudinary.com/df9fz5s3o/image/upload/v1723645908/l100qep0zpgob6t5erd0.png)', // Replace with actual banner image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
        }}
      >
        {/* Hexagon Avatar Hanging */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,  // Adjust to make the avatar hang
            left: 16,
            width: 80,
            height: 80,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',  // Optional background color
          }}
        >
          <Avatar
            src={avatar}
            alt="Avatar"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 0,  // Ensures the hexagon effect is preserved
            }}
          />
        </Box>
      </Box>

      {/* Hub Information */}
      <Box sx={{ marginTop: 5, padding: 2, ml: 2, maxWidth: 600 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {hubname}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {des}
        </Typography>
        {/* Members Count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <GroupIcon sx={{ color: '#635acc', fontSize: 30 }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#635acc', fontSize: 18 }}>
            {members.length} Members
          </Typography>
        </Box>
      </Box>

      {/* Button to Show/Hide Files */}
      <Button
        onClick={handleToggleFiles}
        sx={{
          position: 'fixed',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: '#635acc',
          color: 'white',
          borderRadius: 2,
          padding: 1,
          minWidth: 0,
          width: 40,
          height: 80,
          '&:hover': {
            backgroundColor: '#4a4b9b',
          },
        }}
      >
        <Typography variant="body2" sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {showFiles ? 'Out Of Library' : 'Go To Library'}
        </Typography>
      </Button>

      {/* Full Width File Component */}
      <Slide direction="left" in={showFiles} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            height: '100%',
            left: showFiles ? 0 : '-100%', // Slide in and out
            width: '100%',  // Full width of the content area
            backgroundColor: 'primary',
            boxShadow: 4,
            padding: 2,
            overflowY: 'auto',
            zIndex: 5,
            transition: 'left 0.3s ease', // Smooth transition
          }}
        >
          <File members={members} owner={owner} />
        </Box>
      </Slide>
    </Box>
  );
};

export default HubOverview;
