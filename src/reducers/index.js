import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import signInGoogle from './authReducer';
import chatReducer from './chatReducer';

const myReducer = combineReducers({
    auth: signInGoogle,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    chatReducer: chatReducer,
})

export default myReducer;