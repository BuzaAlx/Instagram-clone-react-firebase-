import { userTypes } from "./user.types";
import handleUserProfile, { getUserPosts } from "./user.helpers";
import { auth } from "../../Firebase";
import { getCurrentUser, addPost } from "./user.helpers";
import {
  addPostActionCreator,
  setLoadingActionCreator,
  setUserPosts,
  signInSuccess,
  signOutUserSuccess,
} from "./user.actions";
import { SIGN_IN } from "../../constants/routes";
// import { getInitialUser } from "./user.helpers";

const newUserImg =
  "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg";

export const getInitialUser = () => {
  return localStorage.getItem("authUser");
};

let user = getInitialUser();
console.log(user);

const INITIAL_STATE = {
  currentUser: user,
  selectedUserPosts: [],
  userErr: [],
  isLoadingUserReducer: false,
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
      return {
        ...state,
        selectedUserPosts: action.payload,
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
    const additionalData = { displayName, photoURL: newUserImg };
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
