import React, { Component } from 'react';
import { getMovieDetails } from '../../services/moviesApi';

class MovieDetailsPage extends Component {
  state = {
    title: null,
    release_date: null,
    vote_average: null,
    overview: null,
    genres: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const movieInfo = await getMovieDetails(movieId);
    this.setState({ ...movieInfo });
  }

  updateReleaseDate() {
    const { release_date } = this.state;
    return release_date?.slice(0, -6);
  }

  render() {
    const { title, vote_average, overview, genres } = this.state;
    const date = this.updateReleaseDate();
    console.log(genres);

    return (
      <>
        <h1>One movie info</h1>
        <h2>
          {title} ({date})
        </h2>
        <p>User score : {vote_average} </p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        {genres?.map(({ name }) => (
          <span>{name} </span>
        ))}
      </>
    );
  }
}

export default MovieDetailsPage;
