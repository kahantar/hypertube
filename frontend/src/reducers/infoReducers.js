export const infoProfilReducers = (state = [], action) => {
    switch(action.type){
        case "INFO_PROFIL":
            return action.payload;
        default:
            return state;
    }
}