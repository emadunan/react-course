import React, { useReducer } from "react";

import cartContext from "./cart-context";

const CART_INIT = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const existItemIdx = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            const existItem = state.items[existItemIdx];

            const updatedTotalAmount =
                state.totalAmount + action.item.amount * action.item.price;

            let updatedItem;
            let updatedItems;

            if (existItem) {
                updatedItem = {
                    ...existItem,
                    amount: existItem.amount + action.item.amount,
                };

                updatedItems = [...state.items];
                updatedItems[existItemIdx] = updatedItem;
            } else {
                updatedItems = [...state.items, action.item];
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        }

        case "REMOVE": {
            const existItemIdx2 = state.items.findIndex(
                (item) => item.id === action.id
            );

            const existItem2 = state.items[existItemIdx2];
            const updatedTotalAmount2 = state.totalAmount - existItem2.price;

            let updatedItems2;

            if (existItem2.amount === 1) {
                updatedItems2 = state.items.filter(
                    (item) => item.id !== action.id
                );
            } else {
                const updatedItem2 = {
                    ...existItem2,
                    amount: existItem2.amount - 1,
                };
                updatedItems2 = [...state.items];
                updatedItems2[existItemIdx2] = updatedItem2;
            }

            // Return updated state
            return {
                items: updatedItems2,
                totalAmount: updatedTotalAmount2,
            };
        }

        case "CLEAR": {
            return CART_INIT;
        }

        default:
            return CART_INIT;
    }
};

function CartProvider(props) {
    const [cartState, cartDispatcher] = useReducer(cartReducer, CART_INIT);

    const addItemHandler = (item) => {
        cartDispatcher({ type: "ADD", item });
    };

    const removeItemHandler = (id) => {
        cartDispatcher({ type: "REMOVE", id });
    };

    const clearItemsHandler = () => {
        cartDispatcher({ type: "CLEAR" });
    };

    const cart = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearItems: clearItemsHandler,
    };

    return (
        <cartContext.Provider value={cart}>
            {props.children}
        </cartContext.Provider>
    );
}

export default CartProvider;
