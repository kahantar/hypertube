import axios from 'axios';

export const infoMovie = (movie) => {
    return (dispatch) => {
        dispatch({type: "INFO_MOVIE", payload: movie })
    }
}

export const loadMovies = (popularMovies) => {
    return (dispatch) => {
        dispatch({type: "ALL_MOVIES", payload: popularMovies })
        dispatch({type: "FLUX_MOVIES", payload: popularMovies })
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

export const searchMovies = (info) => {
    return (dispatch) => {
        console.log(info)
        const data = JSON.stringify({
            term: info.term,
            rating: (!info.rating.value) ? '0' : info.rating.value,
            genre: info.genre.value,
            orderBy: (!info.orderBy.value) ? 'title' : info.orderBy.value,
            order: (!info.orderBy || info.orderBy.value === 'title') ? 'ASC' : 'DESC' 
        });
        axios.post(`http://localhost:8080/search/allmovies`, data, {
            headers: { 'content-type': 'application/json'}
        }).then((response) => {
            dispatch({type: "FILTER_MOVIES", payload: info})
            console.log(response.data.allmovies)
            dispatch({type: "ALL_MOVIES", payload: response.data.allmovies})
            dispatch({type: "FLUX_MOVIES", payload: response.data.allmovies.slice(0, 50) })
        }).catch((e)=>{
            console.log(e)
        })
    }
}
