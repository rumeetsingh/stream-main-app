import { SIGN_IN,SIGN_IN_ERROR,SIGN_IN_AUTO,SIGN_OUT,FETCH_PROFILE } from '../actions/types';

const INTIAL_STATE = {
    token : null,
    isSignedIn : false,
    email:null,
    name:null
};

export default (state=INTIAL_STATE,action) => {
    switch(action.type){
        case SIGN_IN:
            return { ...state,token:action.payload,isSignedIn:true };
        case SIGN_IN_ERROR:
            return { ...state , errors:action.payload};
        case SIGN_IN_AUTO:
            return { ...state,token:action.payload,isSignedIn:true };
        case FETCH_PROFILE:
            return {...state,email:action.payload.email,name:action.payload.name}
        case SIGN_OUT:
            return { token:null,isSignedIn:false,email:null,name:null };
        default:
            return state;
    };
};