import axios from 'axios';

export const infoMovie = (movie) => {
    return (dispatch) => {
        dispatch({type: "INFO_MOVIE", payload: movie })
    }
}

export const searchAllMovies = (movie) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/search/allmovies`,{
                headers: { 'Authorization': token  }
            }).then((response) =>{
                dispatch({type: "ALL_MOVIES", payload: response.data.allmovies })
                dispatch({type: "FLUX_MOVIES", payload: response.data.allmovies.slice(0, 20) })
            })
    }
}

export const addMovies = (fluxMovies, allMovies) => {
    const start = fluxMovies.length;
    const end = start + 20;
    return (dispatch) => {
        dispatch({type: "FLUX_MOVIES", payload: allMovies.slice(0, end) })
    }
}