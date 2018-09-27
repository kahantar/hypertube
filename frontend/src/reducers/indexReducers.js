import { combineReducers } from 'redux';
import { mailSentReducers, infoProfilReducers, allUsersReducers, allMoviesReducers, popularMoviesReducers, infoMovieReducers, fluxMoviesReducers, loadMailReducers, loadLanguageReducers } from './infoReducers';
import { warningReducers, errLoginReducers } from './warningReducers';
import { allCommentReducers } from './commentReducers';

const rootReducer = combineReducers({
    warningReducers: warningReducers,
    errLogin: errLoginReducers,
    infoProfil: infoProfilReducers,
    allUsers: allUsersReducers,
    allMovies: allMoviesReducers,
    fluxMovies: fluxMoviesReducers,
    popularMovies: popularMoviesReducers,
    infoMovie: infoMovieReducers,
    comments: allCommentReducers,
    loadMail: loadMailReducers,
    loadLanguage: loadLanguageReducers,
    mailSent: mailSentReducers
})

export default rootReducer