import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signInReducer from './signInReducer';
import searchReducer from './searchReducer';


export default combineReducers({
    form : formReducer,
    auth : signInReducer,
    searchResults : searchReducer,
});