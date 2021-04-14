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
  const { posts } = useSelector((state) => state.posts);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser: user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(signOutUserStart(history));
  };

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Grid component="header" container className={classes.header}>
          <Grid item xs={4}>
            <Typography variant="h5">Instagram</Typography>
          </Grid>

          <Box xs={4} className={classes.box}>
            <Link to={`/user/${user?.displayName}`}>
              <Avatar src={user ? user.photoURL : "X"} />
            </Link>

            <h4 className={classes.userName}>
              {user ? user.displayName : "Loading..."}
            </h4>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Grid>
        <Box>
          {posts.map((post) => (
            <CustomCard key={post.id} {...post} user={user} />
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Browse;
