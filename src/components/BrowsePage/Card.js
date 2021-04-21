import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import { db, storage } from "../../Firebase";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Comments from "./Card/Comments";
import LikeButton from "./Card/LikeButton";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  getPostAvatarThunk,
  deletePostThunk,
} from "../../redux/Posts/posts.reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #dbdbdb",
    borderRadius: "3px",
  },
  cardMedia: {
    paddingTop: "56%",
  },
  CardActions: {
    justifyContent: "space-between",
    height: theme.spacing(6),
    padding: 0,
  },

  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

function CustomCard({ post, user }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePostThunk(post));
  };

  useEffect(() => {
    dispatch(getPostAvatarThunk(post.username, post.id));
  }, [post.postCreatorAvatar]);

  return (
    <div>
      <Card className={styles.root}>
        <CardHeader
          avatar={
            <Link to={`/user/${post.username}`}>
              <Avatar src={post.postCreatorAvatar} />
            </Link>
          }
          action={
            post.username === user.displayName && (
              <IconButton onClick={handleDelete}>
                <DeleteOutlineIcon />
              </IconButton>
            )
          }
          title={post.username}
          subheader={moment(post?.timestamp?.toDate()).fromNow()}
        />
        <CardMedia
          className={styles.cardMedia}
          image={post.imageUrl}
          title={`post by ${post.username}`}
        />
        <CardActions disableSpacing className={styles.CardActions}>
          <Box display="flex" alignItems="center">
            <LikeButton likes={post.likes} user={user} postId={post.id} />
          </Box>
          <IconButton>
            <BookmarkBorderSharpIcon />
          </IconButton>
        </CardActions>

        <CardContent className={styles.cardContent}>
          <Typography style={{ fontSize: "14px" }}>
            <strong>{post.username}</strong> {post.caption}
          </Typography>
        </CardContent>

        <Comments postId={post.id} user={user} comments={post.comments} />
      </Card>
    </div>
  );
}

export default CustomCard;
