import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import counterReducer from "./counter-slice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});

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