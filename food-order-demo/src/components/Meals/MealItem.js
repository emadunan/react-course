import React, { useContext } from "react";

import classes from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";
import cartContext from "../../context/cart-context";

function MealItem(props) {
    // Setup Cart Context Consumer
    const cartCtx = useContext(cartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addItemHandler = (amount) => {
        const newItem = {
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        };

        cartCtx.addItem(newItem);
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddItem={addItemHandler} />
            </div>
        </li>
    );
}

export default MealItem;
