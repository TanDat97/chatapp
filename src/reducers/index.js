import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import signInGoogle from './authReducer';
import chatReducer from './chatReducer';
import friendReducer from './friendReducer';

const myReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: signInGoogle,
    chatReducer: chatReducer,
    friendReducer: friendReducer,
})

export default myReducer;