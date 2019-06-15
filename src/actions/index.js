import {
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_IN_AUTO,
    SIGN_OUT,
    FETCH_PROFILE,
    FETCH_CURRENT_SUB,
    SEARCH_SHOWS,
} from './types';
import history from '../history';
import basic from '../apis/basic';


export const signIn = (formValues) => async (dispatch) => {
    const { email,password } = formValues
    try{
        const response = await basic.post('/user/token/',{
        "email" : email,
        "password" : password
        });
        await dispatch({ type:SIGN_IN,payload:response.data.token });
        await dispatch(fetchProfile(response.data.token));
        await dispatch(fetchCurrentSub(response.data.token));
        await localStorage.setItem("foxedouVlL8S",response.data.token);
        history.push('/');
    }catch(error){
        dispatch({ type:SIGN_IN_ERROR,payload:error });
    };
};

export const signInAuto = (token) => {
    return {
        type : SIGN_IN_AUTO,
        payload : token
    };
};

export const fetchProfile = (token) => async (dispatch) => {
    try{
        const response = await basic.get('/user/me/',{
            headers : {
                Authorization : `Token ${token}`
            }
        });
        dispatch({ type:FETCH_PROFILE,payload:response.data });
    }catch(error){
        dispatch(signOut());
    };
};

export const signInAndfetchProfile = (token) => async (dispatch) => {
    await dispatch(signInAuto(token));
    await dispatch(fetchProfile(token));
    dispatch(fetchCurrentSub(token));
};

export const signOut = () => (dispatch) => {
    localStorage.removeItem("foxedouVlL8S");
    dispatch({ type:SIGN_OUT, });
    history.push('/');
};

export const fetchCurrentSub = (token) => async (dispatch) => {
    const response = await basic.get('/memberships/subscribe/',{
        headers : {
            Authorization : `Token ${token}`
        }
    });
    if(response.data.length===1){
        dispatch({ type:FETCH_CURRENT_SUB,payload:response.data[0] })
    }
}

export const searchShows = (value) => async (dispatch) => {
    const response = await basic.get(`./shows/?search=${value}`);
    dispatch({ type:SEARCH_SHOWS,payload:response.data });
};