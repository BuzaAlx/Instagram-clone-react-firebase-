import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteLikeThunk,
  addLikeThunk,
} from "../../../redux/Posts/posts.reducer";

function LikeButton({ postId, user, likes }) {
  const found = likes.find((like) => like.username === user.displayName);
  const [isPostLiked, setIsPostLiked] = useState(found);
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();

    if (found) {
      dispatch(deleteLikeThunk(postId, found));
      setIsPostLiked(false);
    }
    if (!found) {
      dispatch(addLikeThunk(postId, user.displayName));
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
