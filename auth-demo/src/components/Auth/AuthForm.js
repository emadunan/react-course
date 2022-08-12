import { useState, useRef, useContext } from 'react';
import { useHistory } from "react-router-dom";

import classes from './AuthForm.module.css';
import AuthContext from "../../context/auth-context";

const AuthForm = () => {
  const history = useHistory();

  // Auth context listener
  const authCtx = useContext(AuthContext);

  // Form input refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Local State
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const authData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }

    // Optional: Add validation

    let url = '';
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZcwkgGzsgdvQQ5xTRRfypPYl5SvjeBGs";

    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZcwkgGzsgdvQQ5xTRRfypPYl5SvjeBGs"
    }

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(data => {
      if (data.error) throw new Error(data.error.message);
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace("/");
    }).catch(err => {
      alert(err.message)
    });

    console.log(authData);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading ...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
