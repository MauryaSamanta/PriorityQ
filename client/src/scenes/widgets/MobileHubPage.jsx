import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, Divider, TextField, Button, AppBar, Toolbar, InputBase, Tooltip, useMediaQuery,Drawer
    , IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import AccountTreeIcon from '@mui/icons-material/AccountTree'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import HubOverview from 'scenes/widgets/HubOverview';
import CreateQubeDialog from 'scenes/Dialog/CreateQubeDialog';
import CreateZoneDialog from 'scenes/Dialog/CreateZoneDialog';
import TagStoreDialog from 'scenes/Dialog/TagStoreDialog';
import QubeOverview from 'scenes/widgets/QubeOverview';
import MessageWidget from 'scenes/widgets/MessageWidget';
import ChatItem from 'scenes/widgets/ChatItem';

const MobileHubPage = ({
  hubname,
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
  handleOpenDialog,
  handleCloseDialog,
  handleCreateQube,
  openDialog,
  handleZoneOpenDialog,
  handleZoneCloseDialog,
  handleCreateZone,
  openZoneDialog,
  handleOpenStoreDialog,
  storeDialog,
  handleCloseStoreDialog
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQube, setSelectedQubeState] = useState(null);
  const [selectedZone, setSelectedZoneState] = useState(null);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
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
          <Typography variant="h6">{hubname}</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}  sx={{ width: '100%' }}>
  <Box display="flex" height="100%" sx={{ width: '100%' }}>
    {/* Qubes Section */}
    <Box
      width={selectedQube ? '30%' : '100%'} // Adjust width based on selection
      role="presentation"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.main',
        color: 'white',
        p: 2,
        transition: 'width 0.5s ease',
      }}
    >
      <Button color="secondary" onClick={() => {
        setDrawerOpen(false);
        setSelectedQube(null);
        setSelectedZone(null);
        setSelectedQubeState(null);
        
        setSelectedZoneState(null);
      }} sx={{ mb: 2 }}>
        {hubname}
      </Button>

      <List>
        {qubes.map((qube) => (
          <ListItem
            button
            key={qube.id}
            onClick={() => {
              setSelectedQubeState(qube._id);
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
                  width: 50,
                  height: 50,
                  bgcolor: selectedQube === qube._id ? '#F5A623' : '#40444b',
                  transition: 'all 0.3s ease',
                  borderRadius: 2,
                  marginBottom: '1rem',
                  margin: '20px',
                  borderColor: 'transparent',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: selectedQube === qube._id ? 'black' : 'white',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    borderColor: '#F5A623',
                  },
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 1 }}>
                  {qube.nickname ? qube.nickname : qube.name}
                </Typography>
              </Box>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Button color="secondary" size="small" variant="contained" onClick={handleOpenDialog} sx={{ mt: 'auto' }}>
        Create a Qube
      </Button>
      <CreateQubeDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateQube} />
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
      >
        <Typography variant="h6" mb={2}>Zones</Typography>
        <List component="nav">
          {zones.map((zone) => (
            <ListItem
              button
              key={zone._id}
              onClick={() => {
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
        <HubOverview members={members} owner={ownerId} />
      )}
    </Box>
  ) : (
    <HubOverview members={members} owner={ownerId} />
  )}
</Box>


    </Box>
  );
};

export default MobileHubPage;
