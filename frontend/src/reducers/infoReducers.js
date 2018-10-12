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

export const filterMovieReducers = (state = {rating: '', genre: {value: 'ALL', label: 'GENRE'}, orderBy: '', term: ''}, action) => {
    switch(action.type) {
        case "FILTER_MOVIES":
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

export const userWatchReducers = (state = [], action) => {
    switch(action.type){
        case "USER_WATCH":
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
        case "MAIL_PWD_SEND":
            return action.payload
        case "EDIT_PWD":
            return action.payload
        default:
            return state;
    }
}
