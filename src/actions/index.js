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
        })
        .then((resAddUser) => {
          console.log("add new user account");
          dispatch({ type: actionType.SIGN_IN_GOOGLE_SUCCESS});
        })
        .catch(err => {
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

export const getConversation = (authId, chatUserId) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);
    firestore.collection('conversation').doc(hashId.toString()).get()
    .then((response) => {
      dispatch({
        type: actionType.GET_CONVERSATION,
        conversation: response.data() ? response.data() : {},
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

export const createConversation = (authId, chatUserId, text, displayName) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);
    const date = new Date(); // some mock date
    const createMilisecond = date.getTime();
    firestore.collection('conversation').doc(hashId.toString()).set({
        createAt: createMilisecond,
        history: [
          {
            idSend: authId,
            sendAt: createMilisecond,
            text: text,
            displayName: displayName,
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
        type: actionType.CREATE_CONVERSATION,
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

export const sendMessage = (authId, chatUserId, text, displayName, history) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);
    const date = new Date(); // some mock date
    const createMilisecond = date.getTime();
    firestore.collection('conversation').doc(hashId.toString()).update({
      history: [...history, {
        displayName: displayName, 
        idSend: authId, 
        sendAt: createMilisecond,
        text: text
      }],
      lastMessage: createMilisecond,       
    })
    .then(() => {
      dispatch({
        type: actionType.SEND_MESSAGE,
        send: 'success',
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
