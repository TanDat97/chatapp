import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'

var config = {
    apiKey: "AIzaSyA6Lkt03kDd5oWkOjngc1y5vu7sA5kKD9A",
    authDomain: "chatapp-878d1.firebaseapp.com",
    databaseURL: "https://chatapp-878d1.firebaseio.com",
    projectId: "chatapp-878d1",
    storageBucket: "chatapp-878d1.appspot.com",
    messagingSenderId: "1069741752483"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots:true});

  export default firebase