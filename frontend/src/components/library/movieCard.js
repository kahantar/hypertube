import React from 'react';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Col } from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './style.css';
import { infoMovie, addWatch } from '../../actions/movie';
import { Link } from 'react-router-dom';
import {watch} from '../../utils/watch';

class MovieCard extends React.Component{
  render(){
      return (
          <Col sm="4" xs="6">
            <Card id="card">
              <CardImg top width="50%" height="200" src={this.props.movie.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.movie.title}</CardTitle>
                <CardSubtitle>{this.props.movie.year}</CardSubtitle>
                <Link onClick={(e) => {
                    this.props.infoMovie(this.props.movie);
                    this.props.addWatch(this.props.movie)
                  }} to='/video'>Visionner</Link>
                  {watch(this.props.movie.id, this.props.userWatch) ? <input type="checkbox" checked="checked"/>: <span></span>}              
              </CardBody>
            </Card>
          </Col>
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
