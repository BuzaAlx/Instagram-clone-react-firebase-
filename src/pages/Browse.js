import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Input,
  TextField,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import { auth, db } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import CustomCard from "../components/Card";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import ImageUpload from "../components/ImageUpload";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: 5,
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

function Browse({ user }) {
  const [posts, setPosts] = useState([]);
  console.log(user);
  const classes = useStyles();
  const history = useHistory();

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

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
    return () => unsubscribe();
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
        {/* <ImageUpload
          username={user && user.displayName}
          userImg={user && user.photoURL}
        /> */}
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
