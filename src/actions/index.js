import * as actionType from '../constants/ActionType'
import { getFirebase } from 'react-redux-firebase'

export const signInGoogle = (credential)  => { 
  return (dispatch, getState) => {
    const  firebase = getFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(
      provider
    )
    .then(()=>{
      dispatch({
        type: actionType.SIGN_IN_GOOGLE_SUCCESS
      })
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
  return (dispatch, getState) => {
    const  firebase = getFirebase();
    firebase.auth().signOut()
    .then(()=>{
      dispatch({
        type: actionType.SIGN_OUT
      })
    })
  }
}



