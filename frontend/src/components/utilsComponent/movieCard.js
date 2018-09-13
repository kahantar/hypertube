import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

  const MovieCard = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={props.movie.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.movie.title}</CardTitle>
          <CardSubtitle>{props.movie.year}</CardSubtitle>
          <Button>Visionner</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieCard;