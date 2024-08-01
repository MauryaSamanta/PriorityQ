import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, Button, Typography, Container, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import JoinHubWidget from './JoinHubWidget';

const Hubs = ({ userId, setPrincipalHubs }) => {
  const [hubs, setHubs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/hub`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setHubs(data);
        setPrincipalHubs(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching hubs:', error);
      }
    };

    fetchHubs();
  }, [userId]);

  const handleMenuOpen = (event, hub) => {
    setAnchorEl(event.currentTarget);
    setSelectedHub(hub);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedHub(null);
  };
  const handleLeaveHub=async()=>{
    const membershipData={userid:userId};
          try {
            const reponse=await fetch(`https://surf-jtn5.onrender.com/hub/${selectedHub._id}/member`,{
              method:"DELETE",
              headers: {"Content-Type": "application/json" },    
              body:JSON.stringify(membershipData)
            })
            setHubs(hubs.filter(hub => hub?._id !== selectedHub._id));
            handleMenuClose();
          } catch (error) {
            console.log(error);
            
          }
  }
  const handleDeleteHub = async () => {
    try {
      const deletion=await fetch(`https://surf-jtn5.onrender.com/hub/${selectedHub._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(await deletion.json());
      setHubs(hubs.filter(hub => hub?._id !== selectedHub._id));
      handleMenuClose();
    } catch (error) {
      console.error('Error deleting hub:', error);
    }
  };

  return (
    <Container>
      {hubs.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {hubs.map((hub) => (
            <Grid item key={hub?._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: '10px',
                  position: 'relative',
                  height: '150px', // Increase the height
                  '&:hover': {
                    transform: 'scale(1.05)',
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                  },
                }}
              >
                <IconButton
                  onClick={(e) => handleMenuOpen(e, hub)}
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                >
                  <MoreVertIcon />
                </IconButton>
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {hub?.avatar_url ? (
                      <div style={{ width: '50px', height: '50px', marginRight: '16px', clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)', overflow: 'hidden' }}>
                        <img
                          src={hub.avatar_url}
                          alt={`${hub.name} avatar`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : null}
                    <div>
                      <Typography variant="h5" component="div">
                        {hub?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {hub?.description}
                      </Typography>
                    </div>
                  </div>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/hub/${hub?._id}`)} style={{ alignSelf: 'flex-end', marginTop: '16px' }}>
                    ENTER HUB
                  </Button>
                </CardContent>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    style: {
                      animation: 'fadeIn 0.3s',
                    }
                  }}
                >
                  <MenuItem onClick={handleDeleteHub}>
                    <DeleteIcon style={{ marginRight: '8px' }} />
                    Delete Hub
                  </MenuItem>
                  <MenuItem onClick={handleLeaveHub}>
                  <ExitToAppIcon style={{ marginRight: '8px'}}/>
                  Leave Hub
                  </MenuItem>
                </Menu>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <JoinHubWidget setHubs={setHubs} />
      )}
    </Container>
  );
};

export default Hubs;
