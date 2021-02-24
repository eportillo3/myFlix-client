import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';

import './main-view.scss';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      // selectedMovie: null,
      // register: null
    };
  }

  getMovies(token) {
    axios.get('https://myflixapp2021.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // One of the "hooks" available in a React Component
  // componentDidMount() {
  //   axios.get('https://myflixapp2021.herokuapp.com/movies')
  //     .then(response => {
  //       // Assign the result to the state
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

// // when movie is clicked, this function is invoked and updates the state of the 'selectedmovie' property to that movie
//   onMovieClick(movie) {
//     this.setState({
//       selectedMovie: movie
//     });
//   }

//   onRegister(register) {
//     this.setState({
//       register
//     });
//   }

// // when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
//   onBackClick() {
//     this.setState({
//       selectedMovie: null
//     });
//   }

// when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }




  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    // const { movies, selectedMovie, user, register } = this.state;
    const { movies, user } = this.state;

    // if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)}/>

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;


    return (
      <Router>
        <div className='main-view'>
          <Route exact path="/" render={() => {
             if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m}/>)}}/>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path='/movies/:movieId' render={({match}) => <MovieView movie=   {movies.find(m => m._id === match.params.movieId)}/>}/>
          {/* <Route path="/directors/:name" render={({ match }) => {
          if (!movies) return <div className="main-view"/>;
          return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
          } /> */}
        </div>
      </Router>
    );
  }
} 