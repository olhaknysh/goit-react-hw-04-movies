import React, { Component } from 'react';

import { getMovieReviews } from '../../services/moviesApi';
import styles from './Reviews.module.scss';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      if (id) {
        const reviews = await getMovieReviews(id);
        this.setState({ reviews, error: '' });

        throw Error;
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
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
