import axios from 'axios';

export const infoMovie = (movie) => {
    return (dispatch) => {
        dispatch({type: "INFO_MOVIE", payload: movie })
    }
}

export const addMovies = (fluxMovies, allMovies) => {
    const start = 50;
    const end = fluxMovies.length + start;
    return (dispatch) => {
        dispatch({type: "FLUX_MOVIES", payload: allMovies.slice(0, end) })
    }
}
export const addWatch = (movie) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const data = JSON.stringify({
            idMovie: movie.id
        });
        axios.post(`http://localhost:8080/search/addwatch`, data, {
            headers: { 'content-type': 'application/json', 'Authorization': token  }
        }).then((response) =>{
            dispatch({type: "USER_WATCH", payload: response.data.watch})
        }).catch((e)=>{})
    }
}

export const searchMovies = (info, language) => {
    return (dispatch) => {
        info.rating = (!info.rating) ? {value: '0', label: language.rating.toUpperCase()} : info.rating

        if (!info.orderBy || (info.orderBy.label === language.orderBy && info.rating.label === language.rating.toUpperCase() && info.genre.label === 'GENRE' && info.term === ''))
            info.orderBy = {value: 'rating', label: language.orderBy}
        else if (info.orderBy.label === language.orderBy && (info.rating.label !== language.rating.toUpperCase() || info.genre.label !== 'GENRE' || info.term !== ''))
            info.orderBy = {value: 'title', label: language.orderBy}

        
        console.log(info, 'here')
        const data = JSON.stringify({
            term: info.term,
            rating: info.rating,
            genre: info.genre,
            orderBy: info.orderBy,
            order: (!info.orderBy || info.orderBy.value === 'title') ? 'ASC' : 'DESC' 
        });
        axios.post(`http://localhost:8080/search/allmovies`, data, {
            headers: { 'content-type': 'application/json'}
        }).then((response) => {
            dispatch({type: "FILTER_MOVIES", payload: info})
            dispatch({type: "ALL_MOVIES", payload: response.data.allmovies})
            dispatch({type: "FLUX_MOVIES", payload: response.data.allmovies.slice(0, 50) })
        }).catch((e)=>{
            console.log(e)
        })
    }
}
