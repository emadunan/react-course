import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, show: true };

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: function (state) {
            state.counter++;
        },
        decrement: function (state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload
        },
        toggle(state) {
            state.show = !state.show
        }
    }
});

const store = configureStore({
    reducer: counterSlice.reducer
});

// Export store actions
export const counterActions = counterSlice.actions;

export default store;

//*************************************************
// import { createStore } from "redux";

// const STORE_INIT = { counter: 0, show: true }

// const storeReducer = (state = STORE_INIT, action) => {
//     switch (action.type) {
//         case "INCREMENT": {
//             return {
//                 ...state,
//                 counter: state.counter + 1
//             }
//         }

//         case "INCREMENT_BY": {
//             return {
//                 ...state,
//                 counter: state.counter + action.by
//             }
//         }

//         case "DECREMENT": {
//             return {
//                 ...state,
//                 counter: state.counter - 1
//             }
//         }

//         case "TOGGLE_SHOW": {
//             return {
//                 ...state,
//                 show: !state.show
//             }
//         }

//         default:
//             return STORE_INIT;
//     }
// }

// const store = createStore(storeReducer);

// export default store;