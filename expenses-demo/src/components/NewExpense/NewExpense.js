import "./ExpenseForm.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

function NewExpense(props) {
    const [editMood, setEditMood] = useState(false);

    const toggleMoodHandler = () => {
        setEditMood((prevMood) => !prevMood);
    };

    const addNewExpenseHandler = (newExpense) => {
        props.onNewExpense(newExpense);
        toggleMoodHandler();
    };

    return (
        <div className="new-expense">
            {!editMood && (
                <button onClick={toggleMoodHandler}>Add Expense</button>
            )}
            {editMood && (
                <ExpenseForm
                    onAddNewExpense={addNewExpenseHandler}
                    onToggleMood={toggleMoodHandler}
                />
            )}
        </div>
    );
}

export default NewExpense;
