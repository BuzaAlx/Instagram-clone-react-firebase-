import { postsTypes } from "./posts.types";

export const setPostsActionCreator = (posts) => ({
  type: postsTypes.SET_POSTS,
  payload: posts,
});

export const addCommentsActionCreator = (data) => ({
  type: postsTypes.ADD_COMMENTS,
  payload: data,
});

export const setCommentActionCreator = (data) => ({
  type: postsTypes.SET_COMMENT,
  payload: data,
});

export const resetDataActionCreator = () => ({
  type: postsTypes.RESET_DATA,
});

export const setLoadingActionCreator = (flag) => ({
  type: postsTypes.SET_LOADING,
  payload: flag,
});

export const deleteCommentActionCreator = (data) => ({
  type: postsTypes.DELETE_COMMENT,
  payload: data,
});

export const deleteLikeActionCreator = (data) => ({
  type: postsTypes.DELECTE_LIKE,
  payload: data,
});

export const addLikeActionCreator = (data) => ({
  type: postsTypes.ADD_LIKE,
  payload: data,
});

export const setPostAvatarActionCreator = (data) => ({
  type: postsTypes.SET_POST_AVATAR,
  payload: data,
});

export const postDelectedActionCreator = (id) => ({
  type: postsTypes.POST_WAS_DELETED,
  payload: id,
});
