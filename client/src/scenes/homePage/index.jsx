import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useMediaQuery, Button, TextField, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import Hubs from 'scenes/widgets/Hubs';
import UserWidget from 'scenes/widgets/UserWidget';
import FlexBetween from 'components/FlexBetween';
import Badge from '@mui/material/Badge';
import ExploreIcon from '@mui/icons-material/Explore';
import InboxIcon from '@mui/icons-material/Inbox';
import InboxMobile from 'scenes/widgets/InboxMobile';
import InboxPC from 'scenes/widgets/InboxPC';
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, avatar_url } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const joinHubRef = useRef(null);
  const inputRef = useRef(null);
  const [hubs, setPrincipalHubs] = useState([]);
  const [value, setValue] = useState(1); // State for BottomNavigation
  const [requests,setrequests]=useState(0);
  const handleJoinHubClick = async () => {
    if (!showInput) setShowInput(!showInput);
    else if (code.trim()) {
      const codeData = { code: code };
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/invite/${_id}/add`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(codeData)
        });
        const data = await response.json();
        window.location.reload();
      } catch (error) {
        console.error('Error joining hub:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (
      joinHubRef.current && !joinHubRef.current.contains(event.target) &&
      inputRef.current && !inputRef.current.contains(event.target)
    ) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getReqs = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/request/${_id}`, {
          method: "GET",
        });
        const reqs = await response.json();
        const noreq=reqs.length;
        setrequests(noreq);

      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    getReqs();
  }, []);

  return (
    <Box sx={{display:'flex', flexDirection:'column'}}>
      <Navbar />
      {value===1?(<Box>
      <Box
        width="100%"
        padding="0rem 6% 6% 6%"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <FlexBetween>
          {(!showInput || isNonMobileScreens) && (
            <Typography variant="h1" component="div" padding="0 2rem 2rem 2rem"   >
              Welcome Back👋
            </Typography>
          )}
          <Box display="flex" alignItems="center" ref={joinHubRef}>
            {showInput && (
              <TextField
                variant="outlined"
                placeholder="Enter hub code"
                padding="2rem"
                value={code}
                onChange={handleInputChange}
                ref={inputRef}
                sx={{
                  width: showInput ? (isNonMobileScreens ? '300px' : '200px') : '0px',
                  opacity: showInput ? 1 : 0,
                  transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
                  overflow: 'hidden',
                  marginBottom: !isNonMobileScreens ? '6.5rem' : '0rem'
                }}
              />
            )}
            {hubs.length > 0 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleJoinHubClick}
                sx={{
                  marginLeft: '1rem',
                  marginBottom: showInput && !isNonMobileScreens ? '6.5rem' : '0rem'
                }}
              >
                Join Hub
              </Button>
            ) : (<></>)}
          </Box>
        </FlexBetween>
        <Box display="flex" justifyContent="space-between" width="100%">
          {isNonMobileScreens && (
            <Box flexBasis="25%" mr="2rem">
              <UserWidget _id={_id} avatar_url={avatar_url} />
            </Box>
          )}
          <Box flexBasis={isNonMobileScreens ? "70%" : "100%"}>
            <Hubs userId={_id} setPrincipalHubs={setPrincipalHubs} />
          </Box>
        </Box>
      </Box>
      </Box>):(!isNonMobileScreens?<InboxMobile setreqs={setrequests}/>:<InboxPC setreqs={setrequests}/>)}
      {/* Bottom Navigation Bar */}
       <Box position="fixed" bottom="0px" left="0" width="100%" zIndex="1000"   sx={{
    margin: 0,  // Ensure no margin is added
    padding: 0, // Ensure no padding is added
  }}>
  <BottomNavigation
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
      // Add navigation logic here if necessary
    }}
    sx={{
      backgroundColor: 'primary.main',
      boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
    }}
  >
    <BottomNavigationAction
  label="Inbox"
  icon={
    <Badge
      badgeContent={requests > 0 ? requests : 0}
      color="error"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      overlap="circular"
      sx={{
        '& .MuiBadge-badge': {
          fontSize: '0.75rem',
          minWidth: '16px',
          height: '16px',
          padding: '0 4px',
        },
      }}
    >
      <img src='/assets/mail.png' alt="My Hubs" style={{ width: '20px', height: '20px', color:'#f6f6f6' }} />
    </Badge>
  }
  sx={{
    color: 'white',
    '&.Mui-selected': {
      color: 'secondary.main',
      textShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)',
      background: 'linear-gradient(145deg, #6a5acd, #483d8b)',
      borderRadius: '8px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    },
    '&:hover': {
      background: 'linear-gradient(145deg, #483d8b, #6a5acd)',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
      transform: 'scale(1.05)',
      transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
    },
    '& .MuiBottomNavigationAction-label': {
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      fontSize: '0.875rem',
    },
  }}
/>
    <BottomNavigationAction
      label="My Hubs"
      icon={<img src='/assets/smarthome.png' alt="My Hubs" style={{ width: '20px', height: '20px', color:'#f6f6f6' }} />}
      sx={{
        color: 'white',
        '&.Mui-selected': {
          color: 'secondary.main',
          textShadow: '0px 0px 8px rgba(255, 255, 255, 0.8)',
          background: 'linear-gradient(145deg, #6a5acd, #483d8b)',
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        },
        '&:hover': {
          background: 'linear-gradient(145deg, #483d8b, #6a5acd)',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        },
        '& .MuiBottomNavigationAction-label': {
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          fontSize: '0.875rem',
        },
      }}
    />
    </BottomNavigation>
</Box>

    </Box>
  );
};

export default HomePage;
