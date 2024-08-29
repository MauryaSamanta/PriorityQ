import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, Divider, TextField, Button, AppBar, Toolbar, InputBase, Tooltip, useMediaQuery
  , MenuItem, IconButton,Menu, Slide
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import AccountTreeIcon from '@mui/icons-material/AccountTree'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings'
import EditHubDialog from 'scenes/Dialog/EditHubDialog';
import HubOverview from 'scenes/widgets/HubOverview';
import File from 'scenes/widgets/File';
import MobileFile from 'scenes/widgets/MobileFile';
import CreateQubeDialog from 'scenes/Dialog/CreateQubeDialog';
import CreateZoneDialog from 'scenes/Dialog/CreateZoneDialog';
import TagStoreDialog from 'scenes/Dialog/TagStoreDialog';
import QubeOverview from 'scenes/widgets/QubeOverview';
import MessageWidget from 'scenes/widgets/MessageWidget';
import ChatItem from 'scenes/widgets/ChatItem';
import MobileHubPage from 'scenes/widgets/MobileHubPage';
import  io  from 'socket.io-client';
import EditQubeDialog from 'scenes/Dialog/EditQubeDialog';
const socket = io('https://surf-jtn5.onrender.com');

const HubPage = () => {
  const navigate = useNavigate();
  const { hubId,ownerId,hubname } = useParams();
  const location = useLocation();
  const [des,setdes]=useState(location.state.des);
  const [avatar,setavatar]=useState(location.state.avatar);
  const [banner,setbanner]=useState(location.state.banner);
  //console.log(des);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const {_id,username}=useSelector((state)=>state.user);
  const token = useSelector((state) => state.token);
  const [settings, setSettings]=useState(false);
  const [qubes,setQubes]=useState([]);
  const [selectedQube, setSelectedQube] = useState(null);
  const [editQube, setEditQube]=useState(null);
  const [zones,setZones]=useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [members,setMembers]=useState([]);
  const [messages,setMessages]=useState([]);
  const [newmessages,setNewMessages]=useState([]);
  const [message,setMessage]=useState('');
  const [unread, setUnread]=useState('');
  const [showFiles,setshowfiles]=useState(false);
  const [wallpaper, setmainwall]=useState(null);
  const [storeDialog,setStoreDialog]=useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

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
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  //const [messages,setMessages]=useState([]);
  const theme = useTheme();
  const fetchZones=async(qube_id)=>{
    setZones([]);
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/qube/${qube_id}/zone`,{
        method:"GET",
        headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" }
      })
      const data=await response.json();
      setZones(data.zones);
      setSelectedZone(data.zones[0]);
      joinZone(data.zones[0]._id);
      //console.log(zones);
    } catch (error) {
      
    }
  }
  const [openZoneDialog, setZoneOpenDialog] = useState(false);

  const handleZoneOpenDialog = () => setZoneOpenDialog(true);
  const handleZoneCloseDialog = () => setZoneOpenDialog(false);
  const handleCreateZone = async(zoneName) => {
    //console.log(selectedQube);
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
      
      setMessages((prevMessages) => [...prevMessages,...newmessages, message]);
      setNewMessages([]);
    });
    socket.on('deleteMessage',(delmessage)=>{
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== delmessage)
      );
    })
    
    return () => {
      socket.off('receiveMessage');
    };
   

    
    
  }, []);
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView();
  }, [messages]);

  const joinZone = async (zone) => {
    const userzone = { userid: _id, zoneid: zone };
    try {
      const messageChunkjson = await fetch(`https://surf-jtn5.onrender.com/message/${zone}`, {
        method: "GET",
      });
      const messageChunk = await messageChunkjson.json();
      
      // const unreadMessageIdResponse = await fetch(`https://surf-jtn5.onrender.com/read/getunread`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(userzone),
      // });
      // const unreadmsg = await unreadMessageIdResponse.json();
      // //console.log(unread.id);
      // if(unreadmsg.id)
      // {
      //   const unreadIndex = messages?.findIndex((message) => message._id === unreadmsg.id);
      //   setUnread(unreadIndex+1);
      //   console.log(unreadmsg.id);
      // }
        setMessages(messageChunk);
      
    } catch (error) {
      console.error("Error joining zone:", error);
    }
  
    socket.emit('joinZone', zone);
  };
  const exitZone = async (zone) => {
    socket.emit("exitZone", zone._id);
    // let lastread = '';
  
    // if (newmessages.length > 0) {
    //   lastread = newmessages[newmessages.length - 1]._id;
    // } else {
    //   lastread = messages[messages.length - 1]._id;
    // }
    
    // const userzone={userid:_id, zoneid:zone, lastmessageid:lastread};
    // try {
    //   const response=await fetch(`https://surf-jtn5.onrender.com/read/update`,{
    //     method:"POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(userzone)
    //   });
      
    // } catch (error) {
      
    // }
    // setNewMessages([]);
  };
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenStoreDialog = () => {
    setStoreDialog(true);
  };

  const handleCloseStoreDialog = () => {
    setStoreDialog(false);
  };
  const handleCreateQube = async(name,nickname) => {
    //console.log('Qube Created:', name);
    const qubeData={qube_name:name,nick_name:nickname};
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
    
    setQubes(prevQubes => [...prevQubes, data.savedQube]);
     
  }
     catch(error){
           console.log(error);
     }
  };
  const [OpenEditQubeDialog, setOpenEditQubeDialog]=useState(false);
  const handleOpenEditQubeDialog=()=>{
    setOpenEditQubeDialog(true);
  }
  const handleCloseEditQubeDialog=()=>{
    setOpenEditQubeDialog(false);
    setEditQube(null);
  }
  const handleEditQube = async (name, nickname) => {
    const qubeData = { qubename: name, qubenickname: nickname };
    try {
      const response = await fetch(`https://surf-jtn5.onrender.com/qube/${editQube._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qubeData),
      });
      if(!name)
        name=editQube.name;
      if(!nickname)
        nickname=editQube.nickname;
      if (response.ok) {
        setQubes((prevQubes) =>
          prevQubes.map((qube) =>
            qube._id === editQube._id ? { ...qube, name, nickname } : qube
          )
        );
      }
    } catch (error) {
      console.error('Error updating qube:', error);
    }
  };

  const handleDelQube=async()=>{
    try {
      const response=await fetch(`https://surf-jtn5.onrender.com/qube/${editQube._id}`,{
        method:"DELETE"
      });
      if(response.ok){
        setQubes(qubes.filter(qube => qube?._id !== editQube._id))
      }
    } catch (error) {
      
    }
  }
  const handlesetting=()=>{
    setSettings(true);
  }
  const closesetting=()=>{
    setSettings(false);
  }
  return (<>
   {isNonMobileScreens?( <Box height="100vh">
    <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'black', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', height: '55px' }}>
  <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Box
      sx={{ flexGrow: 1 }} // Ensures space is taken up on the left, pushing the right content to the edge
    />
    <Typography
      variant="body1"
      sx={{
        color: 'white',
        fontWeight: 'bold',
        mr: 2, // Margin to the right of the text
        cursor:'pointer'
      }}
    >
      Hub Settings
    </Typography>
    <IconButton
      sx={{
        color: 'black',
        '&:hover': {
          transform: 'rotate(360deg)',
          transition: 'transform 0.3s ease',
        }
      }}
      onClick={handlesetting}
    >
      <SettingsIcon sx={{color:'white'}} />
    </IconButton>
  </Toolbar>
  <EditHubDialog open={settings} onClose={closesetting} hub={hubname} setavatar={setavatar} setdes={setdes} />
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
  <Button color="secondary" onClick={()=>{if(selectedZone) exitZone(selectedZone); 
    setSelectedQube(null); setSelectedZone(null);}}>{hubname}</Button>
</Tooltip>
      <Box sx={{ 
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
      }}>
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
                },
                bgcolor:'transparent',
                clipPath:'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
              }}
            >
              <Tooltip
  title={
    <Box >
      <Typography variant="h5">{qube.name}</Typography>
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
      <Box
      sx={{
        position: 'relative', // Needed for positioning the icon
        width: selectedQube === qube._id ? 60 : 60,
        height: selectedQube === qube._id ? 60 : 60,
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
        '&:hover': {
          transform: 'scale(1.1)',
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem >Edit Qube</MenuItem>
        
      </Menu>
    </Box>
   
  </Tooltip>
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
      </Box>
      <Button color="secondary" size="small" variant="contained" onClick={handleOpenDialog}>Create a Qube</Button>
      <CreateQubeDialog open={openDialog} onClose={handleCloseDialog} onCreate={handleCreateQube} />
      <EditQubeDialog qube={editQube} open={OpenEditQubeDialog} onClose={handleCloseEditQubeDialog} onEdit={handleEditQube} onDel={handleDelQube}/>
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
     <List component="nav" width="100%">
     {zones.map((zone) => (
       <ListItem
         button
         key={zone._id}
         onClick={() => { 
          exitZone(selectedZone);
          setSelectedZone(zone); joinZone(zone._id); }}
         sx={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           width: '100%',
           bgcolor: selectedZone._id === zone._id ? '#555759' : 'transparent', // Conditional bgcolor
           borderRadius: selectedZone._id === zone._id ? '4px' : '0px', // Conditional border-radius
           '&:hover': {
             bgcolor: selectedZone._id !== zone._id ? '#40444b' : '#555759', // Change hover color if not selected
           },
           '& .arrow': {
             transition: 'transform 0.3s ease',
             transform: selectedZone._id === zone._id ? 'rotate(90deg)' : 'rotate(0deg)', // Conditional arrow rotation
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
        
        
      </Box>
    )}
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
) : (
  <HubOverview members={members} owner={ownerId} des={des} avatar={avatar} banner={banner} setbanner={setbanner} qubes={qubes}
   setwall={setmainwall}
  />
)}
    <Divider orientation="vertical" flexItem />

    {selectedZone &&  (
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
      
      <Button
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
      </Button>
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
            height: isNonMobileScreens?'100%':'100vh',
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
          {isNonMobileScreens?(<File wallpaper={wallpaper} setWallpaperMain={setmainwall} />
          ):(
            <MobileFile wallpaper={wallpaper} setWallpaperMain={setmainwall}/>
          )}
        </Box>
      </Slide>
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
      <Box p={2} bgcolor="#36393f" borderRadius="8px" ref={containerRef}>
        <Typography variant="h1">Welcome to the {selectedZone.name} Zone</Typography>
        <Typography variant="h3" sx={{ color: '#9e9e9e' }}>Talk with your Qube members here. We organise your files for you !</Typography>
        
      </Box>
      
      {messages?.map((message, index) => (
        <ChatItem key={index} message={message} isOwnMessage={message.sender_id===_id?true:null}  />
      ))}
      <div ref={bottomRef} />
      
      
      </Box>
    
    {/* Message Widget Area */}
    <Box sx={{ mt: 2 }}>
      <MessageWidget qube={selectedQube} zone={selectedZone._id} message={message} setMessage={setMessage} />
    </Box>
  </Box>
)}
  </Box>
</Box>):(<MobileHubPage
  hubname={hubname}
  des={des}
  avatar={avatar}
  banner={banner}
  setdes={setdes}
  setavatar={setavatar}
  setbanner={setbanner}
  qubes={qubes}
  zones={zones}
  members={members}
  ownerId={ownerId}
  messages={messages}
  _id={_id} // Assuming this is the ID for the logged-in user
  setMessage={setMessage}
  message={message}
  setSelectedQube={setSelectedQube}
  fetchZones={fetchZones}
  setSelectedZone={setSelectedZone}
  joinZone={joinZone}
  exitZone={exitZone}
  handleOpenDialog={handleOpenDialog}
  handleCloseDialog={handleCloseDialog}
  handleCreateQube={handleCreateQube}
  editQube={editQube}
  setEditQube={setEditQube}
  OpenEditQubeDialog={OpenEditQubeDialog}
  handleOpenEditQubeDialog={handleOpenEditQubeDialog}
  handleCloseEditQubeDialog={handleCloseEditQubeDialog}
  handleEditQube={handleEditQube}
  handleDelQube={handleDelQube}
  handleMenuClose={handleMenuClose}
  anchorEl={anchorEl}
  setAnchorEl={setAnchorEl}
  openDialog={openDialog}
  handleZoneOpenDialog={handleZoneOpenDialog}
  handleZoneCloseDialog={handleZoneCloseDialog}
  handleCreateZone={handleCreateZone}
  openZoneDialog={openZoneDialog}
  handleOpenStoreDialog={handleOpenStoreDialog}
  storeDialog={storeDialog}
  handleCloseStoreDialog={handleCloseStoreDialog}
/>
)}
</>
  );
};

export default HubPage;