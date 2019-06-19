import { FETCH_CARDS,FETCH_TRAIL, SELECT_PLAN, FETCH_TRANSACTIONS } from '../actions/types';

const INITIAL_STATE = {
    cards : null,
    trial : null,
    selectedPlan : null,
    transactions : null,
};

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case FETCH_CARDS:
            return { ...state,cards:action.payload };
        case FETCH_TRAIL:
            return { ...state,trial:action.payload };
        case SELECT_PLAN:
            return { ...state,selectedPlan:action.payload };
        case FETCH_TRANSACTIONS:
            return { ...state,transactions:action.payload };
        default:
            return state;
    };
};