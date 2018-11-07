import * as actionType from '../constants/ActionType'

const initState = {
    name: null,
}

const friendReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SEARCH_BY_NAME:
        console.log('SEARCH_BY_NAME');
            return {
                name: action.name,
                searchResult: action.searchResult,
            }
        case actionType.STAR:
            console.log('STAR');
            return {
                name: null,
                star: action.star,
            }   
        // case actionType.ERROR:
        //     return {
        //         name: null,
        //         err: action.err,
        //     }
        default:
            return state;
    }
}
export default friendReducer;