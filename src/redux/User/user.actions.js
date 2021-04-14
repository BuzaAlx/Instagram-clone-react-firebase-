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

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const setUserPosts = (posts) => ({
  type: userTypes.SET_USER_POSTS,
  payload: posts,
});

export const addPostActionCreator = (post) => ({
  type: userTypes.ADD_POST,
  payload: post,
});
