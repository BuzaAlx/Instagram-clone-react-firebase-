import { db } from "../../Firebase";

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          resolve(
            snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
          )
        );
    } catch (error) {
      reject(error);
    }
  });
};
