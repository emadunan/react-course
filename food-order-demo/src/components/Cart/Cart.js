import React, { useContext, useState } from "react";

import cartContext from "../../context/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import Modal from "../UI/Modal";

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(cartContext);

    const cartTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartHasItems = cartCtx.items.length > 0;

    const onAddhandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const onRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch("https://meals-8eedd-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userData, items: cartCtx.items }),
        }).then(() => {
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearItems();
        });
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={onAddhandler.bind(null, item)}
                    onRemove={onRemoveHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
                Close
            </button>
            {cartHasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{cartTotalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onCancel={props.onClose}
                    onConfirm={submitOrderHandler}
                />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data ...</p>;
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;
