import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, Divider, TextField, Button, AppBar, Toolbar, InputBase, Tooltip} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import AccountTreeIcon from '@mui/icons-material/AccountTree'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HubOverview from 'scenes/widgets/HubOverview';
import CreateQubeDialog from 'scenes/Dialog/CreateQubeDialog';
import CreateZoneDialog from 'scenes/Dialog/CreateZoneDialog';
import QubeOverview from 'scenes/widgets/QubeOverview';
import MessageWidget from 'scenes/widgets/MessageWidget';
import ChatItem from 'scenes/widgets/ChatItem';
import  io  from 'socket.io-client';
const socket = io('https://surf-jtn5.onrender.com');

const HubPage = () => {
  const navigate = useNavigate();
  const { hubId,ownerId,hubname } = useParams();
  //console.log(owner);
  const {username}=useSelector((state)=>state.user);
  const token = useSelector((state) => state.token);
  const [qubes,setQubes]=useState([]);
  const [selectedQube, setSelectedQube] = useState(null);
  const [zones,setZones]=useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [members,setMembers]=useState([]);
  const [messages,setMessages]=useState([]);
  const [message,setMessage]=useState('');

  //const [messages,setMessages]=useState([]);
  const theme = useTheme();
  const fetchZones=async(qube_id)=>{
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/qube/${qube_id}/zone`,{
        method:"GET",
        headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" }
      })
      const data=await response.json();
      setZones(data.zones);
      console.log(zones);
    } catch (error) {
      
    }
  }
  const [openZoneDialog, setZoneOpenDialog] = useState(false);

  const handleZoneOpenDialog = () => setZoneOpenDialog(true);
  const handleZoneCloseDialog = () => setZoneOpenDialog(false);
  const handleCreateZone = async(zoneName) => {
    const zoneData={name:zoneName};
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/zone/${selectedQube}/new`,{
        method:"POST",
        headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },    
        body:JSON.stringify(zoneData)
      });
      const data=await response.json();
      console.log(zones);
      setZones((prevZones) => [...prevZones,data.savedZone ]);
    } catch (error) {
      
    }
  };


  useEffect(() => {
    
    const fetchQubes = async () => {
      
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/hub/${hubId}`,{
          method:"GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        setQubes(data.qubes);


        console.log(qubes);
      } catch (error) {
        console.error('Error fetching hubs:', error);
      }
    };

    const fetchMembers=async()=>{
      console.log(hubId);
      try {
        const response=await fetch(`https://surf-jtn5.onrender.com/hub/${hubId}/members`,{
          method:"GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data=await response.json();
        console.log(data.userDetails);
        setMembers(data.userDetails);
        console.log(members);
      } catch (error) {
        
      }
    }
    fetchQubes();
    fetchMembers();
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
     
    return () => {
      socket.off('receiveMessage');
    };
   

    
    
  }, []);
  
  const joinZone = async(zone) => {
    //console.log(zone);
    try {
      const messageChunkjson=await fetch(`https://surf-jtn5.onrender.com/message/${zone}`,{
        method:"GET"
      });
      const messageChunk=await messageChunkjson.json();
      setMessages(messageChunk);
    } catch (error) {
      
    }
    socket.emit('joinZone', zone);
  };
  
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateQube = async(name) => {
    //console.log('Qube Created:', name);
    const qubeData={qube_name:name};
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    try 
    {const response=await fetch(`https://surf-jtn5.onrender.com/qube/${hubId}/new`,{
    method:"POST",
    headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },    
    body:JSON.stringify(qubeData),

    })

    const data=await response.json();
    console.log(data);
    setQubes(prevQubes => [...prevQubes, data.savedQube]);
     console.log(qubes);
  }
     catch(error){
           console.log(error);
     }
  };


  // const qubes = [
  //   { id: 1, name: 'Qube 1' },
  //   { id: 2, name: 'Qube 2' },
  //   { id: 3, name: 'Qube 3' },
  // ];

  // const zones = selectedQube ? [
  //   { id: 1, name: 'Zone 1' },
  //   { id: 2, name: 'Zone 2' },
  //   { id: 3, name: 'Zone 3' },
  // ] : [];

  const hexagonStyle = {
    width: '50px',
    height: '28.87px',
    backgroundColor: '#40444b',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginRight: '16px',
    marginBottom: '14.43px',
  };

  const hexagonBeforeAfter = {
    content: '""',
    position: 'absolute',
    width: '0',
    borderLeft: '25px solid transparent',
    borderRight: '25px solid transparent',
  };

  const hexagonBefore = {
    ...hexagonBeforeAfter,
    borderBottom: '14.43px solid #40444b',
    top: '-14.43px',
  };

  const hexagonAfter = {
    ...hexagonBeforeAfter,
    borderTop: '14.43px solid #40444b',
    bottom: '-14.43px',
  };
  

  // const messages = [
  //   {
  //     text: 'This is a great message!',
  //     file: null,
  //     senderName: 'John Doe',
  //     senderAvatar: 'https://i.pravatar.cc/150?img=1',
  //     reactions: [{ type: 'like' }],
  //   },
  //   {
  //     text: 'This is a great message!',
  //     file: null,
  //     senderName: 'John Doe',
  //     senderAvatar: 'https://i.pravatar.cc/150?img=1',
  //     reactions: [{ type: 'like' }],
  //   },
  //   {
  //     text: 'This is a great message!',
  //     file: null,
  //     senderName: 'John Doe',
  //     senderAvatar: 'https://i.pravatar.cc/150?img=1',
  //     reactions: [{ type: 'like' }],
  //   },
  //   {
  //     text: 'This is a great message!',
  //     file: null,
  //     senderName: 'John Doe',
  //     senderAvatar: 'https://i.pravatar.cc/150?img=1',
  //     reactions: [{ type: 'like' }],
  //   },
  //   {
  //     text: 'This is a great message!',
  //     file: null,
  //     senderName: 'John Doe',
  //     senderAvatar: 'https://i.pravatar.cc/150?img=1',
  //     reactions: [{ type: 'like' }],
  //   },
  //   {
  //     text: 'This is a great message!',
  //     file: null,
  //     senderName: 'John Doe',
  //     senderAvatar: 'https://i.pravatar.cc/150?img=1',
  //     reactions: [{ type: 'like' }],
  //   }
    
  // ];

  return (
    <Box height="100vh">
  <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'black', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', height: '55px' }}>
    <Toolbar sx={{ justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px',
          bgcolor: 'white',
          pl: 2,
          pr: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }
        }}
      >
        <SearchIcon sx={{ color: 'primary.main' }} />
        <InputBase
          placeholder="Search for anything in your qube"
          sx={{
            height: '25px',
            color: 'inherit',
            ml: 1,
            width: '100%',
            pl: 1,
            '& .MuiInputBase-input': {
              padding: '8px',
              transition: 'width 0.3s ease',
              width: '50ch',
              '&:focus': {
                width: '70ch',
              },
            },
          }}
        />
      </Box>
    </Toolbar>
  </AppBar>

  <Box display="flex" height="calc(100% - 55px)">
    {/* Qubes List */}
    <Box
      width="10%"
      bgcolor="primary.main"
      color="white"
      p={2}
      display="flex"
      textAlign="center"
      flexDirection="column"
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
      <Tooltip
  title={
    <Box >
      <Typography variant="h5">Go to Hub Main Page</Typography>
    </Box>
  }
  arrow
  placement="right"
  sx={{
    '& .MuiTooltip-tooltip': {
      backgroundColor: '#f5f5f5', // Slightly white background
      color: 'black', // Text color
      boxShadow: theme.shadows[1], // Optional: Add some shadow for depth
    },
    '& .MuiTooltip-arrow': {
      color: '#f5f5f5', // Match the background color for the arrow
    }
  }}
>
  <Button color="secondary" onClick={()=>{setSelectedQube(null); setSelectedZone(null);}}>{hubname}</Button>
</Tooltip>

      {qubes ? (
        <List component="nav">
          {qubes.map((qube) => (
            <ListItem
              button
              key={qube.id}
              onClick={() => {setSelectedQube(qube._id); fetchZones(qube._id);}}
              sx={{
                padding: 0,
                minHeight: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              <Box
    sx={{
      width: selectedQube === qube._id ? 80 : 60,  // Change width when selected
      height: selectedQube === qube._id ? 60 : 60, // Change height when selected
      clipPath: selectedQube === qube._id ? 'none' : 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
      bgcolor: selectedQube === qube._id ? '#F5A623' : '#40444b', // Change background color when selected
      transition: 'all 0.3s ease', // Smooth transition for all properties
      borderRadius:2,
      marginBottom: '1rem',
      margin: '20px',
      borderColor: 'transparent',
      borderWidth: '2px',
      borderStyle: 'solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: selectedQube === qube._id ? 'black' : 'white', // Change text color when selected
      '&:hover': {
        transform: 'scale(1.1)',
        borderColor: '#F5A623',
      },
    }}
  >
    <Typography variant="body2" sx={{ lineHeight: 1 }}>
      {qube.name}
    </Typography>
  </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
      <Button color="secondary" size="small" variant="contained" onClick={handleOpenDialog}>Create a Qube</Button>
      <CreateQubeDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateQube} />
    </Box>
    <Divider orientation="vertical" flexItem />
    {/* Zones List */}
{selectedQube ? (
  <Box
    width="10%"
    bgcolor="#36393f"
    color="white"
    p={2}
    display="flex"
    flexDirection="column"
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
    <Typography variant="h6" mb={2} align="center">Zones</Typography>
    {zones.length > 0 ? (
      <List component="nav">
        {zones.map((zone) => (
  <ListItem
    button
    key={zone._id}
    onClick={() => {setSelectedZone(zone); joinZone(zone._id);}}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&.Mui-selected': {
        bgcolor: '#40444b',
        '& .arrow': {
          transform: 'rotate(90deg)',
        },
      },
      '&:hover': {
        bgcolor: '#40444b',
      },
      '& .arrow': {
        transition: 'transform 0.3s ease',
      },
    }}
  >
    <Box display="flex" alignItems="center">
      <Typography sx={{ flexGrow: 1 }}>{zone.name}</Typography>
    </Box>
    <ChevronRightIcon className="arrow" />
  </ListItem>
))}

      </List>
    ) : (
      <Box display="flex" flexDirection="column" alignItems="center">
        
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
) : (
  <HubOverview members={members} owner={ownerId} />
)}
    <Divider orientation="vertical" flexItem />

    {selectedZone && selectedQube ? (
  <Box
    width="80%"
    bgcolor="#36393f"
    p={2}
    display="flex"
    flexDirection="column"
    height="parent" // Full height to make it easier to handle positioning
  >
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6">{selectedZone.name}</Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EarbudsIcon />}
          sx={{
            backgroundColor: '#FFEB3B',
            color: '#36393f',
            mr: 2,
            '&:hover': {
              backgroundColor: '#FFD700',
            }
          }}
        >
          Gather
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AccountTreeIcon />}
          sx={{
            backgroundColor: '#FFEB3B',
            color: '#36393f',
            '&:hover': {
              backgroundColor: '#FFD700',
            }
          }}
        >
          Mindmap
        </Button>
      </Box>
    </Box>
    
    {/* Scrollable Area */}
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
      <Box p={2} bgcolor="#36393f" borderRadius="8px">
        <Typography variant="h1">Welcome to the {selectedZone.name} Zone</Typography>
        <Typography variant="h3" sx={{ color: '#9e9e9e' }}>Talk with your Qube members here. We organise your files for you !</Typography>
      </Box>
      {messages?.map((message, index) => (
        <ChatItem key={index} message={message} isOwnMessage={message.senderName===username?true:null} />
      ))}
    </Box>
    {/* Message Widget Area */}
    <Box sx={{ mt: 2 }}>
      <MessageWidget zone={selectedZone._id} message={message} setMessage={setMessage} />
    </Box>
  </Box>
) : (
  selectedQube && !selectedZone && (<QubeOverview qubeid={selectedQube} />)
)}
  </Box>
</Box>

  );
};

export default HubPage;
