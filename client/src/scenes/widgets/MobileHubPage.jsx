import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, Divider, TextField, Button, AppBar, Toolbar, InputBase, Tooltip, useMediaQuery,Drawer
    , IconButton, Menu, MenuItem
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
import CreateQubeDialog from 'scenes/Dialog/CreateQubeDialog';
import CreateZoneDialog from 'scenes/Dialog/CreateZoneDialog';
import EditQubeDialog from 'scenes/Dialog/EditQubeDialog';
import TagStoreDialog from 'scenes/Dialog/TagStoreDialog';
import QubeOverview from 'scenes/widgets/QubeOverview';
import MessageWidget from 'scenes/widgets/MessageWidget';
import ChatItem from 'scenes/widgets/ChatItem';
import EditHubDialog from 'scenes/Dialog/EditHubDialog';
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
  OpenEditQubeDialog,
  handleMenuClose,
  anchorEl,
  setAnchorEl,
  handleOpenStoreDialog,
  storeDialog,
  handleCloseStoreDialog
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQube, setSelectedQubeState] = useState(null);
  const [selectedZone, setSelectedZoneState] = useState(null);
  const [edithub, setedithub]=useState(false);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleedithub=()=>{
    setedithub(true);
  }
  const closeedithub=()=>{
    setedithub(false);
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
      }} sx={{ mb: 2 }}>
        {hubname}
      </Button>
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
        <Button color="secondary" size="small" variant="contained" onClick={handleOpenDialog} sx={{ mt: 'auto' }}>
        Create a Qube
      </Button>
      

      
      <CreateQubeDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateQube} />
      <EditQubeDialog qube={editQube} open={OpenEditQubeDialog} onClose={handleCloseEditQubeDialog} onEdit={handleEditQube}/>
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
      >
        <Typography variant="h6" mb={2}>Zones</Typography>
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
        <Button 
  variant="contained" 
  color="primary" 
  size="small"
  sx={{
    fontSize: '0.75rem',
    padding: '4px 8px',
    borderRadius: '4px',
    textTransform: 'none',
  }}
  onClick={handleZoneOpenDialog}
>
  Create a Zone
</Button>
<CreateZoneDialog open={openZoneDialog} onClose={handleZoneCloseDialog} onCreate={handleCreateZone}></CreateZoneDialog>
      </Box>
    )}
  </Box>
</Drawer>


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
          </Box>
          <Box sx={{ mt: 2 }}>
            <MessageWidget qube={selectedQube} zone={selectedZone._id} message={message} setMessage={setMessage} />
          </Box>
        </Box>
      ) : (
        // Show HubOverview if no Zone is selected
        <HubOverview members={members} owner={ownerId} des={des} avatar={avatar} banner={banner} setbanner={setbanner} qubes={qubes} />
      )}
    </Box>
  ) : (
    <HubOverview members={members} owner={ownerId} des={des} avatar={avatar} banner={banner} setbanner={setbanner} qubes={qubes} />
  )}
</Box>


    </Box>
  );
};

export default MobileHubPage;
