import { combineReducers } from 'redux';
import { LoginReducers } from './loginReducers';
import { warningRegisterReducers, warningLoginReducers } from './warningReducers';

const rootReducer = combineReducers({
    warningRegister: warningRegisterReducers,
    warningLogin: warningLoginReducers,
    user: LoginReducers
})

export default rootReducer 
