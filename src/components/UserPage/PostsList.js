import React, { useEffect } from "react";
import GridList from "@material-ui/core/GridList";
import Post from "./Post";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getUserPostsThunk } from "../../redux/User/user.reducer";
import { resetSelectedUserDataActionCreator } from "../../redux/User/user.actions";
import { useStyles } from "../styles/PostsListStyles";

function PostsList({ userId, setPostsCount }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedUserPosts } = useSelector(
    (state) => state.user.selectedUserData
  );

  useEffect(() => {
    dispatch(getUserPostsThunk(userId));
    return () => dispatch(resetSelectedUserDataActionCreator());
  }, []);

  useEffect(() => {
    setPostsCount(selectedUserPosts.length);
  }, [selectedUserPosts]);

  return (
    <div>
      <GridList cols={3} className={classes.gridList}>
        {selectedUserPosts.map((post) => (
          <Post key={post.id} post={post} postId={post.id} />
        ))}
      </GridList>
    </div>
  );
}

PostsList.propTypes = {
  userId: PropTypes.string,
  setPostsCount: PropTypes.func.isRequired,
};

export default PostsList;
