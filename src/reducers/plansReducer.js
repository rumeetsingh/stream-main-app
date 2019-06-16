import { FETCH_PLANS } from '../actions/types';

export default (state=[],action) => {
    switch(action.type){
        case FETCH_PLANS:
            return action.payload;
        default:
            return state;
    };
};
