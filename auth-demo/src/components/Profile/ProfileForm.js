import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";


import classes from './ProfileForm.module.css';
import AuthContext from "../../context/auth-context";

const ProfileForm = () => {
  const history = useHistory();

  // Auth Context Listener
  const authCtx = useContext(AuthContext);
  const { token: idToken } = authCtx;

  // Refs
  const newPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const password = newPasswordRef.current.value;

    // Could add validation

    const requestBody = {
      idToken,
      password,
      returnSecureToken: false
    }

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZcwkgGzsgdvQQ5xTRRfypPYl5SvjeBGs", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.error) throw new Error(data.error.message);
      history.push("/");
    }).catch(err => {
      alert(err.message)
    });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
