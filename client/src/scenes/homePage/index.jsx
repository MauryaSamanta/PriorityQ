import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import Hubs from "scenes/widgets/Hubs";
import UserWidget from "scenes/widgets/UserWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import FlexBetween from "components/FlexBetween";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id,avatar_url } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        
        gap="0.5rem"
        justifyContent="space-between"
      >   
          <FlexBetween>
          <Typography variant="h1" component="div" padding="2rem">Welcome Back👋</Typography>
          </FlexBetween>
          <Box display="flex" justifyContent="space-between" width="100%">
          {isNonMobileScreens && (
            <Box flexBasis="25%" mr="2rem">
              <UserWidget _id={_id} avatar_url={avatar_url} />
            </Box>
          )}
          <Box flexBasis={isNonMobileScreens ? "70%" : "100%"}>
            <Hubs userId={_id} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
