import { NavLink } from 'react-router-dom';
import routes from '../../utils/routes';

const Navigation = () => {
  return (
    <div>
      <NavLink exact to={routes.home}>
        Home
      </NavLink>
      <NavLink to={routes.movies}>Movies</NavLink>
    </div>
  );
};

export default Navigation;
