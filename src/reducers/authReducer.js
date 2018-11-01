import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import {
    SIGN_IN_GOOGLE_SUCCESS,
    SIGN_IN_GOOGLE_FAIL,
    SIGN_OUT,
  } from '../constants/ActionType'

const initState = {}

const signInGoogle = (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_GOOGLE_SUCCESS:
        console.log("login success");
            return {
                ...state,
                authERR: null,
            };     
        case SIGN_IN_GOOGLE_FAIL:
            return {
                ...state,
                authERR: 'login failed',
            };    
        case SIGN_OUT:
            console.log('logout success');
            return {
                ...state,
                auth: "log out success",
            }       
        default:
            return state;
    }
}
export default signInGoogle;