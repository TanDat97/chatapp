import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebase from '../config/firebaseConfig';
import * as actionType from '../constants/ActionType';

function hashConversationID(a,b) { 
  var hashA = 0
  var hashB = 0
  for (var i = 0; i<a.length; i++){
      var temp = a.charCodeAt(i)
      hashA +=  temp
  }

  for (i = 0; i<b.length; i++){
      temp = b.charCodeAt(i)
      hashB +=  temp
  }
  return hashA+hashB
}

export const signInGoogle = (profile)  => { 
  return (dispatch, getState ) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((response) => {
      if(response.additionalUserInfo.isNewUser === false) {
        console.log("old user");
        dispatch({type: actionType.SIGN_IN_GOOGLE_SUCCESS})
      } else {
        firestore.collection('users').doc(response.user.uid.toString()).set({
          displayName: response.user.displayName,
          email: response.user.email,
          isNewUser: false,
          lastLoginAt: new Date(),
          photoURL: response.user.photoURL,
          uid: response.user.uid,
          status: "online",
        }).then((resAddUser) => {
          console.log("add new user account");
          dispatch({ type: actionType.SIGN_IN_GOOGLE_SUCCESS});
        }).catch(err => {
          dispatch({ type: actionType.SIGN_IN_GOOGLE_FAIL, }, err);
        });
      }
    })
    .catch((err)=>{
      dispatch({
        type: actionType.SIGN_IN_GOOGLE_FAIL,
        err: err,
      })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, ) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then((response)=>{
      dispatch({
        type: actionType.SIGN_OUT
      })
    })
  }
}

export const getChatList = (id) => {
  return (dispatch, getState, ) => {
    const firestore = firebase.firestore();
    firestore.collection('users/'+id+'/chatlist').get()
    .then((response) => {
      var chatlist = [];
      response.forEach(function(doc) {
        chatlist.push(doc.data());
      });
      dispatch({
        type: actionType.GET_CHAT_LIST,
        chatlist: chatlist,
      });
    })
    .catch((err)=>{
      dispatch({
        type: actionType.ERROR,
        err: err,
      })
    })
  }
}

export const createConversation = (authId, chatUserId) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);

    var date = new Date(); // some mock date
    var createMilisecond = date.getTime();

    firestore.collection('conversation').doc(hashId.toString()).set({
        createAt: createMilisecond,
        history: [
          {
            idSend:"linh",
            sendAt: createMilisecond,
            text: 'abc',
          },
          {
            idSend:"dat",
            sendAt: createMilisecond,
            text: 'vcnm',
          },
          {
            idSend:"linh",
            sendAt:  createMilisecond,
            text: 'asdfsadf',
          }
          ],
        lastMessage: createMilisecond,
        users: [
          {authId},
          {chatUserId},
        ],
    })
    .then((response) => {
      dispatch({
        type: actionType.CONVERSATION,
      });
    })
    .catch((err)=>{
      dispatch({
        type: actionType.ERROR,
        err: err,
      })
    })
    
  }
}

export const getConversation = (authId, chatUserId) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);
    firestore.collection('conversation').doc(hashId.toString()).get()
    .then((response) => {
      dispatch({
        type: actionType.GET_CONVERSATION,
        conversation: response.data(),
      });
    })
    .catch((err)=>{
      dispatch({
        type: actionType.ERROR,
        err: err,
      })
    })
    
  }
}
