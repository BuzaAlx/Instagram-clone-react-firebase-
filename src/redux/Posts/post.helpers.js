import { db } from "../../Firebase";

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .orderBy("timestamp", "desc")
        .get()

        .then((querySnapshot) => {
          resolve(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
    } catch (error) {
      reject(error);
    }
  });
};

// IF YOU NEED A LISTENER USE //

// .onSnapshot((snapshot) =>
//   resolve(
//     snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
//   )

export const getLikes = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          resolve(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getComments = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .get()
        .then((querySnapshot) => {
          resolve(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const postComment = ({ postId, text, username, timestamp }) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          text,
          username,
          timestamp,
        })
        .then((docRef) => resolve(docRef.id));
    } catch (error) {
      reject(error);
    }
  });
};

export const addLike = ({ postId, username }) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .doc(postId)
        .collection("likes")
        .add({
          username,
        })
        .then((docRef) => resolve(docRef.id));
    } catch (error) {
      reject(error);
    }
  });
};
