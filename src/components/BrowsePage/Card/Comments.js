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
  // getPostCommentsThunk,
  postCommentThunk,
  deleteCommentThunk,
} from "../../../redux/Posts/posts.reducer";

const useStyles = makeStyles((theme) => ({
  commentBox: {
    display: "flex",
    height: theme.spacing(5),
    gap: "10px",
    padding: "0 16px 16px",
  },
  commentInput: {
    flexGrow: "1",
  },
  deleteIcon: {
    position: "absolute",
    right: 0,
  },
  username: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.light,
  },
  inputBox: {
    position: "relative",
    display: "flex",
    height: theme.spacing(5),
    gap: "10px",
    width: "100%",
  },
  smileButton: {
    position: "absolute",
    right: 0,
  },
  text: {
    fontSize: "13px",
    margin: 0,
  },
}));

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
