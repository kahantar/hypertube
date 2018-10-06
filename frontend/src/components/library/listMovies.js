import React from 'react';
import MovieCard from './movieCard';

class ListMovie extends React.Component{
    render(){
        return(
            <div id='Movies_block'>
                {this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        )
    }
}

export default ListMovie;