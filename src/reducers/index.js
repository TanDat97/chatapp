import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { friendReducer, starReducer } from './friendReducer';
import signInGoogle from './authReducer';
import chatReducer from './chatReducer';
import fileReducer from './fileReducer';

const myReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: signInGoogle,
    chatReducer: chatReducer,
    friendReducer: friendReducer,
    fileReducer: fileReducer,
    starReducer: starReducer,
})

export default myReducer;