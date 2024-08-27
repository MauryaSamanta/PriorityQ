import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, Avatar, TextField, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import AddFriendDialog from 'scenes/Dialog/AddFriendDialog';
import RequestsDialog from 'scenes/Dialog/RequestsDialog';
import ChatPage from './ChatPage';

const InboxPC = () => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const [showFriend, setShowFriend] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chat,setchat]=useState(null);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/chat/${userId}`, {
          method: "GET"
        });
        const data = await response.json();
        setChats(data.chats || []);
        setFilteredChats(data.chats || []);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [userId, token]);

  useEffect(() => {
    const filtered = chats.filter((chat) =>
      chat.members.find(member => member._id.toString() !== userId)?.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchQuery, chats, userId]);

  const handleAddFriend = () => {
    setShowFriend(true);
  };

  const handleCloseFriend = () => {
    setShowFriend(false);
  };

  const handleReq = () => {
    setShowReq(true);
  };

  const handleCloseReq = () => {
    setShowReq(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'primary',
        cursor:'pointer'
      }}
    >
      {/* Left Side - 30% */}
      <Box
        sx={{
          width: '20%',
          padding: '1rem',
          backgroundColor: 'primary',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '25px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              flex: 1,
              fontSize: '8px',
              marginRight: '0.5rem',
            }}
            onClick={handleAddFriend}
          >
            Add Friends
          </Button>
          <Button
            variant="contained"
            startIcon={<NotificationsIcon />}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '25px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
              flex: 1,
              fontSize: '8px',
              marginLeft: '0.5rem',
            }}
            onClick={handleReq}
          >
            Friend Requests
          </Button>
          <AddFriendDialog open={showFriend} onClose={handleCloseFriend} />
          <RequestsDialog open={showReq} onClose={handleCloseReq} userid={userId} />
        </Box>

        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search chats"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{
            marginBottom: '1rem',
            borderRadius: '25px',
            backgroundColor: 'primary',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              color: 'white',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary',
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
              color: 'white',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Chats List */}
        
        <List sx={{ backgroundColor: 'primary', borderRadius: '15px',  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', overflowY: 'auto', height: '100%' }}>
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ListItem
                key={chat._id}
                sx={{
                  marginBottom: '0.5rem',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#343635',
                  },
                }}
                onClick={() => setchat(chat)}
              >
                <Avatar
                  src={chat.members.find(member => member._id.toString() !== userId)?.avatar_url}
                  sx={{ marginRight: '1rem' }}
                />
                <ListItemText
                  primary={chat.members.find(member => member._id.toString() !== userId)?.username}
                  secondary={chat.lastMessage}
                  sx={{
                    '& .MuiListItemText-primary': {
                      
                      fontSize: '15px',
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '15px',
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', color: 'text.secondary', marginTop: '2rem' }}>
              {searchQuery ? 'You have no friends with such username.' : 'No recent chats. Start a conversation!'}
            </Typography>
          )}
        </List>
      </Box>

      {/* Right Side - 70% */}
      <Box
        sx={{
          width: '80%',
          backgroundColor: '#36393f',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:'10px'
        }}
      >
       {!chat?( <Typography variant="h4" sx={{ color: 'text.primary' }}>
          Select a chat to view messages
        </Typography>):(<ChatPage  
            chat={chat?._id}
            friendId={chat?.members.find(member => member._id.toString() !== userId)._id} 
            friendName={chat?.members.find(member => member._id.toString() !== userId).username}
            friendAvatar={chat?.members.find(member => member._id.toString() !== userId).avatar_url}
            />)}
      </Box>
    </Box>
  );
};

export default InboxPC;
