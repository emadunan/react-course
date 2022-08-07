import React, { useRef } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

function MealItemForm(props) {
    const id = Math.random().toString();

    // Define elements' refs
    const inputAmountRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = inputAmountRef.current.value;

        if (enteredAmount.trim().length === 0) {
            return;
        }

        const enteredAmountNumber = +enteredAmount;

        if (enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            return;
        }

        props.onAddItem(enteredAmountNumber);
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                ref={inputAmountRef}
                label="Amount"
                input={{
                    id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
        </form>
    );
}

export default MealItemForm;
