import { SEARCH_SHOWS } from '../actions/types';

export default (state=[],action) => {
    switch(action.type){
        case SEARCH_SHOWS:
            return action.payload;
        default:
            return state;
    };
};