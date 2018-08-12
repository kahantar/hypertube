export const warningRegisterReducers = (state=[], action) => {
    switch(action.type){
        case "WARNING_REGISTER":
            return action.payload;
        default:
            return state
    }
}

export const warningLoginReducers = (state=[], action) => {
    switch(action.type){
        case "WARNING_LOGIN":
            return action.payload;
        default:
            return state
    }
}