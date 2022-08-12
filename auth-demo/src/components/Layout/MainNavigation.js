import React, { useContext, Fragment } from "react";
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from "../../context/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <Fragment>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
