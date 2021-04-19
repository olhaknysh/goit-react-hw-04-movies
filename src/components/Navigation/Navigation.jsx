import { NavLink } from 'react-router-dom';

import routes from '../../utils/routes';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <div>
      <NavLink
        className={styles.navlink}
        activeClassName={styles.navlinkactive}
        exact
        to={routes.home}
      >
        Home
      </NavLink>
      <NavLink
        className={styles.navlink}
        activeClassName={styles.navlinkactive}
        to={routes.movies}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
