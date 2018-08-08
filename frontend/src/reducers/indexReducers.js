import { combineReducers } from 'redux';
import { LoginReducers } from './login_reducers';

const rootReducer = combineReducers({
    user: LoginReducers
})

export default rootReducer 
