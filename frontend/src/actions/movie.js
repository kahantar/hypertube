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
