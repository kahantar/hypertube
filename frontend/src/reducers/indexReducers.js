import { combineReducers } from 'redux';
import { infoProfilReducers, allUsersReducers, allMoviesReducers, popularMoviesReducers, infoMovieReducers } from './infoReducers';
import { warningReducers } from './warningReducers';
import { allCommentReducers } from './commentReducers';

const rootReducer = combineReducers({
    warningReducers: warningReducers,
    infoProfil: infoProfilReducers,
    allUsers: allUsersReducers,
    allMovies: allMoviesReducers,
    popularMovies: popularMoviesReducers,
    infoMovie: infoMovieReducers,
	comments: allCommentReducers
})

export default rootReducer 
