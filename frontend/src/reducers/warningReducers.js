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

export const warningUpdateReducers = (state=[], action) => {
    switch(action.type){
        case "WARNING_UPDATE":
            return action.payload;
        default:
            return state
    }
}

export const warningCompleteReducers = (state=[], action) => {
    switch(action.type){
        case "WARNING_COMPLETE":
            return action.payload;
        default:
            return state
    }
}

export const warningForgetReducers = (state=[], action) => {
    switch(action.type){
        case "WARNING_FORGET":
            return action.payload;
        default:
            return state
    }
}

export const warningResetReducers = (state=[], action) => {
    switch(action.type){
        case "WARNING_RESET":
            return action.payload;
        default:
            return state
    }
}