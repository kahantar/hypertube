export const infoProfilReducers = (state = [], action) => {
    switch(action.type){
        case "INFO_PROFIL":
            return action.payload;
        case "RESET_INFO_PROFIL":
            return action.payload
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

export const allMoviesReducers = (state = [], action) => {
    switch(action.type){
        case "ALL_MOVIES":
            return action.payload;
        default:
            return state;
    }
}

export const popularMoviesReducers = (state = [], action) => {
    switch(action.type){
        case "POPULAR_MOVIES":
            return action.payload;
        default:
            return state;
    }
}

export const infoMovieReducers = (state = [], action) => {
    switch(action.type){
        case "INFO_MOVIE":
            return action.payload;
        default:
            return state;
    }
}

export const fluxMoviesReducers = (state = [], action) => {
    switch(action.type){
        case "FLUX_MOVIES":
            return action.payload;
        default:
            return state;
    }
}

export const loadMailReducers = (state = [], action) => {
    switch(action.type){
        case "LOAD_MAIL":
            return action.payload;
        default:
            return state;
    }
}

export const loadLanguageReducers = (state = [], action) => {
    switch(action.type){
        case "LOAD_LANGUAGE":
            return action.payload;
        default:
            return state;
    }
}

export const mailSentReducers = (state = {}, action) => {
    switch(action.type) {
        case "MAIL_SEND":
            return action.payload
        case "RESET_MAIL_SEND":
            return action.payload
        default:
            return state;
    }
}