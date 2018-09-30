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
    const start = fluxMovies.length;
    const end = start + 20;
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
        const data = JSON.stringify({
            term: info.term,
            rating: info.rating,
            genre: info.genre,
            orderBy: info.orderBy,
            order: info.order 
        });
        console.log(info)
        axios.post(`http://localhost:8080/search/allmovies`, data, {
            headers: { 'content-type': 'application/json'}
        }).then((response) => {
            console.log(response.data.allmovies)
                dispatch({type: "ALL_MOVIES", payload: response.data.allmovies})
                dispatch({type: "FLUX_MOVIES", payload: response.data.allmovies.slice(0, 8) })
        }).catch((e)=>{
            console.log(e)
        })
    }
}
