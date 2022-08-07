import React, { useEffect, useReducer, useState, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

// CONSTANTS
const ENTER_USERNAME = "ENTER_USERNAME";
const ENTER_PASSWORD = "ENTER_PASSWORD";
const VALIDATE_USERNAME = "VALIDATE_USERNAME";
const VALIDATE_PASSWORD = "VALIDATE_PASSWORD";

const EMAIL_INIT = { enteredEmail: "", enteredPassword: "", emailIsValid: null, passwordIsValid: null }

const emailReducer = function (state, action) {
  switch (action.type) {
    case ENTER_USERNAME:
      return { ...state, enteredEmail: action.val, emailIsValid: action.val.includes("@") };

    case ENTER_PASSWORD:
      return { ...state, enteredPassword: action.val, passwordIsValid: action.val.trim().length > 6 };

    case VALIDATE_USERNAME:
      return { ...state, emailIsValid: state.enteredEmail.includes("@") };

    case VALIDATE_PASSWORD:
      return { ...state, passwordIsValid: state.enteredPassword.trim().length > 6 };

    default:
      return EMAIL_INIT;
  }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatcher] = useReducer(emailReducer, EMAIL_INIT);

  const { emailIsValid, passwordIsValid } = emailState;

  useEffect(function () {

    const timeout = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => { clearTimeout(timeout) }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    emailDispatcher({ type: ENTER_USERNAME, val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    emailDispatcher({ type: ENTER_PASSWORD, val: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispatcher({ type: VALIDATE_USERNAME });
  };

  const validatePasswordHandler = () => {
    emailDispatcher({ type: VALIDATE_PASSWORD });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.loginHandler(emailState.enteredEmail, emailState.enteredPassword);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          isValid={emailState.emailIsValid}
          value={emailState.enteredEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          labelText="E-mail"
        />

        <Input
        ref={passwordInputRef}
          id="password"
          type="password"
          isValid={emailState.passwordIsValid}
          value={emailState.enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          labelText="Password"
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
