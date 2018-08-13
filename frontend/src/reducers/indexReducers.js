import { combineReducers } from 'redux';
import { warningRegisterReducers, warningLoginReducers } from './warningReducers';
import { infoProfilReducers } from './infoReducers';

const rootReducer = combineReducers({
    warningRegister: warningRegisterReducers,
    warningLogin: warningLoginReducers,
    infoProfil: infoProfilReducers
})

export default rootReducer 
