import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const AboutUsContainer = styled('div')({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e1e2f 30%, #635acc 100%)',
  color: '#faf6f6',
  fontFamily: 'Roboto, sans-serif',
});

const ContentContainer = styled(Box)({
  textAlign: 'left',
  marginBottom: '40px',
  padding: '0 20px',
});

const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '25px',
});

const TeamCard = styled(Card)({
  backgroundColor: '#1e1e2f',
  color: '#ffffff',
  borderRadius: '20px',
  textAlign: 'left',
  padding: '20px',
  boxShadow: '0 0 15px rgba(99, 90, 204, 0.7)',
  border: '2px solid #635acc',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  maxWidth: '300px',
  width: '100%',
  height: 'auto',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
    boxShadow: '0 0 30px rgba(99, 90, 204, 1)',
  },
});

const Footer = styled('footer')(({ theme }) => ({
  //background: 'linear-gradient(135deg, #1e1e2f 30%, #635acc 100%)',
  color: '#fff',
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  // /boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  marginTop:20
}));

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <AboutUsContainer>
      <Typography
        variant="h1"
        sx={{ fontWeight: 'bold', color: '#ffffff', ml: '20px', padding: '10px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        EloKo
      </Typography>
      <Container sx={{marginBottom:25}}>
        <ContentContainer>
          <SectionTitle variant="h2">The Project</SectionTitle>
          <Typography variant="body1" sx={{ maxWidth: '800px', margin: 'auto', fontSize: '18px', lineHeight: '1.6' }}>
            EloKo is a secure chat application for both personal chats as well as communities equipped with efficient file management.
          </Typography>
        </ContentContainer>

        <ContentContainer>
          <SectionTitle variant="h2">The People</SectionTitle>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4} md={4}>
              <TeamCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Maurya Samanta</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>
                    Co-Founder & App Developer
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
            
            <Grid item xs={12} sm={4} md={4}>
              <TeamCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Rituraj Ray</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>
                    Co-Founder & Social Media Marketing
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TeamCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Nabyendu Das</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>
                    Web Developer
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
          </Grid>
        </ContentContainer>
      </Container>
      <Footer>
        <Typography variant="caption">
          &copy; 2024 EloKo. All rights reserved.
        </Typography>
      </Footer>
    </AboutUsContainer>
  );
};

export default AboutUs;
