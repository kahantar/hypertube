import React from 'react';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Col } from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './style.css';
import { infoMovie } from '../../actions/movie';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component{
  render(){
      return (
          <Col md="3" sm="4" xs="6">
            <Card id="card">
              <CardImg top width="50%" height="200" src={this.props.movie.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.movie.title}</CardTitle>
                <CardSubtitle>{this.props.movie.year}</CardSubtitle>
                <Link onClick={(e) => this.props.infoMovie(this.props.movie)} to='/movie'>Visionner</Link>              
              </CardBody>
            </Card>
          </Col>
      );
  }
};

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({ infoMovie }, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(MovieCard);