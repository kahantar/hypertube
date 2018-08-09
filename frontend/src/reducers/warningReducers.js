export const warningRegisterReducers = (state=[], action) => {
    switch(action.type){
        case "ERROR_VALIDATION":
            return action.payload;
        default:
            return state
    }
}