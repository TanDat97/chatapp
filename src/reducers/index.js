import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import signInGoogle from './authReducer';

const myReducer = combineReducers({
    auth: signInGoogle,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
})

export default myReducer;