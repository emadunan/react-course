import { createSlice } from "@reduxjs/toolkit";

const counterInitState = { counter: 0, show: true };

const counterSlice = createSlice({
    name: "counter",
    initialState: counterInitState,
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

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;