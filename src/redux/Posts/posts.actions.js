import { postsTypes } from "./posts.types";

export const setPostsActionCreator = (posts) => ({
  type: postsTypes.SET_POSTS,
  payload: posts,
});

export const addCommentsActionCreator = (data) => ({
  type: postsTypes.ADD_COMMENTS,
  payload: data,
});
