import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { friendReducer, starReducer } from './friendReducer';
import { fileReducer, upLoadReducer } from './fileReducer';
import signInGoogle from './authReducer';
import chatReducer from './chatReducer';


const myReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: signInGoogle,
    chatReducer: chatReducer,
    friendReducer: friendReducer,
    fileReducer: fileReducer,
    upLoadReducer: upLoadReducer,
    starReducer: starReducer,
})

export default myReducer;