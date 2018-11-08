import * as actionType from '../constants/ActionType'

const initState = {
}

const fileReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.CHOOSE_FILE:
        console.log('CHOOSE_FILE');
            return {
                file: action.file,
            }
        case actionType.CLEAR_FILE:
            return {
            }
        case actionType.ERROR:
            return {
                err: action.err,
            }
        default:
            return state;
    }
}
export default fileReducer;