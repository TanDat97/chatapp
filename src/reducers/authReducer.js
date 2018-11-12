// import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import * as actionType from '../constants/ActionType'

const initState = {}

const signInGoogle = (state = initState, action) => {
    switch (action.type) {
        case actionType.SIGN_IN_GOOGLE_SUCCESS:
            console.log("login success");
            return {
                ...state,
                auth: "login google success",
            };     
        case actionType.SIGN_IN_GOOGLE_FAIL:
            return {
            };    
        case actionType.SIGN_OUT:
            console.log('logout success');
            return {
            }
        default:
            return state;
    }
}
export default signInGoogle;