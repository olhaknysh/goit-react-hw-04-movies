import React, { Component } from 'react';

import { getTrendingMovies } from '../../services/moviesApi';
import Container from '../../components/Container';
import MoviesList from '../../components/MoviesList';
import Loader from '../../components/Loader';

class HomePage extends Component {
  state = {
    movies: [],
    error: '',
    isLoading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const movies = await getTrendingMovies();
      this.setState({ movies, isLoading: false });

      throw Error;
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { movies, error, isLoading } = this.state;
    return (
      <Container>
        <h2>Trending today</h2>
        {isLoading && <Loader />}
        {error ? <p>{error}</p> : <MoviesList movies={movies} />}
      </Container>
    );
  }
}

export default HomePage;
