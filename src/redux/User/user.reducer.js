import { userTypes } from "./user.types";
import handleUserProfile, { getUserPosts } from "./user.helpers";
import { auth } from "../../Firebase";
import {
  getCurrentUser,
  addPost,
  getAvatar,
  getImageUrl,
} from "./user.helpers";
import {
  setLoadingActionCreator,
  setUserPosts,
  signInSuccess,
  signOutUserSuccess,
  setSelectedUserImgActionCreator,
  setProgressActionCreator,
  setNewUserAvatarActionCreator,
} from "./user.actions";
import { SIGN_IN } from "../../constants/routes";
import newUser from "../../resources/images/newUser.webp";
import { deleteImgFromStorage } from "../Posts/post.helpers";
import firebase from "firebase";
import { storage, db } from "../../Firebase";

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
  postUploadProgress: 0,
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
    case userTypes.SET_PROGRESS:
      return {
        ...state,
        postUploadProgress: action.payload,
      };
    case userTypes.SET_USER_AVATAR:
      let currentUserCopy = { ...state.currentUser };
      currentUserCopy.photoURL = action.payload;
      return {
        ...state,
        currentUser: currentUserCopy,
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

export const uploadNewPostThunk = (image, caption, username, close) => async (
  dispatch
) => {
  try {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        dispatch(setProgressActionCreator(progress));
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // complete function
        let imageURL = await getImageUrl("images", image);
        dispatch(
          addNewPostThunk(
            {
              imageUrl: imageURL,
              caption: caption,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            username
          )
        );
        close();
        dispatch(setProgressActionCreator(0));
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const uploadNewAvatarThunk = (image, user, handleClose) => async (
  dispatch
) => {
  try {
    if (user.photoURL) {
      dispatch(deleteImageFromStorageThunk(user.photoURL));
    }
    const uploadTask = storage.ref(`MYusers/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
        let imageURL = await getImageUrl("MYusers", image);

        db.collection("myusers").doc(user.id).set(
          {
            photoURL: imageURL,
          },
          { merge: true }
        );
        dispatch(getUserAvatarThunk(user.displayName));
        dispatch(setNewUserAvatarActionCreator(imageURL));
        handleClose();
      }
    );
  } catch (error) {
    console.log(error);
  }
};
