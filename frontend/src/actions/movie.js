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
