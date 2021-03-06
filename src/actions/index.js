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
    const date = new Date(); // some mock date
    const createMilisecond = date.getTime();
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
          listFriend: {},
          lastLoginAt: createMilisecond,
          photoURL: response.user.photoURL,
          uid: response.user.uid,
          status: "online",
        })
        .then(() => {
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
    .then(()=>{
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

export const createConversation = (authId, chatUserId, text, displayName, listFriend, listFriendChatUser) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);
    const date = new Date(); // some mock date
    const createMilisecond = date.getTime();
    listFriend.forEach(friend => {
      if(friend.uid === chatUserId){
        friend.lastMessage = createMilisecond;
      }
    });
    listFriendChatUser.forEach(friend => {
      if(friend.uid === authId){
        friend.lastMessage = createMilisecond;
      }
    });
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
          {id: authId},
          {id: chatUserId},
        ],
    })
    .then(() => {
      firestore.collection('users').doc(authId).update({
        listFriend: listFriend,
      })
    })
    .then(() => {
      firestore.collection('users').doc(chatUserId).update({
        listFriend: listFriendChatUser,
      })
    })
    .then(() => {
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

export const sendMessage = (authId, chatUserId, text, displayName, history, listFriend, listFriendChatUser) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    const hashId=hashConversationID(authId, chatUserId);
    const date = new Date(); // some mock date
    const createMilisecond = date.getTime();
    listFriend.forEach(friend => {
      if(friend.uid === chatUserId){
        friend.lastMessage = createMilisecond;
      }
    });
    listFriendChatUser.forEach(friend => {
      if(friend.uid === authId){
        friend.lastMessage = createMilisecond;
      }
    });
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
      firestore.collection('users').doc(authId).update({
        listFriend: listFriend,
      })
    })
    .then(() => {
      firestore.collection('users').doc(chatUserId).update({
        listFriend: listFriendChatUser,
      })
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

export const star = (authId, chatUserId, listFriend, isStar) => {
  return (dispatch, getState ) => {
    const firestore = firebase.firestore();
    listFriend.forEach(friend =>{
      if (friend.uid===chatUserId){
        friend.star = !friend.star;
      }
    });
    firestore.collection('users').doc(authId).update({
      listFriend: listFriend,       
    })
    .then(() => {
      dispatch({
        type: actionType.STAR,
        star: 'success',
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


function searchUserByName(name, friendList) {
  const list = [];
  for (var i = 0; i<friendList.length; i++) {
    if(friendList[i].displayName.toLowerCase().search(name.toLowerCase()) >= 0) { 
      list.push(friendList[i]);
    }
  }
  return list;
}


export const searchByName = (name, friendList) =>{
  return (dispatch, getState) => {
    if (name === ""){
      dispatch({
        type: actionType.SEARCH_BY_NAME,
        name: null,
        searchResult: friendList,
      })
    } else {
      dispatch({
        type: actionType.SEARCH_BY_NAME,
        name: name,
        searchResult: searchUserByName(name, friendList),
      })
    }
  }
}

export const chooseFile = (file) => {
  return (dispatch, getState) => {
    dispatch ({
      type: actionType.CHOOSE_FILE,
      file: file,
    })
  }
}

export const clearFile = () => {
  return (dispatch, getState) => {
    dispatch ({
      type: actionType.CLEAR_FILE,
    })
  }
}

export const changeStateUpload = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionType.CHANGE_STATE_UPLOAD,
    })
  }
}

export const makeListFriend = (authId, listFriend) => {
  return (dispatch, getState) => {
    const firestore = firebase.firestore();
    firestore.collection('users').doc(authId).update({
      listFriend: listFriend,       
    })
    dispatch({
      type: actionType.MAKE_LIST_FRIEND,
      makeList: 'success',
    })
  }
}
