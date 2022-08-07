import React, { useImperativeHandle, forwardRef, useRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(function (props, ref) {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    }
  });

  return (
    <div
      className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
        }`}
    >
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        ref={inputRef}
        type={props.id}
        id={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  )
});

export default Input;