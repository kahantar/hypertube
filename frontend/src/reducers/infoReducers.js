export const infoProfilReducers = (state = [], action) => {
    console.log(action.payload)
    switch(action.type){
        case "INFO_PROFIL":
            return action.payload;
        default:
            return state;
    }
}