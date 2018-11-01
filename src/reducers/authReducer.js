// import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import * as actionType from '../constants/ActionType'

const initState = {}

const signInGoogle = (state = initState, action) => {
    switch (action.type) {
        case actionType.SIGN_IN_GOOGLE_SUCCESS:
        console.log("login success");
            return {
                ...state,
                authERR: null,
            };     
        case actionType.SIGN_IN_GOOGLE_FAIL:
            return {
                ...state,
                authERR: 'login failed',
            };    
        case actionType.SIGN_OUT:
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