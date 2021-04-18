import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './utils/routes';

import AppBar from './components/AppBar';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "HomePage */),
);

const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "MoviesPage */),
);

const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage */),
);

const Cast = lazy(() =>
  import('./components/Cast' /* webpackChunkName: "Cast */),
);

const Reviews = lazy(() =>
  import('./components/Reviews' /* webpackChunkName: "Reviews */),
);

const App = () => {
  return (
    <>
      <AppBar />

      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.moviesDetails} component={MovieDetailsPage} />
          <Route path={routes.cast} component={Cast} />
          <Route path={routes.reviews} component={Reviews} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
