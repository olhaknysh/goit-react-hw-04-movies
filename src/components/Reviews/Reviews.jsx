import React, { Component } from 'react';

import Loader from '../Loader';
import { getMovieReviews } from '../../services/moviesApi';
import styles from './Reviews.module.scss';

class Reviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      if (id) {
        this.setState({ isLoading: true });
        const reviews = await getMovieReviews(id);
        this.setState({ reviews, error: '', isLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { reviews, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {reviews.length === 0 && <p>No reviews could be found</p>}
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={styles.author}>Author : {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Reviews;
