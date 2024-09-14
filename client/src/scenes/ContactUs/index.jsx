import React from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, Button, Link } from '@mui/material';






function HelpCenterSection() {
  return (
    <section style={{ padding: '3rem 0', backgroundColor: 'white' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="caption" color="black" display="block" gutterBottom>
            Help Center
          </Typography>
          <Typography variant="h2" gutterBottom color="black">
            Find Answers to Your Questions
          </Typography>
          <Typography variant="body1" color="black">
            Browse our FAQs, tutorials, and search for solutions to your issues.
          </Typography>
        </div>
        <TextField 
  fullWidth 
  variant="outlined" 
  placeholder="Search help topics..." 
  type="search" 
  margin="normal"
  sx={{
    '& .MuiInputBase-input': {
      color: 'black', // Text color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black', // Border color
      },
      '&:hover fieldset': {
        borderColor: 'black', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // Border color when focused
      },
    },
  }}
/>

        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  FAQs
                </Typography>
                <Typography color="textSecondary">
                  Answers to common questions.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  View FAQs
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tutorials
                </Typography>
                <Typography color="textSecondary">
                  Step-by-step guides and walkthroughs.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  View Tutorials
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Support
                </Typography>
                <Typography color="textSecondary">
                  Get in touch with our support team.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

function AnnouncementsSection() {
  return (
    <section style={{ padding: '3rem 0' ,backgroundColor:"black"}}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="caption" color="white" display="block" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="h2"  color="white" gutterBottom>
            Stay Up to Date
          </Typography>
          <Typography variant="body1" color="white">
            Check out our latest news, updates, and important announcements.
          </Typography>
        </div>
        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  New Feature Release
                </Typography>
                <Typography color="textSecondary">
                  We've just launched a new feature that will revolutionize your workflow.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Product Update
                </Typography>
                <Typography color="textSecondary">
                  We've made some improvements to our product based on your feedback.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Important Notice
                </Typography>
                <Typography color="textSecondary">
                  Please be aware of this important update that may affect your account.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  View Notice
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

function ServerSettingsSection() {
  return (
    <section style={{ padding: '3rem 0', backgroundColor: 'white' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="caption" color="black" display="block" gutterBottom>
            Server Settings
          </Typography>
          <Typography variant="h2"   color="black" gutterBottom>
            Manage Your Server
          </Typography>
          <Typography variant="body1"  color="black">
            Configure your server settings, integrations, and notifications.
          </Typography>
        </div>
        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notifications
                </Typography>
                <Typography color="textSecondary">
                  Customize your notification preferences.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Integrations
                </Typography>
                <Typography color="textSecondary">
                  Connect your server with other tools and services.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Manage Integrations
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Security
                </Typography>
                <Typography color="textSecondary">
                  Secure your server and protect your data.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Configure Security
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

function DeveloperSupportSection() {
  return (
    <section style={{ padding: '3rem 0' ,backgroundColor:"black"}}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="caption" color="white" display="block" gutterBottom>
            Developer Support
          </Typography>
          <Typography variant="h2" color="white" gutterBottom >
            Get Help with Development
          </Typography>
          <Typography variant="body1" color="white">
            Access resources, tools, and support for your development projects.
          </Typography>
        </div>
        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Documentation
                </Typography>
                <Typography color="textSecondary">
                  Comprehensive guides and references.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Community
                </Typography>
                <Typography color="textSecondary">
                  Join discussions and get help from the community.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Support
                </Typography>
                <Typography color="textSecondary">
                  Reach out to our support team for technical assistance.
                </Typography>
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default function DashboardSections() {
  return (
    <>
      <HelpCenterSection />
      <AnnouncementsSection />
      <ServerSettingsSection />
      <DeveloperSupportSection />
    </>
  );
}
