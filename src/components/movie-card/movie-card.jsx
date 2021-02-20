import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card className='movie-card'>
        <Card.Img className='movie-img' variant="top" src={movie.ImagePath} />
        <Card.Body>
         <Card.Title>{movie.Title}</Card.Title>
         <Card.Text>{movie.Description}</Card.Text>
         <Button className='more-button' onClick={() => onClick(movie)}>Click for more</Button>
       </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};