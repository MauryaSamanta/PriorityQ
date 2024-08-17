import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@emotion/react';
import ChatItem from '../widgets/ChatItem';  // Assuming ChatItem is in the same directory

const TagContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const TagItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const EmptyMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  padding: theme.spacing(4),
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  maxHeight: theme.spacing(30), // Fixed height for the message area (adjust as needed)
  overflowY: 'auto',  // Enable vertical scrolling if messages exceed the height
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const TagStoreDialog = ({ open, qubeid, onClose }) => {
  const [tagCountsArray, setTagCountsArray] = useState([]);
  const [messages, setMessages] = useState([]);
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(3);
  const theme = useTheme();
  const { _id } = ((state) => state.user);

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/tag/${qubeid}`, {
          method: "GET",
        });
        const data = await response.json();
        setTagCountsArray(data.tagCountsArray);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    if (open) {
      getTags();
    }
  }, [qubeid, open]);

  const fetchTexts = async (tag) => {
    let tagData = { tag: tag };
    try {
      const response = await fetch(`https://surf-jtn5.onrender.com/tag/message/${qubeid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagData),
      });
      const datax = await response.json();
      setMessages(datax);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleBackToTags = () => {
    setMessages([]);  // Clear messages to show tags again
    setVisibleMessagesCount(3);  // Reset visible messages count
  };

  const handleLoadMore = () => {
    setVisibleMessagesCount((prevCount) => prevCount + 3);
  };

  return (
    <Dialog open={open} onClose={() => { onClose(); setMessages([]); }} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, mb: 2, color: theme.palette.primary.contrastText }}>
        Tag Store
      </DialogTitle>
      <DialogContent>
        {messages.length > 0 ? (
          <Box>
            <Button onClick={handleBackToTags} variant="text" color="primary" sx={{ mb: 2 }}>
              Back to #
            </Button>
            <MessagesContainer
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
              {messages.slice(0, visibleMessagesCount).map((message, index) => (
                <ChatItem key={index} message={message} isOwnMessage={message.sender_id === _id} />
              ))}
            </MessagesContainer>
            {visibleMessagesCount < messages.length && (
              <Button onClick={handleLoadMore} variant="text" color="primary">
                Load More
              </Button>
            )}
          </Box>
        ) : (
          tagCountsArray.length > 0 ? (
            <TagContainer>
              {tagCountsArray.map(({ tag, count }) => (
                <TagItem key={tag} onClick={() => fetchTexts(tag)}>
                  <Typography variant="body1" fontWeight="bold">
                    {tag}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {count}
                  </Typography>
                </TagItem>
              ))}
            </TagContainer>
          ) : (
            <EmptyMessage variant="h6">
              Welcome to your Tag Store. Keep your tags clean.
            </EmptyMessage>
          )
        )}
      </DialogContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button onClick={() => { onClose(); setMessages([]); setVisibleMessagesCount(3); }} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default TagStoreDialog;
