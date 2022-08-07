import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(function () {
        const fetchMeals = async () => {
            try {
                const response = await fetch(
                    "https://meals-8eedd-default-rtdb.firebaseio.com/meals.json"
                );

                console.log(response);
                if (!response.ok) throw new Error("Failed to fetch data!");

                const data = await response.json();

                let loadedMeals = [];

                for (const key in data) {
                    const meal = {
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price,
                    };

                    loadedMeals.push(meal);
                }

                setMeals(loadedMeals);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };
        fetchMeals();
    }, []);

    if (isLoading) {
        return (
            <section className={classes.meals}>
                <Card>
                    <p>Loading ...</p>
                </Card>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.meals}>
                <Card><p>{httpError}</p></Card>
            </section>
        );
    }

    // Map meals array to list elements
    let mealsList = meals.map((meal) => {
        return (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    if (mealsList.length === 0) {
        mealsList = <h3>No available meals</h3>;
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;
