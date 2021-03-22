# Instagram clone

----

## Features

 - based on CRA
- Register , Log In with Firebase API
- Using react-router-dom for navigation
- Creating posts,deleting posts,comments/likes (only yours)
- Keeping authenticated user credentials in localStorage
- File upload (for Posts/UserAvatar)
- Using custom protected routes for redirecting to another page without authorization
- Using Material UI (React UI framework) components
- Responsive


> The purpose of creating this app is 
> leaning features of Firebase,
> React Hooks and Material UI .

![Image of InstaClone](https://i.postimg.cc/ydwB4jS3/collage.png)


## Tech

Dillinger uses a number of open source projects to work properly:

- [React] - JavaScript library for building user interfaces or UI components.
- [React-router-dom] - navigate between different pages.
- [Material-UI] - stylish components.
- [Firebase] - using authorization,firestore (for storing posts and users data), storage for storing uploaded images. 



## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

To install copy repository to some of your folder on your machine using git.

```
git clone [link]
```

Install the dependencies and devDependencies and start the server.

```sh
npm install
```

# If you want to use your own firebase config:
 - Create new project on Firebase platform.
 - in project option panel copy firebaseConfig and put it to Firebase.js in src folder of project.
 ```sh
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
```
