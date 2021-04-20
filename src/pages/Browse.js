import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import { auth, db } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import CustomCard from "../components/Card";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../redux/User/user.reducer";
import { getPostsThunk } from "../redux/Posts/posts.reducer";

import useFullPageLoader from "../hooks/useFullPageLoader";
import FullPageLoader from "../components/Loader";
import Logo from "../resources/images/Logo.png";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: 5,
    paddingTop: 5,
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
    position: "sticky ",
    top: 0,
    background: "white",
    zIndex: "1",
    height: "55px",
  },
  box: {
    justifyContent: "flex-end",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    gap: 10,
  },
  userName: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function Browse() {
  const { isLoadingUserReducer } = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);

  FullPageLoader;

  const handleLogout = () => {
    dispatch(signOutUserStart(history));
  };

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);
  const { posts } = useSelector((state) => state.posts);

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
            <CustomCard key={post.id} post={post} user={user} />
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Browse;
