import { FETCH_CARDS,FETCH_TRAIL } from '../actions/types';

const INITIAL_STATE = {
    cards : [],
    trial : null,
}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case FETCH_CARDS:
            return { ...state,cards:action.payload };
        case FETCH_TRAIL:
            return { ...state,trial:action.payload };
        default:
            return state;
    };
};