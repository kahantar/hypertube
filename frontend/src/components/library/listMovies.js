import React from 'react';
import MovieCard from './movieCard';

class ListMovie extends React.Component{
    render(){
        const widthOneMovie = (window.innerHeight * 0.221) + 10
        let nbMoviesPerRow
    
        if (window.innerWidth > 800)
            nbMoviesPerRow = Math.floor((window.innerWidth - 88) / widthOneMovie)
        else
            nbMoviesPerRow = Math.floor((window.innerWidth) / widthOneMovie)

        const maxMovies = Math.floor(this.props.movies.length / nbMoviesPerRow) * nbMoviesPerRow
        let movies = this.props.movies.slice(0, maxMovies)

        movies = (movies.length === 0) ? this.props.movies : movies
        return(
            <div id='Movies_block'>
                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        )
    }
}

export default ListMovie;