import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signInReducer from './signInReducer';
import searchReducer from './searchReducer';
import plansReducer from './plansReducer';
import accountDetailsReducer from './accountDetailsReducer';


export default combineReducers({
    form : formReducer,
    auth : signInReducer,
    searchResults : searchReducer,
    plans : plansReducer,
    accountDetails : accountDetailsReducer,
});