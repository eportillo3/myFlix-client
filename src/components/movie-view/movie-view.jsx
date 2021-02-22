import React from 'react';
import PropTypes from 'prop-types';

import {Card, Button} from 'react-bootstrap';

import './movie-view.scss';

// import MovieCard from '../movie-card/movie-card';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render (){
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return(
        <div className='movie-view'>
            <Card>
                <Card.Img className='movie-poster' variant="top" src={movie.ImagePath} />
                <Card.Title className='label-title'>{movie.Title}</Card.Title>
                <Card.Body>
                    <Card.Text className='label-body'>{movie.Description}</Card.Text>
                    <Card.Text className='label-body'>Director: {movie.Director.Name}</Card.Text>
                    <Card.Text className='label-body'>Genre: {movie.Genre.Name}</Card.Text>
                </Card.Body>
                <Button className='return-button' variant='primary' onClick={() => onClick(movie)}>Return to Movie List</Button>
            </Card>
        </div>
    );
}
}

MovieView.propTypes = {
// shape({...}) means it expects an object
movie: PropTypes.shape({
    // movie prop may contain Title, and IF it does, it must be a string
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Year: PropTypes.number,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
        Name: PropTypes.string,
       Biography: PropTypes.string 
    }),
    Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birthdate: PropTypes.string
    }),
    Featured: PropTypes.bool
}).isRequired,
// props object must contain onClick and it MUST be a function
onClick: PropTypes.func.isRequired
};