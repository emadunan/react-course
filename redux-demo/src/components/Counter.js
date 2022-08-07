import { useSelector, useDispatch } from "react-redux";

import classes from './Counter.module.css';
import { counterActions } from "../store/store";

const Counter = () => {
  const dispatch = useDispatch();

  // State Subscriptions slices
  const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.show);

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const incrementByHandler = () => {
    dispatch(counterActions.increase(5));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button type="button" onClick={incrementHandler}>Increment (+)</button>
        <button type="button" onClick={incrementByHandler}>Increment (+5)</button>
        <button type="button" onClick={decrementHandler}>Decrement (-)</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
