import { combineReducers } from 'redux';
import { warningRegisterReducers, warningLoginReducers, warningUpdateReducers, warningCompleteReducers, warningForgetReducers, warningResetReducers } from './warningReducers';
import { infoProfilReducers } from './infoReducers';

const rootReducer = combineReducers({
    warningRegister: warningRegisterReducers,
    warningLogin: warningLoginReducers,
    warningUpdate: warningUpdateReducers,
    warningComplete: warningCompleteReducers,
    warningForget: warningForgetReducers,
    warningReset: warningResetReducers,
    infoProfil: infoProfilReducers
})

export default rootReducer 
