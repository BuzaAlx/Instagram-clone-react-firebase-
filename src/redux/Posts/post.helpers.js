import { db } from "../../Firebase";

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .orderBy("timestamp", "desc")
        .get()

        .then((querySnapshot) => {
          resolve(
            querySnapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
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
