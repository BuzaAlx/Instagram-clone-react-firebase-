import React, { useState, useEffect } from "react";
import { useStyles } from "./styles/UserPageStyles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
} from "@material-ui/core";
import { useParams, useHistory, Link } from "react-router-dom";

import PostsList from "../components/PostsList";
import * as ROUTES from "../constants/routes";
import { auth } from "../Firebase";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import UserAvatar from "../components/UserAvatar";
import AddPost from "../components/AddPost";

function userPage({ user }) {
  const [postsCount, setPostsCount] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  const { userId } = useParams();
  const CurrentUserPage = user.displayName === userId ? true : false;

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        history.push(ROUTES.SIGN_IN);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Grid component="header" container className={classes.header}>
        <Grid item xs={6}>
          <Typography variant="h5">Instagram</Typography>
        </Grid>
        <Grid item xs={6} container justify="flex-end" alignItems="center">
          <IconButton>
            <Link to={ROUTES.BROWSE}>
              <HomeOutlinedIcon fontSize="large" color="primary" />
            </Link>
          </IconButton>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="space-around" className={classes.main}>
        <UserAvatar userId={userId} user={user} />
        <Box>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography className={classes.username} variant="h4">
              {userId}
            </Typography>

            {!CurrentUserPage && (
              <>
                <Button size="medium" variant="outlined" color="primary">
                  Subscribe
                </Button>
              </>
            )}
            {CurrentUserPage && <AddPost user={user} />}
          </Box>
          <Box display="flex" className={classes.activity}>
            <Typography variant="h6">{postsCount} posts</Typography>
            <Typography variant="h6">0 followers</Typography>
            <Typography variant="h6">0 following</Typography>
          </Box>
        </Box>
      </Grid>
      <PostsList setPostsCount={setPostsCount} userId={userId} />
    </Container>
  );
}

export default userPage;
