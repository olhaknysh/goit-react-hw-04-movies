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

const App = () => {
  return (
    <>
      <AppBar />

      <Suspense fallback={<h1 className="loading">Loading...</h1>}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.moviesDetails} component={MovieDetailsPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
