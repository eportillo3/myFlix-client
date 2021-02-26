import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import { Card, Button } from "react-bootstrap";

import "./movie-view.scss";

// import MovieCard from '../movie-card/movie-card';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflixapp2021.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/users/" + localStorage.getItem("user"), "_self");
        alert("Added to favorites!");
      });
  }

  render() {
    const { movie, handleBackButton } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Card>
          <Card.Img
            className="movie-poster"
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Title className="label-title">{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text className="label-body">{movie.Description}</Card.Text>
            <Card.Text className="label-body">
              Director: {movie.Director.Name}
            </Card.Text>
            <Card.Text className="label-body">
              Genre: {movie.Genre.Name}
            </Card.Text>
          </Card.Body>
          <Button
            className="return-button"
            variant="primary"
            size="sm"
            onClick={() => this.addFavorite(movie)}
          >
            Add to Favorites
          </Button>
          <Button
            className="return-button"
            variant="primary"
            onClick={() => handleBackButton()}
          >
            Return to Movie List
          </Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card>
      </div>
    );
  }
}

// MovieView.propTypes = {
// // shape({...}) means it expects an object
// movie: PropTypes.shape({
//     // movie prop may contain Title, and IF it does, it must be a string
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string,
//     Year: PropTypes.number,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//         Name: PropTypes.string,
//        Biography: PropTypes.string
//     }),
//     Director: PropTypes.shape({
//         Name: PropTypes.string,
//         Bio: PropTypes.string,
//         Birthdate: PropTypes.string
//     }),
//     Featured: PropTypes.bool
// }).isRequired,
// // props object must contain onClick and it MUST be a function
// onClick: PropTypes.func.isRequired
// };
