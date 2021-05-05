import { userTypes } from "./user.types";

export const signInStart = (userCredentials) => ({
  type: userTypes.SIGN_IN_START,
  payload: userCredentials,
});

export const signUpUserStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signOutUserSuccess = (data) => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
  payload: data,
});

export const setUserPosts = (posts) => ({
  type: userTypes.SET_USER_POSTS,
  payload: posts,
});

export const addPostActionCreator = (post) => ({
  type: userTypes.ADD_POST,
  payload: post,
});

export const setLoadingActionCreator = (flag) => ({
  type: userTypes.SET_USER_LOADING,
  payload: flag,
});

export const setSelectedUserImgActionCreator = (imageURL) => ({
  type: userTypes.SET_SELECTED_USER_IMAGE,
  payload: imageURL,
});

export const resetSelectedUserDataActionCreator = () => ({
  type: userTypes.RESET_SELECTED_USER_DATA,
});

export const setProgressActionCreator = (progress) => ({
  type: userTypes.SET_PROGRESS,
  payload: progress,
});

export const setNewUserAvatarActionCreator = (imageURL) => ({
  type: userTypes.SET_USER_AVATAR,
  payload: imageURL,
});
