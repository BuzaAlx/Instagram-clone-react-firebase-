import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase";
import {
  Typography,
  Button,
  Box,
  CardContent,
  IconButton,
  Paper,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import firebase from "firebase";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import AddEmoji from "./AddEmoji";
import {
  postCommentThunk,
  deleteCommentThunk,
} from "../../../redux/Posts/posts.reducer";
import { useStyles } from "../../styles/CommentsStyles";

function Comments({ postId, user, comments }) {
  const [comment, setComment] = useState("");
  const styles = useStyles();
  const dispatch = useDispatch();

  const postComment = (e) => {
    e.preventDefault();

    dispatch(
      postCommentThunk({
        postId,
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
    setComment("");
  };

  const handleDelete = (id) => {
    dispatch(deleteCommentThunk(postId, id));
  };

  return (
    <>
      <CardContent style={{ paddingTop: 0 }}>
        {comments?.map(({ comment, id }) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            key={id}
            position="relative"
            mt={1}
            mb={1}
          >
            <Typography className={styles.text}>
              <Box component="strong" mr={1}>
                {comment.username}
              </Box>
              {comment.text}
            </Typography>

            {comment.username === user.displayName && (
              <IconButton
                onClick={() => handleDelete(id)}
                className={styles.deleteIcon}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </CardContent>
      <form>
        <Box className={styles.commentBox}>
          <Box className={styles.inputBox}>
            <Input
              disableUnderline
              color="primary"
              className={styles.commentInput}
              type="text"
              placeholder="add comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <AddEmoji setComment={setComment} comment={comment} />
          </Box>
          <Button
            variant="outlined"
            color="primary"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            post comment
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Comments;
