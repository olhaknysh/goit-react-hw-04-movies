import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../../services/moviesApi';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const movies = await getTrendingMovies();
    this.setState({ movies });
  }

  render() {
    const { movies } = this.state;
    return (
      <ul>
        {movies.map(({ id, title, name }) => (
          <li key={id}>
            <Link to={`movies/${id}`}>{title || name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default HomePage;
