import * as actionType from '../constants/ActionType'

const initState = {
    name: null,
}

export const friendReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.SEARCH_BY_NAME:
        console.log('SEARCH_BY_NAME');
            return {
                name: action.name,
                searchResult: action.searchResult,
            }
        default:
            return state;
    }
}
export const starReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.STAR:
            console.log('STAR');
            return {
                star: action.star,
            }   
        case actionType.ERROR:
            return {
                star: null,
                err: action.err,
            }
        default:
            return state;
    }
}


