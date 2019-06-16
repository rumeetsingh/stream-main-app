import { FETCH_CARDS,FETCH_TRAIL, SELECT_PLAN } from '../actions/types';

const INITIAL_STATE = {
    cards : [],
    trial : null,
    selectedPlan : null
}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case FETCH_CARDS:
            return { ...state,cards:action.payload };
        case FETCH_TRAIL:
            return { ...state,trial:action.payload };
        case SELECT_PLAN:
            return { ...state,selectedPlan:action.payload };
        default:
            return state;
    };
};