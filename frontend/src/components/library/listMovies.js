import React from 'react';
import MovieCard from './movieCard';
import { Row } from 'reactstrap';

class ListMovie extends React.Component{
    render(){
        return(
            <Row >
                {this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </Row>
        )
    }
}

export default ListMovie;