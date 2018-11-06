import * as actionType from '../constants/ActionType'

const initState = {}

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.CREATE_CONVERSATION:
        console.log('CREATE_CONVERSATION');
            return {
                ...state,
            }
        case actionType.GET_CONVERSATION:
            console.log('GET_CONVERSATION');
            return {
                conversation: action.conversation,
            }
        case actionType.SEND_MESSAGE:
            console.log('SEND_MESSAGE');
            return {
                send: action.send,
            }
        case actionType.ERROR:
            return {
                err: action.err,
            }
        default:
            return state;
    }
}
export default chatReducer;