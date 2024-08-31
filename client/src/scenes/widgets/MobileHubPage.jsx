import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, Divider, TextField, Button, AppBar, Toolbar, InputBase, Tooltip, useMediaQuery,Drawer
    , IconButton, Menu, MenuItem, Slide,
    SwipeableDrawer
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu';
import HubOverview from 'scenes/widgets/HubOverview';
import File from './File';
import MobileFile from './MobileFile';
import CreateQubeDialog from 'scenes/Dialog/CreateQubeDialog';
import CreateZoneDialog from 'scenes/Dialog/CreateZoneDialog';
import EditQubeDialog from 'scenes/Dialog/EditQubeDialog';
import TagStoreDialog from 'scenes/Dialog/TagStoreDialog';
import QubeOverview from 'scenes/widgets/QubeOverview';
import MessageWidget from 'scenes/widgets/MessageWidget';
import ChatItem from 'scenes/widgets/ChatItem';
import EditHubDialog from 'scenes/Dialog/EditHubDialog';
import { Add } from '@mui/icons-material';
const MobileHubPage = ({
  hubname,
  des,
  avatar,
  banner,
  setbanner,
  setavatar,
  setdes,
  qubes,
  zones,
  members,
  ownerId,
  messages,
  _id,
  setMessage,
  message,
  userTyping,
  type,
  setSelectedQube,
  fetchZones,
  setSelectedZone,
  joinZone,
  exitZone,
  handleOpenDialog,
  handleCloseDialog,
  handleCreateQube,
  openDialog,
  handleZoneOpenDialog,
  handleZoneCloseDialog,
  handleCreateZone,
  openZoneDialog,
  editQube,
  setEditQube,
  handleOpenEditQubeDialog,
  handleCloseEditQubeDialog,
  handleEditQube,
  handleDelQube,
  OpenEditQubeDialog,
  handleMenuClose,
  anchorEl,
  setAnchorEl,
  handleOpenStoreDialog,
  storeDialog,
  handleCloseStoreDialog
}) => {
  const {username}=useSelector((state)=>state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQube, setSelectedQubeState] = useState(null);
  const [selectedZone, setSelectedZoneState] = useState(null);
  const [edithub, setedithub]=useState(false);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [showFiles,setshowfiles]=useState(false);
  const [wallpaper, setmainwall]=useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isButtonVisible, setIsButtonVisible] = useState(false);
const [lib, setlib]=useState(false);

const toggleButtonVisibility = () => {
  setIsButtonVisible(!isButtonVisible);
  if (!showFiles) {
    setTimeout(() => {
      setIsButtonVisible(false);
    }, 3000); 
  }
};
  const handletogglefiles=()=>{
    if(showFiles)
      setIsButtonVisible(false);
    setshowfiles(!showFiles);

  }
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleedithub=()=>{
    setedithub(true);
  }
  const closeedithub=()=>{
    setedithub(false);
  }

  const openlib=(open)=>{
    setlib(open);
  }
  const closelib=()=>{
    setlib(false);
  }
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView();
  }, [messages]);
  
  return (
    <Box height="100vh">
      <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'black', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', height: '55px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
      sx={{ flexGrow: 1 }} // Ensures space is taken up on the left, pushing the right content to the edge
    />
    
    <Button varient="contained" sx={{
          
          //transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: '#635acc',
          color: 'white',
          borderRadius: 2,
          padding: 1,
         
          '&:hover': {
            backgroundColor: '#4a4b9b',
          },
        }} onClick={openlib}>{!lib? "Open Library":"Close Library"}</Button>
    
    <IconButton
      sx={{
        color: 'black',
        '&:hover': {
          transform: 'rotate(360deg)',
          transition: 'transform 0.3s ease',
        }
      }}
      onClick={handleedithub}
    >
      <SettingsIcon sx={{color:'white'}} />
    </IconButton>
    <EditHubDialog open={edithub} onClose={closeedithub} hub={hubname} setdes={setdes} setavatar={setavatar} />
        </Toolbar>
      </AppBar>
      
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}  sx={{ width: '100%' }} >
  <Box display="flex" height="100%" sx={{ width: '100%' }} >
    {/* Qubes Section */}
    <Box
      width={selectedQube ? '60%' : '100%'} // Adjust width based on selection
      role="presentation"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.main',
        color: 'white',
        p: 2,
        transition: 'width 0.5s ease',
      }}
      borderRadius="0px 16px 16px 0px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.3)" 
    >
      <Button color="secondary" onClick={() => {
        setDrawerOpen(false);
        if(selectedZone){
          exitZone(selectedZone);
        }
        setSelectedQube(null);
        setSelectedZone(null);
        setSelectedQubeState(null);
        
        setSelectedZoneState(null);
      }} sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Back to Hub Home
        
      </Button>
      <Typography textAlign="center">Qubes<IconButton 
    color="secondary" 
    onClick={(e)=>{e.stopPropagation(); handleOpenDialog();}} 
    sx={{ marginLeft: 'auto', ml: 1 }}
  >
    <Add/>
  </IconButton></Typography>
      <Box sx={{overflowY:'auto'}}>
      <List height="100%">
        {qubes.map((qube) => (
          <ListItem
            button
            key={qube.id}
            onClick={() => {
              if(selectedZone){
                exitZone(selectedZone);
              }
              setSelectedQubeState(qube._id);
              setSelectedQube(qube._id);
              fetchZones(qube._id);
              setSelectedZoneState(null);
            }}
          >
            <Tooltip
              title={
                <Box>
                  <Typography variant="h5">{qube.name}</Typography>
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
                }
              }}
            >
               <Box
  sx={{
    position: 'relative',
    width: 50,
    height: 50,
    clipPath: selectedQube === qube._id
      ? 'none'
      : 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
    bgcolor: selectedQube === qube._id ? '#F5A623' : '#40444b',
    transition: 'all 0.3s ease',
    borderRadius: 2,
    marginBottom: '1rem',
    margin: '20px',
    borderColor: 'transparent',
    borderWidth: '2px',
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: selectedQube === qube._id ? 'black' : 'white',
    boxShadow: selectedQube === qube._id ? '0 8px 15px rgba(0, 0, 0, 0.3)' : 'none',
    transform: selectedQube === qube._id ? 'translateY(-4px)' : 'none',
    '&:hover': {
      transform: selectedQube === qube._id ? 'translateY(-4px) scale(1.1)' : 'scale(1.1)',
      borderColor: '#F5A623',
    },
  }}
>
      {selectedQube === qube._id && (
        <IconButton
        sx={{
          position: 'absolute',
          top: '-8px', // Adjust to position closer to the edge
          right: '-8px', // Adjust to position closer to the edge
          color: 'black',
          backgroundColor: 'white', // Add a white background for better contrast
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Optional: add some shadow for depth
          padding: '2px', // Smaller padding for a more compact icon
          borderRadius: '50%', // Make the background circular
          zIndex: 1, // Ensure it stays on top
        }}
        onClick={()=>{setEditQube(qube); handleOpenEditQubeDialog();}}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      )}
      <Typography variant="body2" sx={{ lineHeight: 1 }}>
        {qube.nickname ? qube.nickname : qube.name}
      </Typography>
       
      
    </Box>
            </Tooltip>
          </ListItem>
        ))}
        </List>
        </Box>
       <CreateQubeDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateQube} />
      <EditQubeDialog qube={editQube} open={OpenEditQubeDialog} onClose={handleCloseEditQubeDialog} onEdit={handleEditQube} onDel={handleDelQube}/>
    </Box>

    {/* Zones Section */}
    {selectedQube && (
      <Box
        width="70%"
        bgcolor="#36393f"
        p={2}
        display="flex"
        flexDirection="column"
        height="100%"
        sx={{ transition: 'width 0.3s ease' }}
        borderRadius="0px 16px 16px 0px"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.3)" 
        alignItems="center"
      >
       <Typography variant="h6" mb={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
  Zones
  <IconButton 
    color="secondary" 
    onClick={handleZoneOpenDialog} 
    sx={{ marginLeft: 'auto', ml: 1 }}
  >
    <Add />
  </IconButton>
</Typography>
        <Box sx={{overflowY:'auto'}}>
        <List component="nav">
          {zones.map((zone) => (
            <ListItem
              button
              key={zone._id}
              onClick={() => {
                if(selectedZone){
                  exitZone(selectedZone);
                }
                setSelectedZoneState(zone);
                joinZone(zone._id);
                setDrawerOpen(false);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: selectedZone?._id === zone._id ? '#555759' : 'transparent', // Conditional bgcolor
                borderRadius: selectedZone?._id === zone._id ? '4px' : '0px', // Conditional border-radius
                '&:hover': {
                bgcolor: selectedZone?._id !== zone._id ? '#40444b' : '#555759', // Change hover color if not selected
                },
                '& .arrow': {
                transition: 'transform 0.3s ease',
                transform: selectedZone?._id === zone._id ? 'rotate(90deg)' : 'rotate(0deg)', // Conditional arrow rotation
                },
                
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>{zone.name}</Typography>
              <ChevronRightIcon />
            </ListItem>
          ))}
        </List>
        </Box>
        
<CreateZoneDialog open={openZoneDialog} onClose={handleZoneCloseDialog} onCreate={handleCreateZone}></CreateZoneDialog>
      </Box>
    )}
  </Box>
</Drawer>

{lib && (
  
  <SwipeableDrawer
    anchor="right"
    open={lib}
    onClose={() => setlib(false)}
    onOpen={() => setlib(true)}
    disableSwipeToOpen={!isMobile}
    sx={{
      '& .MuiDrawer-paper': {
        position: 'absolute',
        top: 0,
        height: !isMobile ? '100%' : '100vh',
        width: '100%',
        backgroundColor: 'primary',
        boxShadow: 4,
        //padding: 2,
        zIndex: 5,
      },
    }}
  >
    <Button
    variant="contained"
    sx={{
      position: 'absolute',
      top: '50%',
      left: -55, // Adjust this value as needed to move the text further left
      transform: 'translateY(-50%) rotate(-90deg)',
      color: 'white',
      fontSize: '14px',
      cursor: 'pointer',
      userSelect: 'none',
    }}
    onClick={() => setlib(false)} // Optional: allow clicking the text to close the drawer
  >
    SWipe to Close 
  </Button>

    {!isMobile ? (
      <File wallpaper={wallpaper} setWallpaperMain={setmainwall} />
    ) : (
      <MobileFile wallpaper={wallpaper} setWallpaperMain={setmainwall} />
    )}
  </SwipeableDrawer>
)}
<Box display="flex" flexDirection="column" height="calc(100% - 55px)">
  {/* Main Content Area */}
  {selectedQube ? (
    <Box display="flex" height="100%">
      {/* Show Zone Content or Hub Overview */}
      {selectedZone ? (
        <Box
          width="100%"
          bgcolor="#36393f"
          p={2}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{selectedZone.name}</Typography>
            
            {/* <Button
        onClick={() => {
          if(!isButtonVisible)
          toggleButtonVisibility();
          else
          handletogglefiles();
          
        }}
        sx={{
          position: 'fixed',
          right: isButtonVisible ? 16 : -30,
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
          transition: 'right 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#4a4b9b',
          },
        }}
      >
        <Typography variant="body2" sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {showFiles ? 'Out Of Library' : 'Go To Library'}
        </Typography>
      </Button> */}
       
            <Button
              variant="contained"
              color="primary"
              sx={{
                ml: 'auto',
                backgroundColor: '#854be3',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#6f3cbe',
                },
                
                borderRadius: '20px',
                textTransform: 'none',
                padding: '6px 16px',
              }}
              onClick={handleOpenStoreDialog}
            >
              #store
            </Button>
            <TagStoreDialog
              open={storeDialog}
              qubeid={selectedQube}
              onClose={handleCloseStoreDialog}
            />
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
          {!isMobile?(<File wallpaper={wallpaper} setWallpaperMain={setmainwall} />
          ):(
            <MobileFile wallpaper={wallpaper} setWallpaperMain={setmainwall}/>
          )}
        </Box>
      </Slide>
          </Box>

          <Box
            flexGrow={1}
            sx={{
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
            }}
          >
            <Box p={2} bgcolor="#36393f" borderRadius="8px" ref={containerRef}>
              <Typography variant="h5">Welcome to the {selectedZone.name} Zone</Typography>
              <Typography variant="h6" sx={{ color: '#9e9e9e' }}>Talk with your Qube members here. We organise your files for you !</Typography>
            </Box>
            {messages?.map((message, index) => (
              <ChatItem key={index} message={message} isOwnMessage={message.sender_id === _id ? true : null} />
            ))}
            <div ref={bottomRef} />
            {userTyping !== username && userTyping !== '' && (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Typography sx={{ fontWeight: 'bold', color: '#635acc' }}>
      {userTyping} is typing
    </Typography>
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#635acc',
          borderRadius: '50%',
          animation: 'typing 1.5s infinite',
        }}
      />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#635acc',
          borderRadius: '50%',
          animation: 'typing 1.5s infinite 0.2s',
        }}
      />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#635acc',
          borderRadius: '50%',
          animation: 'typing 1.5s infinite 0.4s',
        }}
      />
    </Box>
  </Box>
)}

<style>
  {`
    @keyframes typing {
      0% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0); }
    }
  `}
</style>
          </Box>
          <Box sx={{ mt: 2 }}>
            <MessageWidget qube={selectedQube} zone={selectedZone._id} message={message} setMessage={setMessage} />
          </Box>
        </Box>
      ) : (
        // Show HubOverview if no Zone is selected
        <HubOverview members={members} owner={ownerId} des={des} avatar={avatar} banner={banner} setbanner={setbanner} qubes={qubes}
          setwall={setmainwall}
        />
      )}
    </Box>
  ) : (
    <HubOverview members={members} owner={ownerId} des={des} avatar={avatar} banner={banner} setbanner={setbanner} qubes={qubes}
    setwall={setmainwall}
    />
 
  )}
</Box>


    </Box>
  );
};

export default MobileHubPage;
