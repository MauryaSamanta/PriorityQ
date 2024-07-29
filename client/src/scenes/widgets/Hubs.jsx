import React, { useState, useEffect} from 'react';
import {Navigate, useNavigate}  from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, Button, Typography, Container, Grid, Box } from '@mui/material';
import JoinHubWidget from './JoinHubWidget';

const Hubs = ({ userId }) => {
  const [hubs, setHubs] = useState([]);
  const token = useSelector((state) => state.token);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await fetch(`https://surf-jtn5.onrender.com/hub`,{
          method:"GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        setHubs(data);
      } catch (error) {
        console.error('Error fetching hubs:', error);
      }
    };

    fetchHubs();
    console.log(hubs);
    if(!hubs)
      return null;
  }, [userId]);

  
  
  return (
    <Container>
  {hubs.length>0? (<Grid container spacing={2} justifyContent="center">
    {hubs.map((hub) => (
      <Grid item key={hub._id} xs={12} sm={6} md={6}>
        <Card
          sx={{
            borderRadius:'10px',
            '&:hover': {
              transform: 'scale(1.05)',
              borderColor: 'primary.main',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
              borderWidth: '2px',
              borderStyle: 'solid',
            }
          }}
        >
          <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            {hub.avatar_url ? (
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
                  {hub.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {hub.description}
                </Typography>
              </div>
            </div>
            <Button variant="contained" color="primary" onClick={() => navigate(`/hub/${hub._id}`)}>
              ENTER HUB
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>):(<JoinHubWidget setHubs={setHubs}/>)}
</Container>

  
  );
};

export default Hubs;
