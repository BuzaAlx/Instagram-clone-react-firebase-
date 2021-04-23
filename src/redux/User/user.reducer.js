import { userTypes } from "./user.types";
import handleUserProfile, { getUserPosts } from "./user.helpers";
import { auth } from "../../Firebase";
import { getCurrentUser, addPost, getAvatar } from "./user.helpers";
import {
  addPostActionCreator,
  setLoadingActionCreator,
  setUserPosts,
  signInSuccess,
  signOutUserSuccess,
  setSelectedUserImgActionCreator,
} from "./user.actions";
import { SIGN_IN } from "../../constants/routes";
import newUser from "../../img/newUser.webp";
import { deleteImgFromStorage } from "../Posts/post.helpers";

export const getInitialUser = () => {
  return localStorage.getItem("authUser");
};

let user = getInitialUser();

const INITIAL_STATE = {
  currentUser: user,
  userErr: [],
  isLoadingUserReducer: false,
  selectedUserData: {
    selectedUserPosts: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      localStorage.setItem("authUser", JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case userTypes.SET_USER_POSTS:
      let selectedUserData = {
        ...state.selectedUserData,
        selectedUserPosts: action.payload,
      };

      return {
        ...state,
        selectedUserData,
      };
    case userTypes.ADD_POST:
      return {
        ...state,
        selectedUserPosts: [...state.selectedUserPosts, action.payload],
      };
    case userTypes.SET_USER_LOADING:
      return {
        ...state,
        isLoadingUserReducer: action.payload,
      };
    case userTypes.SET_SELECTED_USER_IMAGE:
      let selectedUserDataCopy = {
        ...state.selectedUserData,
        selectedUserImage: action.payload,
      };
      return {
        ...state,
        selectedUserData: selectedUserDataCopy,
      };
    case userTypes.RESET_SELECTED_USER_DATA:
      return {
        ...state,
        selectedUserData: INITIAL_STATE.selectedUserData,
      };
    default:
      return state;
  }
};

export default userReducer;

export const getSnapshotFromUserAuth = (user, additionalData = {}) => async (
  dispatch
) => {
  try {
    const userRef = await handleUserProfile({
      userAuth: user,
      additionalData,
    });

    const snapshot = await userRef.get();

    dispatch(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );

    dispatch(setLoadingActionCreator(false));
  } catch (err) {
    console.log(err);
  }
};

export const SignInStart = (userCredentials) => async (dispatch) => {
  const { emailAddress, password } = userCredentials;
  dispatch(setLoadingActionCreator(true));
  auth
    .signInWithEmailAndPassword(emailAddress, password)
    .then(({ user }) => {
      dispatch(getSnapshotFromUserAuth(user));
    })
    .catch((error) => {
      console.log(error);
    });
  dispatch(setLoadingActionCreator(false));
};

export const SignUpUserStart = ({ displayName, email, password }) => async (
  dispatch
) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName, photoURL: newUser };
    dispatch(getSnapshotFromUserAuth(user, additionalData));
  } catch (err) {
    console.log(err);
  }
};

export const CheckUserSessionStart = () => async (dispatch) => {
  try {
    dispatch(setLoadingActionCreator(true));
    const userAuth = await getCurrentUser();
    if (!userAuth) {
      localStorage.removeItem("authUser");
      return;
    }
    dispatch(getSnapshotFromUserAuth(userAuth));
  } catch (err) {
    console.log(err);
  }
};

export const signOutUserStart = (history) => async (dispatch) => {
  try {
    auth
      .signOut()
      .then(() => localStorage.removeItem("authUser"))
      .then(history.push(SIGN_IN))
      .catch((error) => {
        throw new Error(error);
      });
    dispatch(signOutUserSuccess(history));
  } catch (error) {
    console.log(error);
  }
};

export const getUserPostsThunk = (userId) => async (dispatch) => {
  try {
    let posts = await getUserPosts(userId);

    dispatch(setUserPosts(posts));
  } catch (error) {
    console.log(error);
  }
};

export const addNewPostThunk = (data, userId) => async (dispatch) => {
  try {
    await addPost(data);
    dispatch(getUserPostsThunk(userId));
  } catch (error) {
    console.log(error);
  }
};

export const getUserAvatarThunk = (userId) => async (dispatch) => {
  try {
    let avatarURL = await getAvatar(userId);
    dispatch(setSelectedUserImgActionCreator(avatarURL));
  } catch (error) {
    console.log(error);
  }
};

export const deleteImageFromStorageThunk = (photoURL) => async (dispatch) => {
  try {
    await deleteImgFromStorage(photoURL);
  } catch (error) {
    console.log(error);
  }
};
