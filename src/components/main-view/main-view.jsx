import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';

import './main-view.scss'

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://myflixapp2021.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

// when movie is clicked, this function is invoked and updates the state of the 'selectedmovie' property to that movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

// when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

// when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)}/>

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;


    return (
      <div className='main-view'>
        <header>
          <h1>myFlix</h1>
        </header>
        {selectedMovie ? (
          <MovieView movie={selectedMovie} onClick={() => this.onBackClick()}/>
        ) : (
          <Container>
            <Row className="justify-content-md-center">
           {movies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard key={movie._id} movie={movie}
                onClick={(movie) => this.onMovieClick(movie)}/>
             </Col>
           ))}
            </Row>
          </Container> 
        )}
      </div>
    );
  }
} 