import React, { Component } from 'react';
import queryString from 'query-string';

import { getMoviesByQuery } from '../../services/moviesApi';
import MoviesList from '../../components/MoviesList';
import Loader from '../../components/Loader';
import Container from '../../components/Container';

class MoviesPage extends Component {
  state = {
    inputValue: this.handleSetValue() || '',
    movies: [],
    error: '',
    noFilmsFound: '',
    isLoading: false,
  };

  async componentDidMount() {
    const { inputValue } = this.state;

    if (inputValue) {
      this.setState({ isLoading: true });
      getMoviesByQuery(inputValue)
        .then(results => this.setState({ movies: results }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSetValue() {
    const initialQueryState = queryString.parse(this.props.location.search);
    if (initialQueryState) {
      return initialQueryState.query;
    }
  }

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ inputValue: value });
  };

  handleSubmit = e => {
    const { inputValue } = this.state;

    e.preventDefault();
    this.setState({ isLoading: true, movies: [] });

    getMoviesByQuery(inputValue)
      .then(results => {
        results.length > 0
          ? this.setState({
              movies: results,
              noFilmsFound: '',
            })
          : this.setState({
              movies: [],
              noFilmsFound: 'Sorry, no films found :(',
            });
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { inputValue, movies, error, noFilmsFound, isLoading } = this.state;
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} value={inputValue}></input>
          <button type="submit">Find</button>
        </form>

        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {noFilmsFound && <p>{noFilmsFound}</p>}
        {movies.length > 0 && <MoviesList movies={movies} query={inputValue} />}
      </Container>
    );
  }
}

export default MoviesPage;
