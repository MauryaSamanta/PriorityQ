import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useMediaQuery, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import Hubs from 'scenes/widgets/Hubs';
import UserWidget from 'scenes/widgets/UserWidget';
import FlexBetween from 'components/FlexBetween';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, avatar_url } = useSelector((state) => state.user);
  const {token}=useSelector((state)=>state.token);
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const joinHubRef = useRef(null);
  const inputRef = useRef(null);
  const [hubs,setPrincipalHubs]=useState([]);
  const handleJoinHubClick = async() => {
    if(!showInput)
    setShowInput(!showInput);
    else if(code.trim())
    {const codeData = { code: code };
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
    }}
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

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <FlexBetween>
          <Typography variant="h1" component="div" padding="2rem">
            Welcome Back👋
          </Typography>
          <Box display="flex" alignItems="center" ref={joinHubRef}>
           {showInput && (
              <TextField
              variant="outlined"
              placeholder="Enter hub code"
              value={code}
              onChange={handleInputChange}
              ref={inputRef}
              sx={{
                width: showInput ? (isNonMobileScreens ? '300px' : '200px') : '0px',
                opacity: showInput ? 1 : 0,
                transition: 'width 0.5s ease-in-out, opacity 0.5s ease-in-out',
                overflow: 'hidden',
              }}
            />
            )}
             <Button 
              variant="contained" 
              color="primary" 
              onClick={handleJoinHubClick}
              sx={{
                // backgroundColor: '#FFEB3B',
                // color: '#36393f',
                // '&:hover': {
                //   backgroundColor: '#FFD700',
                // },
                marginLeft: '1rem'
              }}
            >
              Join Hub
            </Button>
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
    </Box>
  );
};

export default HomePage;