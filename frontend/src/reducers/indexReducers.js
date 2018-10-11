import { combineReducers } from 'redux';
import { allCommentReducers, subtitleReducers } from './commentReducers';
import { mailSentReducers, infoProfilReducers, allUsersReducers, allMoviesReducers, popularMoviesReducers, filterMovieReducers, infoMovieReducers, fluxMoviesReducers, loadMailReducers, loadLanguageReducers, userWatchReducers } from './infoReducers';
import { warningReducers, errLoginReducers } from './warningReducers';

const rootReducer = combineReducers({
    warningReducers: warningReducers,
    errLogin: errLoginReducers,
    infoProfil: infoProfilReducers,
    allUsers: allUsersReducers,
    allMovies: allMoviesReducers,
    fluxMovies: fluxMoviesReducers,
    popularMovies: popularMoviesReducers,
    filterMovies: filterMovieReducers,
    infoMovie: infoMovieReducers,
    comments: allCommentReducers,
    userWatch: userWatchReducers,
	subtitles: subtitleReducers,
    loadMail: loadMailReducers,
    loadLanguage: loadLanguageReducers,
    mailSent: mailSentReducers
})

export default rootReducer
