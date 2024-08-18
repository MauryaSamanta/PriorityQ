import React, { useState,useEffect } from 'react';
import { Box, Typography, IconButton, Avatar, Button, Dialog, Slide, Tooltip } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import UserProfileDialog from '../Dialog/UserProfileDialog';
import MembersDialog from '../Dialog/MembersDialog';
import EditHubBannerDialog from '../Dialog/EditHubBannerDialog'; // Import your EditHubBannerDialog component
import File from './File';
import { useTheme } from '@emotion/react';

const HubOverview = ({ members, owner }) => {
  const { hubId, hubname } = useParams();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const [showFiles, setShowFiles] = useState(false);
  const [openUserProfileDialog, setOpenUserProfileDialog] = useState(false);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [openEditBannerDialog, setOpenEditBannerDialog] = useState(false); // State for EditHubBannerDialog
  const [wallpaper,setWallpaper]=useState(null);

  useEffect(()=>{
    const getWall=async()=>{
      try {
        const response=await fetch(`https://surf-jtn5.onrender.com/wall/${_id}/${hubId}`,{
          method:"GET"
        })
        const wall=await response.json();
        if(wall)
          setWallpaper(wall[0].wall_url);
        else
        setWallpaper('https://res.cloudinary.com/df9fz5s3o/image/upload/v1723274804/samples/coffee.jpg');

        console.log(wall);
      } catch (error) {
        
      }
    }
    getWall();
  }
  )
  const location = useLocation();
  const { des, avatar, banner } = location.state || {};
  const setBanner=(banner)=>{
    banner=banner;
  }
  const handleToggleFiles = () => {
    setShowFiles(!showFiles);
  };

  const handleOpenUserProfileDialog = () => {
    setOpenUserProfileDialog(true);
  };

  const handleCloseUserProfileDialog = () => {
    setOpenUserProfileDialog(false);
  };

  const handleOpenMembersDialog = () => {
    setOpenMembersDialog(true);
  };

  const handleCloseMembersDialog = () => {
    setOpenMembersDialog(false);
  };

  const handleOpenEditBannerDialog = () => {
    setOpenEditBannerDialog(true);
  };

  const handleCloseEditBannerDialog = () => {
    setOpenEditBannerDialog(false);
  };

  const hubOwner = members.find((member) => member._id === owner);

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Hub Banner */}
      <Box
        sx={{
          height: 200,
          width: '100%',
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          '&:hover .edit-icon': {
            opacity: 1,
          },
        }}
      >
       {owner===_id?( <IconButton
          className="edit-icon"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: 'black',
            borderRadius: '50%',
            boxShadow: 3,
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          onClick={handleOpenEditBannerDialog} // Open EditHubBannerDialog on click
        >
          <EditIcon />
        </IconButton>):(<></>)}
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: 16,
            width: 80,
            height: 80,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          <Avatar
            src={avatar}
            alt="Avatar"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 0,
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

        {/* Hub Owner */}
        {hubOwner && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Hub Owner:
            </Typography>
            <IconButton onClick={handleOpenUserProfileDialog}>
              <Avatar
                src={hubOwner.avatar_url}
                alt={hubOwner.name}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Box>
        )}

        {/* Members Count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <GroupIcon sx={{ color: '#635acc', fontSize: 30 }} />
          <Tooltip
            title={
              <Box>
                <Typography variant="h5">Explore Members</Typography>
              </Box>
            }
            arrow
            placement="right"
            sx={{
              '& .MuiTooltip-tooltip': {
                backgroundColor: '#f5f5f5',
                color: 'black',
                boxShadow: theme.shadows[1],
              },
              '& .MuiTooltip-arrow': {
                color: '#f5f5f5',
              },
            }}
          >
            
         
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: '#635acc', cursor: 'pointer' }}
            onClick={handleOpenMembersDialog}
          >
            {members.length} {members.length > 1 ? 'Members' : 'Member'}
          </Typography>
          </Tooltip>
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
            left: showFiles ? 0 : '-100%',
            width: '100%',
            backgroundColor: 'primary',
            boxShadow: 4,
            padding: 2,
            overflowY: 'auto',
            zIndex: 5,
            transition: 'left 0.3s ease',
          }}
        >
          <File members={members} owner={owner} wallpaper={wallpaper} setWallpaperMain={setWallpaper} />
        </Box>
      </Slide>

      {/* User Profile Dialog */}
      {hubOwner && (
        <Dialog open={openUserProfileDialog} onClose={handleCloseUserProfileDialog}>
          <UserProfileDialog open={openUserProfileDialog} onClose={handleCloseUserProfileDialog} user={hubOwner} />
        </Dialog>
      )}

      {/* Members Dialog */}
      <MembersDialog
        open={openMembersDialog}
        onClose={handleCloseMembersDialog}
        members={members}
        owner={owner}
        hubId={hubId}
        token={token}
      />

      {/* Edit Hub Banner Dialog */}
      <EditHubBannerDialog
        open={openEditBannerDialog}
        onClose={handleCloseEditBannerDialog}
        banner={banner}
      />
    </Box>
  );
};

export default HubOverview;
