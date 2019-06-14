import { SIGN_IN,SIGN_IN_ERROR,SIGN_IN_AUTO,SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
    token : null,
    isSignedIn : false
};

export default (state=INTIAL_STATE,action) => {
    switch(action.type){
        case SIGN_IN:
            return { token:action.payload,isSignedIn:true };
        case SIGN_IN_ERROR:
            return { ...state , errors:action.payload};
        case SIGN_IN_AUTO:
            return { token:action.payload,isSignedIn:true };
        case SIGN_OUT:
            return { token:null,isSignedIn:false };
        default:
            return state;
    };
};