import classes from './Header.module.css';
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();
  // Subscriptions
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Logout Handler Function
  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  }

  const ulElement = (
    <nav>
      <ul>
        <li>
          <a href='/'>My Products</a>
        </li>
        <li>
          <a href='/'>My Sales</a>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && ulElement}
    </header>
  );
};

export default Header;
