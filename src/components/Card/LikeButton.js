import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";

import { db } from "../../Firebase";

function LikeButton({ postId, user }) {
  const [likes, setLikes] = useState([]);
  const [isPostLiked, setIsPostLiked] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(
            snapshot.docs.map((doc) => ({ id: doc.id, like: doc.data() }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const handleLike = (e) => {
    e.preventDefault();

    const found = likes.find((like) => like.like.username === user.displayName);

    if (found) {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(found.id)
        .delete();
      setIsPostLiked(false);
    }
    if (!found) {
      db.collection("posts").doc(postId).collection("likes").add({
        username: user.displayName,
      });
      setIsPostLiked(true);
    }
  };

  return (
    <>
      <IconButton onClick={handleLike}>
        {isPostLiked ? (
          <FavoriteIcon style={{ color: "f06292" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
      <Typography>
        <strong>{likes.length}</strong> отметок нравиться
      </Typography>
    </>
  );
}

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LikeButton;
