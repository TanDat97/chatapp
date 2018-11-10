import * as actionType from '../constants/ActionType'

const initState = {
}

export const fileReducer = (state = initState, action) => {
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

export const upLoadReducer = (state = { isUpload: true }, action) => {
    switch (action.type) {
        case actionType.CHANGE_STATE_UPLOAD:
        console.log('CHANGE_STATE_UPLOAD');
            return {
                isUpload: state ? !state.isUpload : true,
            }
        case actionType.ERROR:
            return {
                isUpload: true,
                err: action.err,
            }
        default:
            return state;
    }
}
