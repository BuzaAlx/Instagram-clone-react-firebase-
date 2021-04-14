import { db, auth } from "../../Firebase";

const handleUserProfile = async ({ userAuth, additionalData = {} }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = db.doc(`myusers/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ["user"];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export default handleUserProfile;

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const getInitialUser = async () => {
  const userAuth = await getCurrentUser();
  if (!userAuth) return null;

  const userRef = await handleUserProfile({
    userAuth: userAuth,
  });
  const snapshot = await userRef.get();

  const user = { id: snapshot.id, ...snapshot.data() };
  return user;
};
