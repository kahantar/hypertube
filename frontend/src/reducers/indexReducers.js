import { combineReducers } from 'redux';
import { infoProfilReducers, allUsersReducers, allMoviesReducers, popularMoviesReducers, infoMovieReducers, fluxMoviesReducers } from './infoReducers';
import { warningReducers } from './warningReducers';
const rootReducer = combineReducers({
    warningReducers: warningReducers,
    infoProfil: infoProfilReducers,
    allUsers: allUsersReducers,
    allMovies: allMoviesReducers,
    fluxMovies: fluxMoviesReducers,
    popularMovies: popularMoviesReducers,
    infoMovie: infoMovieReducers
})

export default rootReducer 
