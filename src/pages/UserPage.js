import React, { useState, useEffect } from "react";
import { useStyles } from "./styles/UserPageStyles";
import { Container, Grid, Typography, Button, Box } from "@material-ui/core";
import { useParams, useHistory, Link } from "react-router-dom";

import PostsList from "../components/PostsList";
import * as ROUTES from "../constants/routes";
import { auth } from "../Firebase";
import UserAvatar from "../components/UserAvatar";
import AddPost from "../components/AddPost";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../redux/User/user.reducer";

import Logo from "../resources/images/Logo.png";

function UserPage() {
  const [postsCount, setPostsCount] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { currentUser: user } = useSelector((state) => state.user);
  const CurrentUserPage = user.displayName === userId ? true : false;

  const handleLogout = () => {
    dispatch(signOutUserStart(history));
  };

  return (
    <Container>
      <Grid component="header" container className={classes.header}>
        <Grid item xs={6} container>
          <Link to={ROUTES.BROWSE}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "103px", display: "block" }}
            />
          </Link>
        </Grid>
        <Grid item xs={6} container justify="flex-end" alignItems="center">
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{ width: "80px" }}
          >
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

export default UserPage;
