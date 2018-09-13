import { combineReducers } from 'redux';
// import { warningRegisterReducers, warningLoginReducers, warningUpdateReducers, warningCompleteReducers, warningForgetReducers, warningResetReducers } from './warningReducers';
import { infoProfilReducers, allUsersReducers } from './infoReducers';
import { warningReducers } from './warningReducers';
import { allCommentReducers } from './commentReducers';

const rootReducer = combineReducers({
	// warningRegister: warningRegisterReducers,
	// warningLogin: warningLoginReducers,
	// warningUpdate: warningUpdateReducers,
	// warningComplete: warningCompleteReducers,
	// warningForget: warningForgetReducers,
	// warningReset: warningResetReducers,
	warningReducers: warningReducers,
	infoProfil: infoProfilReducers,
	allUsers: allUsersReducers,
	comments: allCommentReducers
})

export default rootReducer 
