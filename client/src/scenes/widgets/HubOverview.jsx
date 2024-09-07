import React, { useState,useEffect } from 'react';
import { Box, Typography, IconButton, Avatar, Button, Dialog, Slide, Tooltip, useMediaQuery, CircularProgress,circularProgressClasses
  ,SwipeableDrawer
 } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import UserProfileDialog from '../Dialog/UserProfileDialog';
import AddMemberDialog from 'scenes/Dialog/AddMemberDialog';
import MembersDialog from '../Dialog/MembersDialog';
import EditHubBannerDialog from '../Dialog/EditHubBannerDialog'; // Import your EditHubBannerDialog component
import File from './File';
import { useTheme } from '@emotion/react';
import MobileFile from './MobileFile';
import SetupStepsDrawer from './SetupStepsDrawer';

const HubOverview = ({ members, owner,des,avatar,banner, setbanner, qubes, setwall, demonym }) => {
  const location = useLocation();
  console.log(des);
  //let {   banner } = location.state || {};
  const { hubId, hubname } = useParams();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const [showFiles, setShowFiles] = useState(false);
  const [openUserProfileDialog, setOpenUserProfileDialog] = useState(false);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [openEditBannerDialog, setOpenEditBannerDialog] = useState(false); // State for EditHubBannerDialog
  const [wallpaper,setWallpaper]=useState(null);
  const navigate=useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentStep, setCurrentStep] = useState(0);
  const [viewprogress,setviewprogress]=useState(true);
  const [stepcount,setstepcount]=useState(-1);
  const [incom,setincom]=useState('');
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [code, setCode] = useState(null);
  const [loading,setloading]=useState(false);
  const demo=demonym? demonym:'Member';
  console.log(demonym);
  const steps = [
    { step: 'Upload Hub Icon', complete:'false' },
    { step: 'Upload Hub Banner', complete:'false' },
    { step: 'Upload My Library Wallpaper',complete:'false' },
    { step: 'Build your First Qube',complete:'false' },
    {step:  'Invite your Friends',complete:'false'}
  ];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const [stepsdrawer,setstepsdrawer]=useState(false);
  useEffect(()=>{
    const getWall=async()=>{
      try {
        const response=await fetch(`https://surf-jtn5.onrender.com/wall/${_id}/${hubId}`,{
          method:"GET"
        })
        const wall=await response.json();
        if(wall)
          {setWallpaper(wall[0].wall_url);
            setwall(wall[0].wall_url);
          }
       

        console.log(wall);
      } catch (error) {
        
      }
    }
    getWall();
  }
  )
 
  
  const handleToggleFiles = () => {
    setShowFiles(!showFiles);
  };
   
  const handletogglesteps=(open)=>{
    setstepsdrawer(open);
  }

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
  const checksteps=()=>{
    
    let count=0;
    if(avatar)
      {count++;steps[0].complete='true';}
    else if(stepcount===-1)
       setstepcount(0);
    if(banner)
      {count++;steps[1].complete='true';}
    else if(stepcount===-1)
      setstepcount(1);
    if(wallpaper)
      {count++;steps[2].complete='true';}
    else if(stepcount===-1)
     { console.log(stepcount); setstepcount(2);}
    if(qubes.length>0)
      {count++;steps[3].complete='true';}
    else if(stepcount===-1)
     { setstepcount(3);}
    if(members.length>1)
      {count++;steps[4].complete='true';}
    if(count<5)
    setCurrentStep(count);
  else
    setviewprogress(false)
  console.log(count);
    //console.log(stepcount)
    setincom(steps.find(step => step.complete === 'false')?.step);
  }
  useEffect(()=>{
        checksteps();
  },[avatar,banner,wallpaper,qubes])
  
  const handleOpenAddMemberDialog = async () => {
    setloading(true)
    try {
      const response = await fetch(`https://surf-jtn5.onrender.com/invite/${hubId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCode(data.code);
    } catch (error) {
      console.error(error);
    }
    setloading(false);
    setIsAddMemberDialogOpen(true);
  };

  const handleCloseAddMemberDialog = () => {
    setIsAddMemberDialogOpen(false);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative',
      
     }}>
      {/* Hub Banner */}
      <Box
        sx={{
          height: 200,
          width: '100%',
          backgroundImage: banner?`url(${banner})`:'null',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover .edit-icon': {
            opacity: 1,
          },
        }}
      >
        {!banner && (
    <Typography
      variant="h6"
      sx={{
        color: '#888',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        cursor:'pointer'
      }}
      onClick={handleOpenEditBannerDialog}
    >
      Select a hub banner
    </Typography>
  )}
    {isMobile && <IconButton
  className="edit-icon"
  sx={{
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black with 70% opacity
    borderRadius: '50%',
    boxShadow: 3,
    opacity: 1,
    // transition: 'opacity 0.3s ease-in-out',
    // '&:hover': {
    //   backgroundColor: 'black',
    // },
  }}
  onClick={()=>navigate('/home')} // Open EditHubBannerDialog on click
>
  <ArrowBackIosIcon />
</IconButton>}

       {owner===_id && banner?( <IconButton
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
        <Typography
  variant="body1"
  color="textSecondary"
  paragraph
  sx={{ whiteSpace: 'pre-line' }}
>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
      {members.length} {members.length > 1 ? `${demo}`+'s' : `${demo}`}
    </Typography>
  </Tooltip>
  {!loading && _id===owner?(<AddIcon 
    sx={{ 
      color: '#635acc', 
      fontSize: 24, 
      cursor: 'pointer',
      '&:hover': {
        color: '#8c80ff', // Slight color change on hover to indicate interactivity
      } 
    }} 
    disabled={loading}
    onClick={handleOpenAddMemberDialog}
  />):loading && _id===owner?(
    <CircularProgress
        size={85} // Adjust size as needed
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />
  ):(<></>)}
  <AddMemberDialog open={isAddMemberDialogOpen} onClose={handleCloseAddMemberDialog} code={code} />
</Box>
          </Box>
        )}

       
      </Box>
      {viewprogress && owner===_id && (
  <Box sx={{ 
    marginTop: 4, 
    padding: 2, 
    ml: 2, 
    mr: 2, 
    border: `2px solid ${theme.palette.primary.main}`, 
    borderRadius: 2, 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-2px)',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  }}
  onClick={()=>isMobile?handletogglesteps(true):null}
  >
    <Box>
    <Typography 
      variant="h5" 
      gutterBottom 
      sx={{ 
        fontWeight: 'bold', 
        color: '#f6f6f6', 
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' 
      }}
    >
      Setup Progress
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={24}
        thickness={8}
        sx={{
          color: 'primary',
          animation: 'pulse 1.5s infinite ease-in-out',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
          }}
          
      />
      <Typography 
        variant="body1" 
        sx={{ 
          color:'#f6f6f6'
        }}
      >
         {incom}
      </Typography>
      </Box>
    </Box>
  </Box>
)}
 <SwipeableDrawer
        anchor="bottom"
        open={stepsdrawer}
        onClose={()=>handletogglesteps(false)}
        sx={{ 
          '& .MuiDrawer-paper': {
            borderRadius: '16px 16px 0 0',
            padding: '16px',
            backgroundColor: '#0a0909',
          }
        }}
      >
        <SetupStepsDrawer steps={steps} currentStep={currentStep} avatar={avatar} banner={banner} wallpaper={wallpaper}
        qubes={qubes} members={members} />
      </SwipeableDrawer>

      {/* Button to Show/Hide Files */}
      {/* <Button
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
      </Button> */}

      {/* Full Width File Component */}
      <Slide direction="left" in={showFiles} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            height: !isMobile?'100%':'100vh',
            left: showFiles ? 0 : '-100%',
            width: '100%',
            backgroundColor: 'primary',
            boxShadow: 4,
            padding: 2,
           // overflowY: 'auto',
            zIndex: 5,
            transition: 'left 1.0s ease',
          }}
        >
          {!isMobile?(<File members={members} owner={owner} wallpaper={wallpaper} setWallpaperMain={setWallpaper} />
          ):(
            <MobileFile members={members} owner={owner} wallpaper={wallpaper} setWallpaperMain={setWallpaper}/>
          )}
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
        setBanner={setbanner}
      />
    </Box>
  );
};

export default HubOverview;
