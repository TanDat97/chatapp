import * as actionType from '../constants/ActionType';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

export const signInGoogle = (profile)  => { 
  return (dispatch, getState ) => {
    const  firebase = getFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();
    const firestore = getFirestore();

    firebase.auth().signInWithPopup(provider)
    .then((response) => {
      if(response.additionalUserInfo.isNewUser === false) {
        console.log("old user");
        dispatch({type: actionType.SIGN_IN_GOOGLE_SUCCESS})
      } else {
        firestore.collection('users').add({
          displayName: response.user.displayName,
          email: response.user.email,
          id: response.additionalUserInfo.profile.id,
          isNewUser: false,
          lastLoginAt: new Date(),
          photoURL: response.user.photoURL,
          uid: response.user.uid,
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



