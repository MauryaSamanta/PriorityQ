import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const TagDialog = ({ open, onClose, qubeId }) => {
  const [tags, setTags] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (qubeId) {
      // Fetch tags based on qubeId
      const fetchTags = async () => {
        try {
          const response = await fetch(`http://localhost:3001/tags/${qubeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setTags(data.tags || []);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };

      fetchTags();
    }
  }, [qubeId, token]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          Tags
          <IconButton edge="end" color="inherit" onClick={onClose} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent>
        {tags.length === 0 ? (
          <Box textAlign="center" p={2}>
            <Typography variant="body1" color="text.secondary">
              Welcome to your tag store. Keep your tags clean.
            </Typography>
          </Box>
        ) : (
          <Box>
            {tags.map((tag, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ color: '#854be3', mb: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Typography>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const handleTagClick = (tag) => {
  console.log(`Tag clicked: ${tag}`);
  // Add your tag click handling logic here
};

export default TagDialog;
