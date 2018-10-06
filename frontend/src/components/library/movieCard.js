import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import { infoMovie, addWatch } from '../../actions/movie';
import './movieCard.css';
import {watch} from '../../utils/watch';

class MovieCard extends React.Component{
  state = {
    displayInfo: 'none',
    displaySeen: 'none'
  }
  render(){
    console.log(this.props.movie)
    return (
          <div className='Movies_card'>
            <img className='Movies_img' src={(!this.props.movie.large_image) ? this.props.movie.image : this.props.movie.large_image} alt="movie" />
            <Link to='/video' className='Movies_info' onMouseEnter={() => {this.setState({displayInfo: 'initial', displaySeen: (watch(this.props.movie.id, this.props.userWatch)) ? 'initial' : 'none'})}} onMouseLeave={() => {this.setState({displayInfo: 'none', displaySeen: 'none'})}} onClick={(e) => {this.props.infoMovie(this.props.movie); this.props.addWatch(this.props.movie)}}>
              <div className='Movies_rating' style={{display: this.state.displayInfo}}><span className='Movies_star'>{'\u2B50'}</span>{this.props.movie.rating}</div>
              <div className='Movies_seen' style={{display: this.state.displaySeen}}>SEEN</div>
              <img className='Movies_play' style={{display: this.state.displayInfo}} src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538854369/Netflix42/play-button.png' alt='startVideo'/>
              <div className='Movies_title' style={{display: this.state.displayInfo}}>{this.props.movie.title.charAt(0).toUpperCase() + this.props.movie.title.slice(1)}</div>
              <div className='Movies_year' style={{display: this.state.displayInfo}}>{this.props.movie.year}</div>
              {/* <div className='Movies_genre' style={{display: this.state.displayInfo}}>{this.props.movie.genre}</div> */}
            </Link>
          </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({ infoMovie, addWatch }, dispatch)
    }
}

const mapStateToProps = (state) => {
  return{
    userWatch: state.userWatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
