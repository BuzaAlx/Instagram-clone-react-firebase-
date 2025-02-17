import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../components/BrowsePage/Card";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../redux/User/user.reducer";
import { getPostsThunk } from "../redux/Posts/posts.reducer";

import FullPageLoader from "../components/Loader";
import Logo from "../resources/images/Logo.png";
import { resetDataActionCreator } from "../redux/Posts/posts.actions";
import { useStyles } from "./styles/BrowsePageStyles";

function BrowsePage() {
  const { isLoadingUserReducer } = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const handleLogout = () => {
    dispatch(signOutUserStart(history));
  };

  useEffect(() => {
    dispatch(getPostsThunk());
    return () => dispatch(resetDataActionCreator());
  }, []);

  if (isLoadingUserReducer) {
    return <FullPageLoader text={"Welcome"} />;
  }

  return (
    <React.Fragment>
      <Container>
        <Grid component="header" container className={classes.header}>
          <Grid item xs={4} container>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "103px", display: "block" }}
            />
          </Grid>

          <Box xs={4} className={classes.box}>
            <Link to={`/user/${user?.displayName}`}>
              <Avatar src={user ? user.photoURL : "X"} />
            </Link>

            <Typography color="primary" className={classes.userName}>
              {user ? user.displayName : "Loading..."}
            </Typography>
            <Button
              style={{ width: "80px" }}
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Grid>
        <Box>
          {posts?.map((post) => (
            <Card key={post.id} post={post} user={user} />
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default BrowsePage;
