import React from "react";
import { connect } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return filteredMovies.map((m) => <MovieCard key={m._id} movie={m} />);
}

export default connect(mapStateToProps)(MoviesList);
