import { postsTypes } from "./posts.types";

export const setPostsActionCreator = (posts) => ({
  type: postsTypes.SET_POSTS,
  payload: posts,
});
