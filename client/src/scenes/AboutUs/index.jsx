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
  textAlign: 'center',
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
  width: '90%',
  height: '450px',
  maxWidth: '300px',
  margin: 'auto',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
    textDecoration: 'none',
    boxShadow: '0 0 30px rgba(99, 90, 204, 1)',
  },
});

const Hexagon = styled('div')({
  width: '120px',
  height: '120px',
  margin: '0 auto 20px auto',
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  backgroundColor: '#635acc',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5px',
});

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
      <Container>
        <ContentContainer>
          <SectionTitle variant="h2">The Project</SectionTitle>
          <Typography variant="body1" sx={{ maxWidth: '800px', margin: 'auto', fontSize: '18px', lineHeight: '1.6' }}>
            EloKo is a secure community-building and cloud-based resource sharing platform
          </Typography>
        </ContentContainer>
        
        <ContentContainer>
          <SectionTitle variant="h2">The People</SectionTitle>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TeamCard>
                <Hexagon>
                  <Image src="https://res.cloudinary.com/df9fz5s3o/image/upload/v1723274804/samples/man-portrait.jpg" alt="Team Member 1" />
                </Hexagon>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Maurya Samanta</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
                    Founder, Can't live without Horlicks and racing cars
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamCard>
                <Hexagon>
                  <Image src="https://res.cloudinary.com/df9fz5s3o/image/upload/v1723274804/samples/man-portrait.jpg" alt="Team Member 2" />
                </Hexagon>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Arya Bhattacharya</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
                    Design Lead, May have traded people for money
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamCard>
                <Hexagon>
                  <Image src="https://res.cloudinary.com/df9fz5s3o/image/upload/v1723274804/samples/man-portrait.jpg" alt="Team Member 3" />
                </Hexagon>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Rituraj Ray</Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
                    Social Media and Marketing, Crazy about many things
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
          </Grid>
        </ContentContainer>
      </Container>
    </AboutUsContainer>
  );
};

export default AboutUs;
