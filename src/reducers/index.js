import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import signInGoogle from './authReducer';


const myReducer = combineReducers({
    auth: signInGoogle,
    firebase: firebaseReducer,
})

export default myReducer;