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
  Tooltip
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
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import CreateHubDialog from "../Dialog/CreateHubDialog"; // Adjust path as needed

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isCreateHubDialogOpen, setIsCreateHubDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
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

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Surf
          </Typography>
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
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
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
        <img
          src={user.avatar_url} // Make sure avatarUrl is defined and contains the URL of the avatar image
          alt="avatar"
          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </Box>
    )}
  >
    <MenuItem mt="100" onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
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
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
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
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
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
