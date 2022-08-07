import React, { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim() === "";
const isFiveChar = (val) => val.trim().length === 5;

function Checkout(props) {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsvalid = !isEmpty(enteredName);
        const enteredStreetIsvalid = !isEmpty(enteredStreet);
        const enteredPostalIsvalid = isFiveChar(enteredPostal);
        const enteredCityIsvalid = !isEmpty(enteredCity);

        setFormValidity({
            name: enteredNameIsvalid,
            street: enteredStreetIsvalid,
            postal: enteredPostalIsvalid,
            city: enteredCityIsvalid,
        });

        const formIsValid =
            enteredNameIsvalid &&
            enteredStreetIsvalid &&
            enteredPostalIsvalid &&
            enteredCityIsvalid;

        if (!formIsValid) {
            return;
        }

        const userData = {
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity,
        };

        props.onConfirm(userData);
    };

    // Factor CSS Classes
    const nameInputClasses = `${classes.control} ${
        !formValidity.name ? classes.invalid : ""
    }`;
    const streetInputClasses = `${classes.control} ${
        !formValidity.street ? classes.invalid : ""
    }`;
    const postalInputClasses = `${classes.control} ${
        !formValidity.postal ? classes.invalid : ""
    }`;
    const cityInputClasses = `${classes.control} ${
        !formValidity.city ? classes.invalid : ""
    }`;

    return (
        <form onSubmit={submitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
            </div>
            <div className={postalInputClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button type="submit">Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;
