import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";
import ProfileView from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileUpdate } from "../profile-update/profile-update";

import { Link } from "react-router-dom";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input.jsx";
import { Navbar, Form, Button } from "react-bootstrap";

import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      // movies: [],
      // selectedMovie: "",
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
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
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
    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;

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
            <Form inline>
              <VisibilityFilterInput
                variant="outline-light"
                visibilityFilter={visibilityFilter}
              />
            </Form>
          </Navbar>
          <div className="main-view">
            <Route
              exact
              path={["/", "/login"]}
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                  );
                return (
                  <div className="movie-grid">
                    <MoviesList movies={movies} />;
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
            <Route exact path="/users/:userId" render={() => <ProfileView />} />
          </div>
        </Router>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.users };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
