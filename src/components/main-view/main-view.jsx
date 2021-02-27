import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileUpdate } from "../profile-update/profile-update";
import "./main-view.scss";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      selectedMovie: "",
      // register: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://myflixapp2021.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

  // when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    // const { movies, selectedMovie, user, register } = this.state;
    const { movies, selectedMovie, user } = this.state;

    // if (!register)
    //   return (
    //     <RegisterView onRegister={(register) => this.onRegister(register)} />
    //   );

    // if (!user)
    //   return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
            {!user ? (
              <ul>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link">
                    Sign In
                  </Button>
                </Link>
                <Link to={`/register`}>
                  <Button variant="link" className="navbar-link">
                    Register
                  </Button>
                </Link>
              </ul>
            ) : (
              <ul>
                <Link to={`/`}>
                  <Button
                    variant="link"
                    className="navbar-link"
                    onClick={() => this.logOut()}
                  >
                    Sign Out
                  </Button>
                </Link>
                <Link to={`/users/${user}`}>
                  <Button variant="link" className="navbar-link">
                    My Account
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link">
                    Movies
                  </Button>
                </Link>
              </ul>
            )}
          </Navbar>
          <div className="main-view">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                return (
                  <div className="movie-grid">
                    {movies.map((m) => (
                      <MovieCard key={m._id} movie={m} />
                    ))}
                  </div>
                );
              }}
            />
            <Route path="/register" render={() => <RegisterView />} />
            <Route
              path="/movies/:movieId"
              render={({ history, match }) => (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  handleBackButton={() => history.push("/")}
                />
              )}
            />
            <Route
              path="/update/:userId"
              render={() => {
                return <ProfileUpdate />;
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <DirectorView
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                    )}
                    movies={movies}
                  />
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                  />
                );
              }}
            />
            <Route
              exact
              path="/users/:userId"
              render={() => <ProfileView movies={movies} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}
