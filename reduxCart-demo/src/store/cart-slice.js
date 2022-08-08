import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
    items: [],
    totalQuantity: 0,
    changed: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total += existingItem.price;
            } else {
                newItem.total = newItem.price;
                state.items.push(newItem);
            }

            state.totalQuantity++;
            state.changed = true;
        },
        removeItem(state, action) {
            const itemId = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== existingItem.id);
            } else {
                existingItem.quantity -= 1;
                existingItem.total -= existingItem.price;
            }

            state.totalQuantity--;
            state.changed = true;
        },
        replaceCart(state, action) {
            state.items = action.payload.items
            state.totalQuantity = action.payload.totalQuantity
        },
    }
});

// Replacement of making AJAX call in Component
// Using Thunk to handle side-effects in Action Creator
export function updateCart(cart) {
    return (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending ...",
            message: "Sending cart data!",
        }));

        fetch("https://meals-8eedd-default-rtdb.firebaseio.com/cart.json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cart)
        }).then(response => {
            if (!response.ok) {
                dispatch(uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                }));
            }

            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent cart data successfully!",
            }));
        }).catch(_ => {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart data failed!",
            }));
        })
    }
}

// Replacement of making AJAX call in Component
// Using Thunk to handle side-effects in Action Creator
export function fetchCartData() {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch("https://meals-8eedd-default-rtdb.firebaseio.com/cart.json");

            if (!response.ok) throw new Error("Coudn't fetch cart data!")

            const data = await response.json();
            dispatch(cartSlice.actions.replaceCart({items: data.items || [], totalQuantity: data.totalQuantity}));
        }

        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Fetching cart data failed!",
            }));
        }

        
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;