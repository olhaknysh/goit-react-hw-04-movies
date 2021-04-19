import React, { Component } from 'react';

import { getMovieCast } from '../../services/moviesApi';
import Loader from '../Loader';
import styles from './Cast.module.scss';
import noImage from '../../utils/images/noimage.jpeg';

class Cast extends Component {
  state = {
    cast: [],
    isLoading: false,
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      if (id) {
        this.setState({ isLoading: true });
        const cast = await getMovieCast(id);
        const shortedCast = cast.slice(0, 8);
        this.setState({ cast: shortedCast, isLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { cast, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {cast.length === 0 && (
          <p>Sorry, couldn`t download the cast members :( </p>
        )}
        <ul className={styles.castlist}>
          {cast.map(({ profile_path, name, character }) => (
            <li key={name}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                  alt={name}
                  width="120"
                />
              ) : (
                <img src={noImage} width="120"></img>
              )}

              <p>{name}</p>
              <p>Character : {character}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Cast;
