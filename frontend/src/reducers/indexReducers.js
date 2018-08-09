import { combineReducers } from 'redux';
import { LoginReducers } from './loginReducers';
import { warningRegisterReducers } from './warningReducers';

const rootReducer = combineReducers({
    warningRegister: warningRegisterReducers,
    user: LoginReducers
})

export default rootReducer 
