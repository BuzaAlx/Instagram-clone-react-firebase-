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
