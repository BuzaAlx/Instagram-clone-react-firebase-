import { db, auth, storage } from "../../Firebase";

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

export const getUserPosts = (userId) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      // .where("username", "==", userId)
      .get()
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        result = result.filter((el) => el.username === userId);
        resolve(result);
      })
      .catch((error) => {
        reject("Error getting documents: ", error);
      });
  });
};

export const addPost = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let result = db.collection("posts").add(data);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//TODO:при виходе из юзей пейдж очищать selectedUser posts

export const getAvatar = (userId) => {
  return new Promise((resolve, reject) => {
    db.collection("myusers")
      .where("displayName", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          resolve(doc.data().photoURL);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getImageUrl = (image) => {
  return new Promise((resolve, reject) => {
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((url) => {
        resolve(url);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
