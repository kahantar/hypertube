import { combineReducers } from 'redux';
// import { warningRegisterReducers, warningLoginReducers, warningUpdateReducers, warningCompleteReducers, warningForgetReducers, warningResetReducers } from './warningReducers';
import { infoProfilReducers, allUsersReducers } from './infoReducers';
import { warningReducers } from './warningReducers';
const rootReducer = combineReducers({
    // warningRegister: warningRegisterReducers,
    // warningLogin: warningLoginReducers,
    // warningUpdate: warningUpdateReducers,
    // warningComplete: warningCompleteReducers,
    // warningForget: warningForgetReducers,
    // warningReset: warningResetReducers,
    warningReducers: warningReducers,
    infoProfil: infoProfilReducers,
    allUsers: allUsersReducers
})

export default rootReducer 
