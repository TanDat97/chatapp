import * as actionType from '../constants/ActionType'

const initState = {
    file: null,
}

const fileReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.CHOOSE_FILE:
        console.log('CHOOSE_FILE');
            return {
                file: action.file,
            }
        case actionType.ERROR:
            return {
                file: null,
                err: action.err,
            }
        default:
            return state;
    }
}
export default fileReducer;