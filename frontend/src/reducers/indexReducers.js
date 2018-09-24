import { combineReducers } from 'redux';
import { infoProfilReducers, allUsersReducers, allMoviesReducers, popularMoviesReducers, infoMovieReducers, fluxMoviesReducers, userWatchReducers } from './infoReducers';
import { warningReducers } from './warningReducers';
import { allCommentReducers, subtitleReducers } from './commentReducers';

const rootReducer = combineReducers({
    warningReducers: warningReducers,
    infoProfil: infoProfilReducers,
    allUsers: allUsersReducers,
    allMovies: allMoviesReducers,
    fluxMovies: fluxMoviesReducers,
    popularMovies: popularMoviesReducers,
    infoMovie: infoMovieReducers,
    comments: allCommentReducers,
    userWatch: userWatchReducers
	subtitles: subtitleReducers,
})

export default rootReducer 
