import { userTypes } from "./user.types";
import handleUserProfile from "./user.helpers";
import { auth } from "../../Firebase";
import { getCurrentUser } from "./user.helpers";
import { signInSuccess } from "./user.actions";

const newUserImg =
  "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg";

const INITIAL_STATE = {
  currentUser: null,
  userErr: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
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
        ...INITIAL_STATE,
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
  } catch (err) {
    console.log(err);
  }
};

export const SignInStart = (userCredentials) => async (dispatch) => {
  const { emailAddress, password } = userCredentials;

  auth
    .signInWithEmailAndPassword(emailAddress, password)
    .then(({ user }) => {
      dispatch(getSnapshotFromUserAuth(user));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const SignUpUserStart = ({ displayName, email, password }) => async (
  dispatch
) => {
  // if (password !== confirmPassword) {
  //   const err = ["Password Don't match"];
  //   yield put(userError(err));
  //   return;
  // }

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
    const userAuth = await getCurrentUser();
    if (!userAuth) return;
    dispatch(getSnapshotFromUserAuth(userAuth));
  } catch (err) {
    console.log(err);
  }
};
