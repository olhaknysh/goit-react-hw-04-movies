import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MovieList.module.scss';

const MoviesList = ({ movies, location, query }) => {
  return (
    <ul className={styles.movies}>
      {movies.map(({ id, title, name }) => (
        <li key={id} className={styles.movie}>
          <Link
            to={{
              pathname: `movies/${id}`,
              state: { from: location, query: query },
            }}
          >
            {title || name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  query: PropTypes.string,
};

export default withRouter(MoviesList);
