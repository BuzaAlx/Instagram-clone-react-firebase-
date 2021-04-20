import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { deleteLikeThunk, addLikeThunk } from "../../redux/Posts/posts.reducer";

import { db } from "../../Firebase";

function LikeButton({ postId, user, likes }) {
  const found = likes.find((like) => like.username === user.displayName);
  console.log(found);
  const [isPostLiked, setIsPostLiked] = useState(found);
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();
    let username = user.displayName;

    if (found) {
      dispatch(deleteLikeThunk(postId, found));
      setIsPostLiked(false);
    }
    if (!found) {
      dispatch(addLikeThunk(postId, username));
      // db.collection("posts").doc(postId).collection("likes").add({
      //   username,
      // });
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
};

export default LikeButton;
