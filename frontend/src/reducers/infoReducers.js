export const infoProfilReducers = (state = [], action) => {
    console.log(action.payload)
    switch(action.type){
        case "INFO_PROFIL":
            return action.payload;
        default:
            return state;
    }
}

export const allUsersReducers = (state = [], action) => {
    switch(action.type){
        case "ALL_USERS":
            return action.payload;
        default:
            return state;
    }
}