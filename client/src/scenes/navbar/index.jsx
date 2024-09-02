import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip,
  Slide,
  Avatar
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  MoreVert
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import CreateHubDialog from "../Dialog/CreateHubDialog"; // Adjust path as needed
import EditProfileDialog from "scenes/Dialog/EditProfileDialog";
import UserProfileDialog from "scenes/Dialog/UserProfileDialog";
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isCreateHubDialogOpen, setIsCreateHubDialogOpen] = useState(false);
  const [editdialog,setEditdialog]=useState(false);
  const [userdialog,setUserdialog]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [avatar,setAvatar]=useState(user.avatar_url);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral?.light;
  const dark = theme.palette.neutral?.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.username} `;

  const handleCreateHubClick = () => {
    setIsCreateHubDialogOpen(true);
  };

  const handleCloseCreateHubDialog = () => {
    setIsCreateHubDialogOpen(false);
  };
  
  const handleedit=()=>{
    setEditdialog(true);
  }

  const handlecloseedit=()=>{
    setEditdialog(false);
  }

  const handleopenuser=()=>{
    setUserdialog(true);
  }

  const handlecloseuser=()=>{
    setUserdialog(false);
  }
  return (
    <>
      <FlexBetween padding={isNonMobileScreens?"0rem 2rem 0 2rem":"0 4% 0 2%"} backgroundColor="parent">
        <FlexBetween gap="1.75rem" sx={{ height: 'clamp(7rem, 7rem, 7rem)' }}>
  <img
    src="/assets/EloKoMainLogo.png"
    alt="EloKo"
    onClick={() => navigate("/home")}
    style={{
      width: 'auto',
      height: 'clamp(10rem, 10rem, 10rem)',// Same height as the Typography font size
      cursor: 'pointer',
    }}
    onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
    onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
  />
</FlexBetween>


        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            
           
            <Button
              sx={{ border: '2px solid', borderColor: 'primary.main' }}
              color="primary"
              onClick={() => navigate("/support")}
            >
              Talk to Support
            </Button>
            <Tooltip
              title={
                <Box p={2}>
                  <Typography variant="body2">
                    A hub serves as a central home for your team, where you can create and manage various 'qubes' for different projects or topics. Within a hub, you can organize and collaborate on multiple qubes, each representing a distinct area of work or discussion.
                  </Typography>
                </Box>
              }
              arrow
              placement="bottom"
            >
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateHubClick}
                >
                  Start a New Hub
                </Button>
              </span>
            </Tooltip>
            <FormControl variant="standard" value={fullName}>
  <Select
    value={fullName}
    sx={{
      backgroundColor: 'transparent',
      width: "50px",
      borderRadius: "50%",
      p: 0,
      display: 'flex',
      alignItems: 'center',
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
      },
      "& .MuiSvgIcon-root": {
        display: 'none',
      },
      "& .MuiSelect-select:focus": {
        backgroundColor: 'transparent',
      },
    }}
    input={<InputBase />}
    renderValue={() => (
      <Box display="flex" alignItems="center">
        <Avatar
          src={user.avatar_url} // Make sure avatarUrl is defined and contains the URL of the avatar image
          alt="avatar"
          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </Box>
    )}
  >
    <MenuItem mt="100" onClick={() => dispatch(setLogout())}><Typography color="#fc0320">Log Out</Typography></MenuItem>
  </Select>
</FormControl>

          </FlexBetween>
        ) : (
          
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
           <Slide direction="left" in={isMobileMenuToggled} mountOnEnter unmountOnExit>
          <Box
  position="fixed"
  right="0"
  bottom="0"
  height="100%"
  zIndex="10"
  maxWidth="500px"
  minWidth="300px"
  backgroundColor={background}
  borderRadius="16px 0 0 16px"
  boxShadow="0px 4px 12px rgba(0, 0, 0, 0.3)"  // Add shadow for raised effect
>

            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <FormControl variant="standard" value={fullName}>
  <Select
    value={fullName}
    sx={{
      backgroundColor: 'transparent',
      width: "50px",
      borderRadius: "50%",
      p: 0,
      display: 'flex',
      alignItems: 'center',
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
      },
      "& .MuiSvgIcon-root": {
        display: 'none',
      },
      "& .MuiSelect-select:focus": {
        backgroundColor: 'transparent',
      },
    }}
    input={<InputBase />}
    renderValue={() => (
      <Box display="flex" alignItems="center">
        <Avatar
          src={avatar} // Make sure avatarUrl is defined and contains the URL of the avatar image
          alt="avatar"
          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
        />
        
      </Box>
      
    )}
  >
    <MenuItem mt="100" onClick={ handleopenuser}><Typography>EloKo Identity</Typography></MenuItem>
    <MenuItem mt="100" onClick={() => handleedit()}><Typography>Edit Profile</Typography></MenuItem>
    <MenuItem mt="100" onClick={() => dispatch(setLogout())}><Typography color="#fc0320">Log Out</Typography></MenuItem>
  </Select>
</FormControl>
<EditProfileDialog open={editdialog} onClose={handlecloseedit} setAvatarMain={setAvatar}/>
<UserProfileDialog open={userdialog} onClose={handlecloseuser} user={user}/>
              <Button
                variant="contained"
                sx={{ border: '2px solid', borderColor: 'primary.main' }}
                color="primary"
                onClick={() => navigate("/support")}
              >
                Talk to Support
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateHubClick}
              >
                Start a New Hub
              </Button>
            </FlexBetween>
           
          </Box>
          </Slide>
        )}
        
      </FlexBetween>
      
      {/* Create Hub Dialog */}
      <CreateHubDialog
        open={isCreateHubDialogOpen}
        onClose={handleCloseCreateHubDialog}
        userId={user._id}
      />
    </>
  );
};

export default Navbar;
