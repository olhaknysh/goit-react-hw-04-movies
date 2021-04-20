import React, { Component, Suspense, lazy } from 'react';
import { Route, NavLink } from 'react-router-dom';

import { getMovieDetails } from '../../services/moviesApi';
import ImageWithLoading from './isImageLoaded';
import Loader from '../../components/Loader';

import routes from '../../utils/routes';
import styles from './MovieDetailsPage.module.scss';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "Cast */),
);

const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "Reviews */),
);

class MovieDetailsPage extends Component {
  state = {
    id: null,
    poster_path: null,
    title: null,
    release_date: null,
    vote_average: null,
    overview: null,
    genres: null,

    noDetailsFound: '',
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const { movieId } = this.props.match.params;
      const movieInfo = await getMovieDetails(movieId);
      this.setState({ ...movieInfo });
    } catch {
      this.setState({ noDetailsFound: 'Sorry, no details found :(' });
    }
  }

  updateReleaseDate() {
    const { release_date } = this.state;
    return release_date?.slice(0, -6);
  }

  updateVoteAverage() {
    const { vote_average } = this.state;
    return vote_average * 10;
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    history.push({
      pathname: location?.state?.from.pathname || routes.home,
      search: `?query=${location.state?.query || null}`,
    });
  };

  render() {
    const {
      id,
      poster_path,
      title,
      overview,
      genres,
      noDetailsFound,
    } = this.state;
    const date = this.updateReleaseDate();
    const votes = this.updateVoteAverage();

    const { url } = this.props.match;

    return (
      <div className={styles.card}>
        <button
          className={styles.button}
          onClick={this.handleGoBack}
          type="button"
        >
          Go back
        </button>

        {noDetailsFound ? (
          <p>{noDetailsFound}</p>
        ) : (
          <div className={styles.info}>
            <div>
              {poster_path && (
                <ImageWithLoading
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  alt={title}
                />
              )}
            </div>

            <div className={styles.maininfo}>
              <h2>
                {title} ({date})
              </h2>
              <p>User score : {votes} % </p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3 className={styles.genres}>Genres</h3>
              {genres?.map(({ name }) => (
                <span key={name}>{name} </span>
              ))}

              <div>
                <h3 className={styles.addtitle}>Additional information</h3>
                <NavLink
                  className={styles.additionallink}
                  activeClassName={styles.activelink}
                  to={`${url}/cast`}
                >
                  Cast
                </NavLink>
                <NavLink
                  className={styles.additionallink}
                  activeClassName={styles.activelink}
                  to={`${url}/reviews`}
                >
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={<Loader />}>
          <Route
            path={routes.cast}
            render={props => <Cast {...props} id={id} />}
          />
          <Route
            path={routes.reviews}
            render={props => <Reviews {...props} id={id} />}
          />
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;
