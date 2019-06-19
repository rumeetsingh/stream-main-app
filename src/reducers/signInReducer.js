import { SIGN_IN,SIGN_IN_ERROR,SIGN_IN_AUTO,SIGN_OUT,FETCH_PROFILE,FETCH_CURRENT_SUB } from '../actions/types';

const INTIAL_STATE = {
    token : null,
    isSignedIn : false,
    email:null,
    name:null,
    current_sub: { main:null,stripe:null } ,
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
            return { token:null,isSignedIn:false,email:null,name:null,current_sub:null };
        case FETCH_CURRENT_SUB:
            return { ...state,current_sub:{ main:action.payload[0],stripe:action.payload[1] } }
        default:
            return state;
    };
};