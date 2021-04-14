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
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Comments from "./Card/Comments";
import LikeButton from "./Card/LikeButton";
import moment from "moment";

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

function CustomCard({ post, id, user }) {
  const [avatar, setAvatar] = useState(null);
  const styles = useStyles();

  const handleDelete = () => {
    let postId = id;
    if (post.username !== user.displayName) {
      return;
    }
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  useEffect(() => {
    db.collection("users")
      .doc("images")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setAvatar(doc.data()[post.username]);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [post.username]);

  return (
    <div>
      <Card className={styles.root}>
        <CardHeader
          avatar={
            <Link to={`/user/${post.username}`}>
              <Avatar src={avatar} />
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
          subheader={moment(post.timestamp.toDate()).fromNow()}
        />
        <CardMedia
          className={styles.cardMedia}
          image={post.imageUrl}
          title={`post by ${post.username}`}
        />
        <CardActions disableSpacing className={styles.CardActions}>
          <Box display="flex" alignItems="center">
            <LikeButton user={user} postId={id} />
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
        <Comments postId={id} user={user} />
      </Card>
    </div>
  );
}

CustomCard.propTypes = {
  post: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default CustomCard;
