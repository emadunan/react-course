import { useState, Fragment } from "react";

import classes from "./AddUser.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const USER_INPUT_INIT = { username: "", age: "" }

function AddUser(props) {

    const [userInput, setUserInput] = useState(USER_INPUT_INIT);
    const [error, setError] = useState();

    const usernameChangeHandler = (e) => {
        const username = e.target.value;
        setUserInput(prevInput => ({ ...prevInput, username }));
    }

    const ageChangeHandler = (e) => {
        const age = +e.target.value;
        setUserInput(prevInput => ({ ...prevInput, age }));
    }

    const addUserHandler = (e) => {
        e.preventDefault();

        if (userInput.username.trim().length === 0) {
            setError({
                title: "Invalid Username",
                message: "Username can't be empty"
            })
            return;
        }

        if (+userInput.age < 1) {
            setError({
                title: "Invalid Age",
                message: "Username can't be less than 1"
            })
            return;
        }

        const user = {
            id: Math.random().toString(),
            username: userInput.username,
            age: userInput.age,
        }
        props.onaddUser(user);
        setUserInput(USER_INPUT_INIT);
    }

    const removeErrorHandler = () => {
        setError(null);
    }

    return (
        <Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onRemoveError={removeErrorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" onChange={usernameChangeHandler} value={userInput.username} />

                    <label htmlFor="age">Age (Years!)</label>
                    <input id="age" type="number" onChange={ageChangeHandler} value={userInput.age} />

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Fragment>
    );
}

export default AddUser;