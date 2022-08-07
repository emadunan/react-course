const Redux = require("redux");

const INIT_STATE = { counter: 0 }

// Reducer Function for setting up the store
const counterReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "INCREMENT": {
            return {
                counter: ++state.counter
            }
        }

        case "DECREMENT": {
            return {
                counter: --state.counter
            }
        }

        default:
            return INIT_STATE;
    }
}

// Create Redux store
const store = Redux.createStore(counterReducer);

// Setup subscription
store.subscribe(() => {
    const latestState = store.getState();
    console.log(latestState);
});

// Dispatch action
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "INCREMENT"});

store.dispatch({type: "DECREMENT"});
store.dispatch({type: "DECREMENT"});
store.dispatch({type: "DECREMENT"});
store.dispatch({type: "DECREMENT"});
store.dispatch({type: "DECREMENT"});


