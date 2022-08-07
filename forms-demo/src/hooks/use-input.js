import { useState } from "react";

function useInput(validateValue) {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = function (event) {
        setEnteredValue(event.target.value);
    }

    const valueBlurHandler = function () {
        setIsTouched(true);
    }

    const valueResetHandler = function () {
        setEnteredValue("");
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        valueResetHandler,
    }
}

export default useInput;