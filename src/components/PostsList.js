import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Fade } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { db } from "../Firebase";
import Image from "../components/PostList/Image";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    gap: "5px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  photo: {
    width: "33%",
  },
}));

function PostsList({ userId, setPostsCount }) {
  const classes = useStyles();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("username", "==", userId)
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setUserPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        )
      );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPostsCount(userPosts.length);
  }, [userPosts]);

  return (
    <div>
      <GridList cols={3} className={classes.gridList}>
        {userPosts.map((post) => (
          <Image key={post.id} post={post.post} postId={post.id} />
        ))}
      </GridList>
    </div>
  );
}

export default PostsList;
