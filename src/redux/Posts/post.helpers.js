import { db, storage } from "../../Firebase";

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

export const getUserImage = (username) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("myusers")
        .where("displayName", "==", username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            resolve(doc.data().photoURL);
          });
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteImgFromStorage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    let pictureRef = storage.refFromURL(imageUrl);
    pictureRef
      .delete()
      .then(() => {
        console.log("picture is delete");
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const deleteLike = (postId, found) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(postId)
      .collection("likes")
      .doc(found.id)
      .delete()
      .then(() => resolve())

      .catch(function (error) {
        reject(error);
      });
  });
};

export const deleteComment = (postId, id) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(id)
      .delete()
      .then(function () {
        resolve("Document successfully deleted!");
      })
      .catch(function (e) {
        reject("Error removing document: ", e);
      });
  });
};
